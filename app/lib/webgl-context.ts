// Three only asks for WebGL2. These attempts stay on WebGL2 and avoid
// powerPreference "high-performance", which makes getContext return null on
// integrated GPUs, remote desktops, and software renderers such as SwiftShader.

export const webglContextAttempts: WebGLContextAttributes[] = [
  {
    alpha: true,
    depth: true,
    stencil: false,
    antialias: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
    powerPreference: 'default',
    failIfMajorPerformanceCaveat: false,
  },
  {
    alpha: true,
    depth: true,
    stencil: false,
    antialias: false,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
    powerPreference: 'low-power',
    failIfMajorPerformanceCaveat: false,
  },
]

const softwareRendererPattern =
  /swiftshader|llvmpipe|softpipe|lavapipe|software|microsoft basic render|svga3d|virgl/i

export function isSoftwareWebGLRenderer(renderer: string): boolean {
  return softwareRendererPattern.test(renderer)
}

export function contextAttemptsFor(software: boolean): WebGLContextAttributes[] {
  if (!software) return webglContextAttempts
  return [
    ...webglContextAttempts.filter((attempt) => !attempt.antialias),
    ...webglContextAttempts.filter((attempt) => attempt.antialias),
  ]
}

type WebGLCanvas = {
  getContext(
    type: 'webgl2',
    attributes?: WebGLContextAttributes,
  ): WebGL2RenderingContext | null
}

export function acquireWebGL2Context(
  canvas: WebGLCanvas,
  software = false,
): WebGL2RenderingContext | null {
  for (const attributes of contextAttemptsFor(software)) {
    const context = canvas.getContext('webgl2', attributes)
    if (context) return context
  }
  return null
}

export function readRendererString(gl: WebGL2RenderingContext): string {
  const debug = gl.getExtension('WEBGL_debug_renderer_info')
  if (debug) {
    const value = gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)
    if (typeof value === 'string' && value.length > 0) return value
  }
  const fallback = gl.getParameter(gl.RENDERER)
  return typeof fallback === 'string' ? fallback : ''
}

export function canCreateWebGL2(): boolean {
  if (typeof document === 'undefined') return false
  const canvas = document.createElement('canvas')
  const context = acquireWebGL2Context(canvas, false)
  if (!context) return false
  context.getExtension('WEBGL_lose_context')?.loseContext()
  return true
}

export function detectSoftwareWebGL(): boolean {
  if (typeof document === 'undefined') return false
  const probe = document.createElement('canvas')
  const context = probe.getContext('webgl2', contextAttemptsFor(true)[0])
  if (!context) return false
  const software = isSoftwareWebGLRenderer(readRendererString(context))
  context.getExtension('WEBGL_lose_context')?.loseContext()
  return software
}
