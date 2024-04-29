// based on https://dev.to/abdnadeem382/importing-and-interacting-with-a-3d-model-in-react-with-react-three-fiber-2fni

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import ThreeBaseballModel from './ThreeBaseballModel'

export default function ThreeBaseball() {
  return (
    <Canvas
      style={{
        height: 600,
        position: 'absolute',
        top: 0,
        right: '-25vw',
        zIndex: 5,
      }}
      frameloop="demand"
      camera={{ position: [0, 8, 3], fov: 45, near: 0.1, far: 200 }}
    >
      <OrbitControls
        autoRotateSpeed={3}
        autoRotate
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
      <ThreeBaseballModel />
      <ambientLight intensity={2} />
    </Canvas>
  )
}
