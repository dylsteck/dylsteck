'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

// Preload the GLB model
useGLTF.preload('/models/ds-grey.glb')

function Model({ size = 'large' }: { size?: 'small' | 'large' }) {
  const { scene } = useGLTF('/models/ds-grey.glb')
  const meshRef = useRef<THREE.Group>(null)

  // Center and scale the model
  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      const sizeObj = box.getSize(new THREE.Vector3())
      
      // Center the model
      scene.position.x = -center.x
      scene.position.y = -center.y
      scene.position.z = -center.z
      
      // Scale based on size prop
      const maxDim = Math.max(sizeObj.x, sizeObj.y, sizeObj.z)
      const baseScale = size === 'small' ? 1.9 : 3.5
      const scale = baseScale / maxDim
      scene.scale.set(scale, scale, scale)
      
      // Move down slightly for small size to prevent top clipping
      if (size === 'small') {
        scene.position.y -= 0.1
      }
    }
  }, [scene, size])

  // Rotate the model continuously (20 seconds per rotation, matching SVG)
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += (Math.PI * 2) / 20 * delta
    }
  })

  return (
    <group ref={meshRef}>
      <primitive object={scene} />
    </group>
  )
}

export default function DS3DIcon({ size = 'large' }: { size?: 'small' | 'large' }) {
  const containerClass = size === 'small' 
    ? 'w-[36px] h-[36px] opacity-80 mt-0.5 mb-1' 
    : 'w-[100px] h-[120px] opacity-50'
  
  const cameraConfig = size === 'small'
    ? { position: [0, 0, 2.5] as [number, number, number], fov: 65 }
    : { position: [0, 0, 5] as [number, number, number], fov: 50 }

  return (
    <div className={containerClass}>
      <Canvas
        camera={cameraConfig}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Model size={size} />
      </Canvas>
    </div>
  )
}

