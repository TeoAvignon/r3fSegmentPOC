import { Box, Instance, Instances, Merged } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Segment } from './line'

// const NB = 100;
const segmentWidth = 0.2
const arrowHeight = 0.3
const arrowWidth = 0.4

const tempColor = new THREE.Color()
// const colorArray = Float32Array.from(
//   new Array(NB)
//     .fill('')
//     // @ts-ignore
//     .flatMap((_, i) => tempColor.set('red').toArray())
// )

const tempObject = new THREE.Object3D()
// const tempColor = new THREE.Color()

const tempArrow1 = new THREE.Object3D()
const tempArrow2 = new THREE.Object3D()

export function Segments({ NB }) {
  const meshRef = useRef()
  // const vertices = useMemo(() => {
  //   const triangleVertices = [new THREE.Vector3(0, 0.1, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.1, 0, 0)]

  //   return Float32Array.from(new Array(triangleVertices.length).fill('').flatMap((item, index) => triangleVertices[index].toArray()))
  // }, [])

  // Arrow data
  const vertices = useMemo(() => {
    const triangleVertices = [
      new THREE.Vector3(arrowHeight, 0, 0),
      new THREE.Vector3(0, arrowWidth, 0),
      new THREE.Vector3(0, -arrowWidth, 0)
    ]
    return Float32Array.from(new Array(triangleVertices.length).fill().flatMap((item, index) => triangleVertices[index].toArray()))
  }, [])

  const vertices2 = useMemo(() => {
    const triangleVertices = [new THREE.Vector3(1, 0.1, 0), new THREE.Vector3(1, 0, 0), new THREE.Vector3(1 + 0.1, 0, 0)]

    return Float32Array.from(new Array(triangleVertices.length).fill('').flatMap((item, index) => triangleVertices[index].toArray()))
  }, [])

  const segmentsPos = useMemo(
    () => new Array(NB).fill(0).map(() => [[1 * Math.random(), 1 * Math.random()], 20 * Math.random(), 20 * Math.random()]),
    [NB]
  )
  const segmentsColor = useMemo(() => new Array(NB).fill('').map(() => tempColor.setHex(Math.random() * 0xffffff).clone()), [NB])

  // const vertices = [0,5,0,0,0,0,5,0,0];

  useLayoutEffect(() => {
    console.log('in useEffect', meshRef)

    if (meshRef === null) return
    if (meshRef.current === null) return

    const mesh = meshRef.current

    for (let i = 0; i < NB; i++) {
      const coords = segmentsPos[i]

      // first arrow
      tempObject.position.set(coords[0][0], coords[0][1], 0)
      tempObject.updateMatrix()
      mesh.setMatrixAt(i, tempObject.matrix)
      mesh.setColorAt(i, segmentsColor[i])
      tempObject.needsUpdate = true

      // second arrow
      // tempObject.position.set(coords[1][0], coords[1][1], 0)
      // tempObject.updateMatrix()
      // mesh.setMatrixAt(i, tempObject.matrix)
      // mesh.setColorAt(i, segmentsColor[i])
      // tempObject.needsUpdate = true

      //position
      //tempObject.position.set(20 * Math.random(), 20 * Math.random(), 0)
      //tempObject.rotation.set(0, 0, (180 / Math.PI) * Math.random() * 360)
      // tempObject.scale.set(Math.random(), 1, 1)
      // tempObject.position.set(0, 0, 0)
      // tempObject.updateMatrix()
      // mesh.setMatrixAt(i, tempObject.matrix)
      // mesh.setColorAt(i, tempColor.setRGB(Math.floor(Math.random() * 255), Math.floor(Math.random()* 255), Math.floor(Math.random()* 255)))
      // mesh.setColorAt(i, segmentsColor[i])
      // tempObject.setRGB(255, 0, 0);
      // tempObject.instanceColor
      // setColorAt(i, tempColor.setRGB(255, 100, 0))

      // tempObject.needsUpdate = true

      // color
    }

    // mesh.instanceMatrix.needsUpdate = true
    // mesh.instanceColor.needsUpdate = true
    // mesh.material.needsUpdate = true
  }, [NB])

  console.log('meshRef', meshRef)

  const hovered = false
  const handleClick = () => {
    return
  }

  return (
    <instancedMesh ref={meshRef} args={[null, null, 50000]} count={NB}>
      {/* <group> */}
      {/* <boxBufferGeometry args={[0.1, segmentWidth, -0.0001]} onClick={handleClick}>
        <meshBasicMaterial attach="material" color={hovered ? 'hotPink' : 'orange'} />
      </boxBufferGeometry> */}
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attibutes', 'position']}
          attach="attributes-position"
          array={vertices}
          itemSize={3}
          count={3}></bufferAttribute>
      </bufferGeometry>
      <meshBasicMaterial attach="material" side={THREE.DoubleSide} />

      {/* </group> */}
      {/* <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attibutes', 'position']}
          attach="attributes-position"
          array={vertices2}
          itemSize={3}
          count={3}></bufferAttribute>
      </bufferGeometry> */}
    </instancedMesh>
  )
}

export function Segments2({ NB }) {
  const meshRef = useRef()
  // const vertices = useMemo(() => {
  //   const triangleVertices = [new THREE.Vector3(0, 0.1, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.1, 0, 0)]

  //   return Float32Array.from(new Array(triangleVertices.length).fill('').flatMap((item, index) => triangleVertices[index].toArray()))
  // }, [])

  const vertices = useMemo(() => {
    const triangleVertices = [
      new THREE.Vector3(arrowHeight, 0, 0),
      new THREE.Vector3(0, arrowWidth, 0),
      new THREE.Vector3(0, -arrowWidth, 0)
    ]
    return Float32Array.from(new Array(triangleVertices.length).fill().flatMap((item, index) => triangleVertices[index].toArray()))
  }, [])

  const vertices2 = useMemo(() => {
    const triangleVertices = [new THREE.Vector3(1, 0.1, 0), new THREE.Vector3(1, 0, 0), new THREE.Vector3(1 + 0.1, 0, 0)]

    return Float32Array.from(new Array(triangleVertices.length).fill('').flatMap((item, index) => triangleVertices[index].toArray()))
  }, [])

  const segmentsPos = useMemo(
    () =>
      new Array(NB).fill(0).map(() => [
        [1 * Math.random(), 1 * Math.random()],
        [20 * Math.random(), 20 * Math.random()]
      ])
    // () =>
    //   new Array(NB).fill(0).map(() => [
    //     [0, 0],
    //     [1, 1]
    //   ]),
    // [NB]
  )
  const segmentsColor = useMemo(() => new Array(NB).fill('').map(() => tempColor.setHex(Math.random() * 0xffffff).clone()), [NB])

  const hovered = false
  const handleClick = () => {
    return
  }

  const groupRef = useRef()
  const position = [0, 0, 0]
  const rotation = [0, 0, 0]
  const scale = [1, 1, 1]
  const length = 1

  const objects = useMemo(() => Array.from({ length: NB }).map(() => new THREE.Object3D()), [NB])
  const [trees, setTrees] = useState([])

  useLayoutEffect(() => {
    for (let i = 0; i < NB; i++) {
      const coords = segmentsPos[i]
      const startVector = new THREE.Vector3(coords[0][0], coords[0][1], 0)
      const endVector = new THREE.Vector3(coords[1][0], coords[1][1], 0)
      const length = endVector.distanceTo(startVector)
      const dx = coords[1][0] - coords[0][0]
      const dy = coords[1][1] - coords[0][1]
      const angle = Math.atan2(dy, dx)
      const obj = objects[i]

      console.log('dx / dy', dx, dy, angle)
      obj.position.set(coords[0][0] + dx / 2, coords[0][1] + dy / 2, 0)
      obj.rotation.set(0, 0, angle)
      obj.scale.set(length, 1, 1)
    }

    setTrees(objects)
  }, [NB])

  return (
    <>
      <Instances range={NB}>
        <boxGeometry args={[length, segmentWidth, 0]} />
        <meshBasicMaterial />

        {trees.map((obj, i) => {
          return <Seg key={i} id={i} object={obj} color={segmentsColor[i]} />
        })}
      </Instances>
      <Instances range={NB}>
        {/* <boxGeometry args={[length, segmentWidth, 0]} />
        <meshBasicMaterial /> */}
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={['attibutes', 'position']}
            attach="attributes-position"
            array={vertices}
            itemSize={3}
            count={3}
            color="blue"
          />
        </bufferGeometry>
        <meshBasicMaterial attach="material" color={hovered ? 'hotPink' : 'blue'} side={THREE.DoubleSide} wireFrame="false" />

        {trees.map((obj, i) => {
          return <TriangleSeg key={i} id={i} object={obj} color={segmentsColor[i]} />
        })}
      </Instances>
    </>
  )
}

function Seg({ id, object, color, temp = new THREE.Object3D(), ...props }) {
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return

    ref.current.position.copy(object.position)
    ref.current.position.set(object.position.x, object.position.y, id / 1000)
    ref.current.rotation.set(0, 0, object.rotation.z)
    ref.current.scale.set(object.scale.x, object.scale.y, object.scale.z)
  }, [object, id])

  return (
    <group {...props}>
      <Instance ref={ref} color={color} />
    </group>
  )
}
function TriangleSeg({ id, object, color, temp = new THREE.Object3D(), ...props }) {
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return

    const length = object.scale.x
    ref.current.position.copy(object.position)
    ref.current.position.set(object.position.x * 2, object.position.y * 2, id / 1000)
    ref.current.rotation.set(0, 0, object.rotation.z)
    ref.current.scale.set(1, 1, 1)
  }, [object, id])

  return (
    <group {...props}>
      <Instance ref={ref} color={color} />
    </group>
  )
}
