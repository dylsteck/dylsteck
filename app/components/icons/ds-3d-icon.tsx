'use client'

import { Canvas, useFrame, extend } from '@react-three/fiber'
import { useGLTF, shaderMaterial } from '@react-three/drei'
import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'

// Preload the GLB model
useGLTF.preload('/models/ds-grey.glb')

// Holographic shader material - Blue/Gray theme
const HolographicMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color('#4a90d9'),  // Steel blue
    uColor2: new THREE.Color('#6b7b8c'),  // Blue gray
    uColor3: new THREE.Color('#3a5f82'),  // Dark steel blue
    uFresnelPower: 2.0,
    uScanlineSpeed: 0.5,
    uGlowIntensity: 1.0,
  },
  // Vertex shader
  `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uFresnelPower;
    uniform float uScanlineSpeed;
    uniform float uGlowIntensity;
    
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    
    void main() {
      // Calculate fresnel effect (edge glow)
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), uFresnelPower);
      
      // Subtle color variation based on position and normal
      float normalInfluence = dot(vNormal, vec3(0.5, 0.8, 0.3)) * 0.5 + 0.5;
      
      // Mix base colors with subtle time animation
      float colorMix = sin(uTime * 0.3 + vWorldPosition.y * 1.5) * 0.5 + 0.5;
      vec3 baseColor = mix(uColor1, uColor2, colorMix);
      baseColor = mix(baseColor, uColor3, sin(uTime * 0.2 + vWorldPosition.x * 1.5) * 0.3 + 0.35);
      
      // Add subtle blue highlight based on normal
      vec3 blueHighlight = vec3(0.5, 0.7, 0.9);
      baseColor = mix(baseColor, blueHighlight, normalInfluence * 0.3);
      
      // Animated scanlines (subtle)
      float scanline = sin(vWorldPosition.y * 30.0 + uTime * uScanlineSpeed * 8.0) * 0.5 + 0.5;
      scanline = smoothstep(0.4, 0.6, scanline);
      
      // Subtle shimmer
      float shimmer = sin(vWorldPosition.x * 15.0 + uTime * 1.5) * 0.5 + 0.5;
      shimmer *= sin(vWorldPosition.z * 12.0 - uTime * 1.2) * 0.5 + 0.5;
      
      // Combine effects
      vec3 finalColor = baseColor;
      finalColor += fresnel * uGlowIntensity * 0.6 * baseColor;
      finalColor += scanline * 0.05 * vec3(0.7, 0.8, 1.0);
      finalColor += shimmer * 0.08 * vec3(0.6, 0.75, 0.95);
      
      // Edge glow - blue tinted
      float edgeGlow = pow(fresnel, 1.5) * uGlowIntensity;
      finalColor += edgeGlow * vec3(0.4, 0.6, 0.9);
      
      // Transparency based on fresnel (more transparent in center, opaque at edges)
      float alpha = 0.75 + fresnel * 0.25;
      
      // Subtle flicker
      float flicker = sin(uTime * 12.0) * 0.015 + 1.0;
      finalColor *= flicker;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
)

// Extend Three.js with the custom material
extend({ HolographicMaterial })

// Add type declaration for the custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      holographicMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        uTime?: number
        uColor1?: THREE.Color
        uColor2?: THREE.Color
        uColor3?: THREE.Color
        uFresnelPower?: number
        uScanlineSpeed?: number
        uGlowIntensity?: number
        transparent?: boolean
        side?: THREE.Side
      }
    }
  }
}

function Model({ size = 'large' }: { size?: 'small' | 'large' }) {
  const { scene } = useGLTF('/models/ds-grey.glb')
  const meshRef = useRef<THREE.Group>(null)
  
  // Clone the scene and apply holographic material
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    return clone
  }, [scene])

  // Center and scale the model
  useEffect(() => {
    if (clonedScene) {
      const box = new THREE.Box3().setFromObject(clonedScene)
      const center = box.getCenter(new THREE.Vector3())
      const sizeObj = box.getSize(new THREE.Vector3())
      
      // Center the model
      clonedScene.position.x = -center.x
      clonedScene.position.y = -center.y
      clonedScene.position.z = -center.z
      
      // Scale based on size prop
      const maxDim = Math.max(sizeObj.x, sizeObj.y, sizeObj.z)
      const baseScale = size === 'small' ? 1.9 : 3.5
      const scale = baseScale / maxDim
      clonedScene.scale.set(scale, scale, scale)
      
      // Move down slightly for small size to prevent top clipping
      if (size === 'small') {
        clonedScene.position.y -= 0.1
      }
      
      // Apply holographic material to all meshes
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const holoMaterial = new HolographicMaterial()
          holoMaterial.transparent = true
          holoMaterial.side = THREE.DoubleSide
          child.material = holoMaterial
        }
      })
    }
  }, [clonedScene, size])

  // Rotate the model and update shader time
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += (Math.PI * 2) / 20 * delta
      
      // Update time uniform for all holographic materials
      meshRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial) {
          if (child.material.uniforms.uTime) {
            child.material.uniforms.uTime.value = state.clock.elapsedTime
          }
        }
      })
    }
  })

  return (
    <group ref={meshRef}>
      <primitive object={clonedScene} />
    </group>
  )
}

export default function DS3DIcon({ size = 'large' }: { size?: 'small' | 'large' }) {
  const containerClass = size === 'small' 
    ? 'w-[36px] h-[36px] opacity-80 mt-0.5 mb-1' 
    : 'w-[300px] h-[360px]'
  
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
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />
        <pointLight position={[-5, -5, -5]} intensity={0.2} color="#4a90d9" />
        <pointLight position={[5, -5, 5]} intensity={0.2} color="#6b7b8c" />
        <Model size={size} />
      </Canvas>
    </div>
  )
}

