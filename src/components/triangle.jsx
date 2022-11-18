import { useFrame } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

// const NB = 100;

const tempColor = new THREE.Color()
// const colorArray = Float32Array.from(
//   new Array(NB)
//     .fill('')
//     // @ts-ignore
//     .flatMap((_, i) => tempColor.set('red').toArray())
// )

const tempObject = new THREE.Object3D()
// const tempColor = new THREE.Color()

export function Triangles({ NB }) {
  const meshRef = useRef()
  const vertices = useMemo(() => {
    const triangleVertices = [new THREE.Vector3(0, 0.1, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.1, 0, 0)]

    return Float32Array.from(new Array(triangleVertices.length).fill('').flatMap((item, index) => triangleVertices[index].toArray()))
  }, [])

  // const vertices = [0,5,0,0,0,0,5,0,0];

  useLayoutEffect(() => {
    console.log('in useEffect', meshRef)

    if (meshRef === null) return
    if (meshRef.current === null) return

    const mesh = meshRef.current

    for (let i = 0; i < NB; i++) {
      console.log('updatePos')
      //position
      tempObject.position.set(20 * Math.random(), 20 * Math.random(), 3 * Math.random())
      tempObject.rotation.set(0, 0, (180 / Math.PI) * Math.random() * 360)
      tempObject.scale.set(Math.random(), 1, 1)
      // tempObject.position.set(0, 0, 0)
      tempObject.updateMatrix()
      mesh.setMatrixAt(i, tempObject.matrix)
      // mesh.setColorAt(i, tempColor.setRGB(Math.floor(Math.random() * 255), Math.floor(Math.random()* 255), Math.floor(Math.random()* 255)))
      mesh.setColorAt(i, tempColor.setHex(Math.random() * 0xffffff))
      // tempObject.setRGB(255, 0, 0);
      // tempObject.instanceColor
      // setColorAt(i, tempColor.setRGB(255, 100, 0))

      tempObject.needsUpdate = true

      // color
    }

    mesh.instanceMatrix.needsUpdate = true
    mesh.instanceColor.needsUpdate = true
    mesh.material.needsUpdate = true
  }, [])

  console.log('meshRef', meshRef)

  return (
    <instancedMesh ref={meshRef} args={[null, null, 50000]} count={NB}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attibutes', 'position']}
          attach="attributes-position"
          array={vertices}
          itemSize={3}
          count={3}></bufferAttribute>
        {/* <instancedBufferAttribute attachObject={['attributes', 'position']} args={[vertices, 3]} />
        <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          args={[colorArray, 3]}
        /> */}

        {/* <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          args={[colorArray, 3]}
        /> */}
      </bufferGeometry>
      {/* <boxBufferGeometry attach="geometry" args={[1, 1, 1]}> 
      </boxBufferGeometry> */}
      <meshBasicMaterial attach="material" side={THREE.DoubleSide} />
      {/* <meshPhongMaterial attach="material" vertexColors /> */}
    </instancedMesh>
  )
}
