import { Box3, Vector3, type Object3D } from 'three'

// Fit `object` to `baseScale` on its largest axis and put its bounds on the origin.
// Call this before the object is parented. The fit reads world bounds, so a parent
// transform would shift the result.
export function centerScaledObject(object: Object3D, baseScale: number) {
  object.position.set(0, 0, 0)
  object.scale.set(1, 1, 1)
  object.updateMatrixWorld(true)

  const size = new Box3().setFromObject(object).getSize(new Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  object.scale.setScalar(maxDim > 0 ? baseScale / maxDim : 1)
  object.updateMatrixWorld(true)

  object.position.sub(new Box3().setFromObject(object).getCenter(new Vector3()))
  object.updateMatrixWorld(true)
}
