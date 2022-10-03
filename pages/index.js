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
        <link rel="stylesheet" href='https://use.typekit.net/hcu8dkr.css'/>
      </Head>

      <div className="bg-[#d8c1a7] snap-y snap-mandatory h-screen overflow-scroll">
        <LandingPage/>

        <div className="h-screen w-screen snap-start">
          <div>
            Yeet 
          </div>
        </div>

        <div className="h-screen w-screen snap-center">
          <div>
            Yeet 
          </div>
        </div>
      </div>

      <footer> </footer>
    </div>
  )
}
