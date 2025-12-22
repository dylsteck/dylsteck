'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

// Preload the GLB model
useGLTF.preload('/models/ds-grey.glb')

function Model() {
  const { scene } = useGLTF('/models/ds-grey.glb')
  const meshRef = useRef<THREE.Group>(null)

  // Center and scale the model
  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      
      // Center the model
      scene.position.x = -center.x
      scene.position.y = -center.y
      scene.position.z = -center.z
      
      // Scale to make the object bigger within the same container
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 3.5 / maxDim
      scene.scale.set(scale, scale, scale)
    }
  }, [scene])

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

export default function DS3DIcon() {
  return (
    <div className="w-[100px] h-[120px] opacity-50">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Model />
      </Canvas>
    </div>
  )
}

