import { OrbitControls, PerformanceMonitor } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useEffect, useRef, useState } from 'react'
// import { Box, OrbitControls, useTexture, Text } from "@react-three/drei";
import * as THREE from 'three'
import Grid2, { GridHelper } from './components/grid'
import { Segment } from './components/line'
import { Segments, Segments2 } from './components/segment'
import { Triangles } from './components/triangle'

export default function App() {
  const triangleVertices = [new THREE.Vector3(0, 5, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 0, 0)]
  const a = new THREE.Vector3(0, 5, 0)
  const b = new THREE.Vector3(0, 0, 0)

  const { NB, ...controlProps } = useControls('controls', {
    NB: { label: 'Max Object', value: 10, min: 1, max: 10, step: 4 },
    // color1: '#f0f0f0',
    // color2: '#f0f0f0'
    enablePerf: { label: 'Enable Performance', value: false }
  })

  const cameraRef = useRef()
  const [isDragging, setIsDragging] = useState(false)
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)

  const allShapesRef = useRef(new Set())

  const handleRefShape = (el) => {
    if (el) allShapesRef.current.add(el.uuid, el)
  }

  const [segments, setSegments] = useState([])

  useEffect(() => {
    const tmo = setTimeout(() => {
      setSegments(() => {
        console.time('seg generation')
        const out = Array(10).fill(0)
        console.timeEnd('seg generation')

        return out
      })
    }, 5000)

    return () => {
      clearTimeout(tmo)
      setSegments([])
    }
  }, [])
  // console.log('test', a.)

  const [dpr, setDpr] = useState(1.5)

  const res = (
    <>
      <Canvas
        dpr={dpr}
        // frameloop="demand"
        camera={{ position: [1, 0, 5] }}
        onCreated={({ gl }) => gl.setClearColor('#fffff')}
        ref={cameraRef}>
        <PerformanceMonitor
          onChange={({ factor }) => {
            console.log('new DPR', 0.1 + 1.5 * factor)
            setDpr(0.5 + 1.5 * factor)
          }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          {/* <Triangles NB={NB} /> */}
          {/* <Segments NB={NB} /> */}
          <Segments2 NB={NB} />
          {/* <Box position={[-2, 0, 0]} /> */}
          {/* <Box2 position={[1.2, 0, 0]} /> */}
          {/* <Line start={[0, 0]} end={[1, 0]} /> */}
          {/* <Segment
            id="123"
            start={[0, 0]}
            end={[2, 2]}
            groupRef={handleRefShape}
            cameraRef={cameraRef}
            setIsDragging={setIsDragging}
            floorPlane={floorPlane}
          /> */}
          {/* {segments.map((val, i) => {
            return (
              <Segment
                key={i.toString()}
                id={i}
                start={[-(i % 100) + 3 * Math.floor(i / 100), (i % 100) + 3 * Math.floor(i / 100)]}
                end={[2 - (i % 100) + 3 * Math.floor(i / 100), 2 + (i % 100) + 3 * Math.floor(i / 100)]}
                groupRef={handleRefShape}
                cameraRef={cameraRef}
                setIsDragging={setIsDragging}
                floorPlane={floorPlane}
              />
            )
          })} */}
          {/* <Triangle vertices={triangleVertices} /> */}
          <GridHelper />
          <Grid2 size={4} />
          <OrbitControls enabled={!isDragging} />
          {/* <Cube  position={[0,0,0]} rotation={[0,0,0]} /> */}
        </PerformanceMonitor>
        {controlProps.enablePerf ? <Perf position="top-left" showGraph={false} /> : <></>}
      </Canvas>

      {/* <Stats /> */}
    </>
  )

  return res
}
