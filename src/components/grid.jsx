import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Plane, Text } from '@react-three/drei'

const textColor = 'black'

export function GridHelper() {
  const gridRef = useRef()

  useEffect(() => {
    if (gridRef && gridRef.current) {
      gridRef.current.material.opacity = 0.25
      gridRef.current.material.transparent = true
      gridRef.current.geometry.rotateX(Math.PI / 2)

      let vector = new THREE.Vector3(0, 0, 1)
      gridRef.current.lookAt(vector)
    }
  }, [])

  return <gridHelper ref={gridRef} args={[200, 200]} />
}

const XZPlane = ({ size }) => (
  <Plane args={[size, size, size, size]} rotation={[1.5 * Math.PI, 0, 0]} position={[0, 0, 0]}>
    <meshStandardMaterial attach="material" color="#f9c74f" wireframe />
  </Plane>
)

const XYPlane = ({ size }) => (
  <Plane args={[size, size, size, size]} rotation={[0, 0, 0]} position={[0, 0, 0]}>
    <meshStandardMaterial attach="material" color="pink" wireframe />
  </Plane>
)

const YZPlane = ({ size }) => (
  <Plane args={[size, size, size, size]} rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]}>
    <meshStandardMaterial attach="material" color="#80ffdb" wireframe />
  </Plane>
)

export default function Grid2({ size }) {
  return (
    <group>
      <Text
        color={textColor} // default
        anchorX="center" // default
        anchorY="middle" // default
        position={[size / 2 + 1, 0, 0]}
        scale={[4, 4, 4]}>
        X+
      </Text>
      <Text
        color={textColor} // default
        anchorX="center" // default
        anchorY="middle" // default
        position={[-size / 2 - 1, 0, 0]}
        scale={[4, 4, 4]}>
        X-
      </Text>
      <Text
        color={textColor} // default
        anchorX="center" // default
        anchorY="middle" // default
        position={[0, size / 2 + 1, 0]}
        scale={[4, 4, 4]}>
        Y+
      </Text>
      <Text
        color={textColor} // default
        anchorX="center" // default
        anchorY="middle" // default
        position={[0, -size / 2 - 1, 0]}
        scale={[4, 4, 4]}>
        Y-
      </Text>
      <Text
        color={textColor} // default
        anchorX="center" // default
        anchorY="middle" // default
        position={[0, 0, size / 2 + 1]}
        scale={[4, 4, 4]}>
        Z+
      </Text>
      <Text
        color={textColor} // default
        anchorX="center" // default
        anchorY="middle" // default
        position={[0, 0, -size / 2 - 1]}
        scale={[4, 4, 4]}>
        Z-
      </Text>
      <XZPlane size={size} />
      <XYPlane size={size} />
      <YZPlane size={size} />
    </group>
  )
}
