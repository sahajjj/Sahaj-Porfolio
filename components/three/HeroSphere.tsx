"use client"
import React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { Suspense, useMemo, useRef } from "react"
import * as THREE from "three"

function DistortedSphere() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!mesh.current) return
    mesh.current.rotation.y = clock.getElapsedTime() * 0.35
  })
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#00ffff"),
    roughness: 0.2,
    metalness: 0.6,
    transmission: 0.6,
    thickness: 0.6,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    ior: 1.5,
    envMapIntensity: 1.2,
  }), [])
  return (
    <Float speed={1.3} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.2, 2]} />
        <primitive object={material} attach="material" />
      </mesh>
    </Float>
  )
}

function OrbitingPoints() {
  const group = useRef<THREE.Group>(null)
  const matRef = useRef<THREE.PointsMaterial>(null)
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.getElapsedTime() * 0.4
    if (matRef.current) matRef.current.size = 0.02 + 0.01 * Math.sin(state.clock.getElapsedTime() * 1.5)
  })
  const points = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const N = 500
    const positions = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * Math.PI * 2
      const r = 2.2 + (i % 7) * 0.01
      positions[i * 3 + 0] = Math.cos(angle) * r
      positions[i * 3 + 1] = Math.sin(angle * 1.3) * 0.2
      positions[i * 3 + 2] = Math.sin(angle) * r
    }
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return geom
  }, [])
  return (
    <group ref={group} position={[0, 0, 0]}>
      <points>
        <primitive attach="geometry" object={points} />
        <pointsMaterial ref={matRef} size={0.02} color="#00ffff" transparent opacity={0.85} />
      </points>
    </group>
  )
}

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })
  // Track mouse globally so sensitivity works even if Canvas is behind elements
  // and to increase responsiveness
  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  useFrame(({ clock }) => {
    if (!group.current) return
    const targetX = mouse.current.x * 1.0 // higher sensitivity
    const targetY = mouse.current.y *  -0.6
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.18)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetY, 0.18)
    // slight position parallax
    const px = mouse.current.x * 0.15
    const py = 0.02 * Math.sin(clock.getElapsedTime() * 1.0)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, 0.9 + px, 0.12)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, py, 0.12)
  })
  return <group ref={group}>{children}</group>
}

export function HeroSphere() {
  return (
    <div className="absolute inset-y-0 right-0 w-[70%] -z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 4, 2]} intensity={1.2} />
        <Suspense fallback={null}>
          <ParallaxRig>
            <DistortedSphere />
            <OrbitingPoints />
          </ParallaxRig>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
