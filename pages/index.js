import { ArcballControls, FirstPersonControls, FlyControls, Html, MapControls, OrbitControls, PresentationControls, Scroll, ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Head from 'next/head'
import LandingPage from './sections/LandingPage'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mikaela Lakew | Graphic Designer</title>
        <meta name="description" content="Mikaela Personal Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div class="bg-[#d8c1a7] snap-y snap-mandatory h-screen overflow-scroll">
        <div className='snap-center'>
          <Canvas 
            performance={{ min: 0.1 }} gl={{ antialias: false }}
            onCreated={({ gl }) => ((gl.shadowMap.autoUpdate = false), (gl.shadowMap.needsUpdate = true))}
            style={{height: '120vh', width: '100vw', color: '#F2EBE3', filter: 'blur(50px)'}}>
            <PresentationControls
              global={false} // Spin globally or by dragging the model
              cursor={true} // Whether to toggle cursor style on drag
              snap={true} // Snap-back to center (can also be a spring config)
              speed={1} // Speed factor
              zoom={1} // Zoom factor when half the polar-max is reached
              rotation={[0, 0, 0]} // Default rotation
              polar={[0, Math.PI / 2]} // Vertical limits
              azimuth={[-Infinity, Infinity]} // Horizontal limits
              config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
            >
              <LandingPage/>
            </PresentationControls>
            <Html fullscreen>
              <div className="w-screen h-[120vh] opacity-20 bg-amber-800"/>
            </Html>
          </Canvas>
          <div className="flex flex-col relative bottom-[85vh] justify-center snap-center text-9xl font-bold text-amber-100 mix-blend-soft-light">
            <div className="text-center"> Mikaela Lakew </div>
            <div className="text-center"> Graphic Designer </div>
          </div>
        </div>




        <div class="h-screen w-screen snap-center">
          <div>
            Yeet 
          </div>
        </div>

        <div class="h-screen w-screen snap-center">
          <div>
            Yeet 
          </div>
        </div>
      </div>

      <footer> </footer>
    </div>
  )
}
