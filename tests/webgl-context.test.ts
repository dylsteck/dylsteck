import { describe, expect, test } from 'bun:test'
import {
  acquireWebGL2Context,
  canCreateWebGL2,
  contextAttemptsFor,
  isSoftwareWebGLRenderer,
  webglContextAttempts,
} from '../app/lib/webgl-context'

function canvasReturning(results: Array<WebGL2RenderingContext | null>) {
  const calls: WebGLContextAttributes[] = []
  const canvas = {
    getContext(_type: 'webgl2', attributes?: WebGLContextAttributes) {
      calls.push(attributes ?? {})
      return results[calls.length - 1] ?? null
    },
  }
  return { canvas, calls }
}

describe('webgl context attempts', () => {
  test('never requests the high-performance gpu or fails on software renderers', () => {
    for (const attempt of webglContextAttempts) {
      expect(attempt.powerPreference).not.toBe('high-performance')
      expect(attempt.failIfMajorPerformanceCaveat).toBe(false)
      expect(attempt.alpha).toBe(true)
    }
    expect(webglContextAttempts[0]?.antialias).toBe(true)
    expect(webglContextAttempts[0]?.powerPreference).toBe('default')
    expect(webglContextAttempts[1]?.antialias).toBe(false)
    expect(webglContextAttempts[1]?.powerPreference).toBe('low-power')
  })

  test('asks software renderers for no antialiasing first, then the default context', () => {
    const attempts = contextAttemptsFor(true)
    expect(attempts.map((attempt) => attempt.antialias)).toEqual([false, true])
    expect(attempts[0]?.powerPreference).toBe('low-power')
  })

  test('keeps the default attempt first on a hardware renderer', () => {
    expect(contextAttemptsFor(false)).toEqual(webglContextAttempts)
  })
})

describe('acquireWebGL2Context', () => {
  test('returns the first context that the browser actually creates', () => {
    const context = { kind: 'webgl2' } as unknown as WebGL2RenderingContext
    const { canvas, calls } = canvasReturning([context])
    expect(acquireWebGL2Context(canvas)).toBe(context)
    expect(calls).toHaveLength(1)
    expect(calls[0]?.powerPreference).toBe('default')
  })

  test('falls through when the first attribute set is refused', () => {
    const context = { kind: 'low-power' } as unknown as WebGL2RenderingContext
    const { canvas, calls } = canvasReturning([null, context])
    expect(acquireWebGL2Context(canvas)).toBe(context)
    expect(calls).toHaveLength(2)
    expect(calls[1]?.powerPreference).toBe('low-power')
    expect(calls[1]?.antialias).toBe(false)
    expect(calls[1]?.failIfMajorPerformanceCaveat).toBe(false)
  })

  test('returns null only when every WebGL2 attempt is refused', () => {
    const { canvas, calls } = canvasReturning([null, null, null])
    expect(acquireWebGL2Context(canvas)).toBeNull()
    expect(calls).toHaveLength(webglContextAttempts.length)
  })

  test('starts a software renderer on the low-power context without antialiasing', () => {
    const context = { kind: 'software' } as unknown as WebGL2RenderingContext
    const { canvas, calls } = canvasReturning([context])
    expect(acquireWebGL2Context(canvas, true)).toBe(context)
    expect(calls[0]?.antialias).toBe(false)
    expect(calls[0]?.powerPreference).toBe('low-power')
  })
})

describe('canCreateWebGL2', () => {
  const previousDocument = globalThis.document

  test('is false when every WebGL2 attempt is refused', () => {
    globalThis.document = {
      createElement: () => ({ getContext: () => null }),
    } as unknown as Document
    expect(canCreateWebGL2()).toBe(false)
    globalThis.document = previousDocument
  })

  test('is true when the browser returns a context, and releases that probe', () => {
    let lost = false
    globalThis.document = {
      createElement: () => ({
        getContext: () => ({
          getExtension: () => ({ loseContext: () => { lost = true } }),
        }),
      }),
    } as unknown as Document
    expect(canCreateWebGL2()).toBe(true)
    expect(lost).toBe(true)
    globalThis.document = previousDocument
  })
})

describe('isSoftwareWebGLRenderer', () => {
  test('recognizes the software renderers that still expose WebGL2', () => {
    expect(
      isSoftwareWebGLRenderer(
        'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)',
      ),
    ).toBe(true)
    expect(isSoftwareWebGLRenderer('llvmpipe (LLVM 15.0.7, 256 bits)')).toBe(true)
    expect(isSoftwareWebGLRenderer('ANGLE (Mesa, lavapipe (LLVM 17.0.6), OpenGL 4.3)')).toBe(true)
    expect(isSoftwareWebGLRenderer('Microsoft Basic Render Driver')).toBe(true)
  })

  test('leaves hardware renderers on the antialiased path', () => {
    expect(
      isSoftwareWebGLRenderer(
        'ANGLE (Apple, ANGLE Metal Renderer: Apple M3, Unspecified Version)',
      ),
    ).toBe(false)
    expect(
      isSoftwareWebGLRenderer('ANGLE (NVIDIA, NVIDIA GeForce RTX 4090 Direct3D11 vs_5_0 ps_5_0)'),
    ).toBe(false)
  })
})
