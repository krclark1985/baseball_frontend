import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'

export default function ThreeBaseballModel() {
  const baseball = useGLTF('/models/sketchfab-newsfeed-baseball/scene.gltf')
  const baseballRef = useRef<any>(null)
  const [yValue, setYValue] = useState(0)

  useFrame(() => {
    baseballRef.current.rotation.y += 0.02
  })

  useEffect(() => {
    setTimeout(() => {
      setYValue(-0.17)
    }, 200)
  }, [])

  return (
    <primitive
      ref={baseballRef}
      object={baseball.scene}
      scale={7}
      position={[0, 0, 1]}
      rotation={[-0.0, yValue, -0.1]}
      matrixRotationX={1}
    />
  )
}
