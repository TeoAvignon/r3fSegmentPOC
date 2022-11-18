import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, Box, Line, Cylinder, Detailed } from '@react-three/drei'
import { ArrowHelper } from 'three'
import { useDrag } from '@use-gesture/react'

const segmentWidth = 0.2
const arrowHeight = 0.3
const arrowWidth = 0.2

export function Segment({
  start = [0, 0],
  end = [1, 0],
  scale = [1, 1, 1],
  handleClick,
  id,
  groupRef,
  cameraRef,
  setIsDragging,
  floorPlane
}) {
  if (id === 2) console.log('segment rerender', id)

  const startVector = new THREE.Vector3(start[0], start[1], 0)
  const endVector = new THREE.Vector3(end[0], end[1], 0)
  const length = endVector.distanceTo(startVector)
  const origin = new THREE.Vector3(0, 0, 0)
  let direction = endVector.clone().sub(startVector)

  const dx = end[0] - start[0]
  const dy = end[1] - start[1]
  const angle = Math.atan2(dy, dx)
  // const position = [start[0] + dx / 2, start[1] + dy / 2, 0];
  const initialPosition = [start[0] + dx / 2, start[1] + dy / 2, 0]
  const [position, setPosition] = useState(initialPosition)
  // const position = [start[0] + dx / 2, 0, 0]
  const rotation = [0, 0, angle]

  // Arrow data
  const f32array = useMemo(() => {
    const triangleVertices = [
      new THREE.Vector3(arrowHeight, 0, 0),
      new THREE.Vector3(0, arrowWidth, 0),
      new THREE.Vector3(0, -arrowWidth, 0)
    ]
    return Float32Array.from(new Array(triangleVertices.length).fill().flatMap((item, index) => triangleVertices[index].toArray()))
  }, [])

  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  let planeIntersectPoint = new THREE.Vector3()

  const dragBinding = useDrag(
    ({ active, movement: [dx, dy], down, event }) => {
      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint)
        setPosition([planeIntersectPoint.x, planeIntersectPoint.y, 0])
      }

      setIsDragging(active)
    },
    { delay: true }
  )

  return (
    // <Detailed distanced={[0,10,20]}>
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
      {...dragBinding()}>
      <Box args={[length, segmentWidth, -0.0001]} onClick={handleClick}>
        <meshStandardMaterial attach="material" color={hovered ? 'hotPink' : 'orange'} />
      </Box>

      <mesh position={[length / 2 - arrowHeight, 0, 0]}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={['attibutes', 'position']}
            attach="attributes-position"
            array={f32array}
            itemSize={3}
            count={3}
            color="blue"
          />
        </bufferGeometry>
        <meshBasicMaterial attach="material" color={hovered ? 'hotPink' : 'blue'} side={THREE.DoubleSide} wireFrame="false" />
      </mesh>
    </group>
    // </Detailed>
  )
}
