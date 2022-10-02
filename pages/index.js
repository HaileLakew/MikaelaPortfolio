import { Scroll, ScrollControls } from '@react-three/drei'
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

      <div class="bg-[#d8c1a7] snap-mandatory snap-y">
        <div className='snap-center'>
          <Canvas style={{height: '100vh', width: '100vw', color: '#F2EBE3'}}>
            <ScrollControls pages={1}>
              <LandingPage/>
            </ScrollControls>
          </Canvas>
        </div>

        <div class="h-screen w-screen snap-begin">
          <div>
            Yeet 
          </div>
        </div>


        <div class="h-screen w-screen snap-begin">
          <div>
            Yeet 
          </div>
        </div>
      </div>

      <footer> </footer>
    </div>
  )
}
