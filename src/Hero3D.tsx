import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const C = ['#D99A55', '#F5F0E8', '#8E6845', '#A5A29C']
function CodeScreen() {
  const last = useRef(0)
  const { cv, tex, lines } = useMemo(() => {
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 320
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace
    const lines = Array.from({ length: 60 }, () => ({ i: Math.floor(Math.random() * 4), w: 40 + Math.random() * 260, c: Math.floor(Math.random() * 4) }))
    return { cv, tex, lines }
  }, [])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime; if (t - last.current < 0.1) return; last.current = t
    const g = cv.getContext('2d')!; g.fillStyle = '#141311'; g.fillRect(0, 0, 512, 320)
    const off = (t * 14) % 16
    lines.forEach((l, n) => { g.fillStyle = C[l.c]; g.globalAlpha = 0.85; g.fillRect(24 + l.i * 22, 12 + n * 16 - off, l.w, 7) })
    g.globalAlpha = 1; g.fillStyle = '#D99A55'; if (Math.floor(t * 2) % 2) g.fillRect(24, 300, 8, 12)
    tex.needsUpdate = true
  })
  return <mesh position={[0, 1.55, -0.19]}><planeGeometry args={[2.3, 1.44]} /><meshBasicMaterial map={tex} toneMapped={false} /></mesh>
}
const Box = ({ p, s, c, r = 0.6, m = 0 }: { p: [number, number, number]; s: [number, number, number]; c: string; r?: number; m?: number }) =>
  <mesh position={p} castShadow receiveShadow><boxGeometry args={s} /><meshStandardMaterial color={c} roughness={r} metalness={m} /></mesh>

function Scene() {
  const dust = useRef<THREE.Points>(null)
  const pos = useMemo(() => Float32Array.from({ length: 240 }, (_, i) => (i % 3 === 1 ? Math.random() * 3 + 0.5 : (Math.random() - 0.5) * 5)), [])
  useFrame(({ camera, pointer, clock }) => {
    const sp = Math.min(window.scrollY / window.innerHeight, 1.5)
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04
    camera.position.y += (2.1 + pointer.y * 0.25 - sp * 0.9 - camera.position.y) * 0.04
    camera.position.z += (5.2 - sp * 1.6 - camera.position.z) * 0.04
    camera.lookAt(0, 1.4 - sp * 0.4, 0)
    if (dust.current) dust.current.rotation.y = clock.elapsedTime * 0.03
  })
  return <>
    <color attach="background" args={['#101010']} /><fog attach="fog" args={['#101010', 6, 14]} />
    <ambientLight intensity={0.25} />
    <spotLight position={[2.4, 4, 1.5]} angle={0.6} penumbra={1} intensity={90} color="#ffcf9a" castShadow shadow-mapSize={[1024, 1024]} />
    <pointLight position={[0, 1.6, 0.6]} intensity={5} color="#D99A55" distance={5} />
    <mesh rotation-x={-Math.PI / 2} receiveShadow><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#181818" roughness={0.9} /></mesh>
    <Box p={[0, 0.9, 0.2]} s={[4.2, 0.09, 1.7]} c="#6b4a2f" r={0.5} />
    {[-1.9, 1.9].map(x => <Box key={x} p={[x, 0.45, 0.2]} s={[0.1, 0.9, 1.5]} c="#222" />)}
    <Box p={[0, 1.55, -0.3]} s={[2.4, 1.5, 0.1]} c="#0b0b0b" m={0.5} /><CodeScreen />
    <Box p={[0, 1.0, -0.3]} s={[0.12, 0.2, 0.12]} c="#222" m={0.8} /><Box p={[0, 0.96, -0.3]} s={[0.8, 0.03, 0.4]} c="#222" m={0.8} />
    <Box p={[0, 0.97, 0.45]} s={[1.3, 0.05, 0.45]} c="#2a2826" /><Box p={[0.95, 0.96, 0.45]} s={[0.18, 0.04, 0.28]} c="#D99A55" />
    <Box p={[-1.5, 1.0, 0.1]} s={[0.22, 0.2, 0.22]} c="#F5F0E8" r={0.3} />
    <group position={[1.6, 0.95, -0.2]}><mesh castShadow position={[0, 0.5, 0]} rotation-z={0.4}><cylinderGeometry args={[0.02, 0.02, 1.1]} /><meshStandardMaterial color="#8E6845" metalness={0.8} roughness={0.3} /></mesh>
      <mesh position={[-0.2, 1.0, 0]}><sphereGeometry args={[0.1]} /><meshBasicMaterial color="#ffd9a8" /></mesh></group>
    <group position={[0.2, 0, 1.7]} rotation-y={0.3}><Box p={[0, 0.55, 0]} s={[0.9, 0.1, 0.9]} c="#2c2a28" /><Box p={[0, 1.05, 0.42]} s={[0.9, 0.9, 0.1]} c="#2c2a28" /><Box p={[0, 0.27, 0]} s={[0.1, 0.5, 0.1]} c="#111" m={0.8} /></group>
    <points ref={dust}><bufferGeometry><bufferAttribute attach="attributes-position" args={[pos, 3]} /></bufferGeometry><pointsMaterial size={0.03} color="#D99A55" transparent opacity={0.6} sizeAttenuation /></points>
  </>
}
export default function Hero3D() {
  return <Canvas shadows dpr={[1, 1.6]} camera={{ position: [0, 2.1, 5.2], fov: 38 }} gl={{ antialias: true, powerPreference: 'high-performance' }} aria-hidden><Scene /></Canvas>
}
