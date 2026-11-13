import { describe, expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { Box3, BoxGeometry, Group, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { centerScaledObject } from '../app/lib/center-scaled-object'

function boundsOf(object: Group) {
  object.updateMatrixWorld(true)
  const box = new Box3().setFromObject(object)
  return {
    center: box.getCenter(new Vector3()),
    size: box.getSize(new Vector3()),
  }
}

describe('centerScaledObject', () => {
  test('puts a bottom-origin model on the origin after scaling', () => {
    const group = new Group()
    const height = 1.8226943016052246
    const mesh = new Mesh(new BoxGeometry(1.4270707368850708, height, 0.5044311881065369), new MeshBasicMaterial())
    mesh.position.y = height / 2
    group.add(mesh)

    centerScaledObject(group, 2.5)

    const { center, size } = boundsOf(group)
    expect(Math.abs(center.x)).toBeLessThan(1e-4)
    expect(Math.abs(center.y)).toBeLessThan(1e-4)
    expect(Math.abs(center.z)).toBeLessThan(1e-4)
    expect(Math.max(size.x, size.y, size.z)).toBeCloseTo(2.5, 4)
  })

  test('centers the DS monogram inside the large logo camera', async () => {
    const bytes = readFileSync(new URL('../public/models/ds-grey.glb', import.meta.url))
    const gltf = await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), '')
    const scene = gltf.scene.clone(true)

    centerScaledObject(scene, 2.5)

    const { center, size } = boundsOf(scene)
    expect(Math.abs(center.x)).toBeLessThan(1e-3)
    expect(Math.abs(center.y)).toBeLessThan(1e-3)
    expect(Math.abs(center.z)).toBeLessThan(1e-3)
    expect(size.y).toBeCloseTo(2.5, 3)
    const visibleHeight = 2 * Math.tan((45 * Math.PI) / 360) * 4.5
    expect(size.y).toBeLessThan(visibleHeight)
    expect(size.x).toBeLessThan(visibleHeight)
  })
})
