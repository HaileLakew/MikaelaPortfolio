
import { motion, useDragControls, useMotionValue, useSpring } from 'framer-motion';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './sections/LandingPage'

export default function Home() {
  const [cursorVariant, setCursorVariant] = useState("default");

  const mouseX = useSpring(0, { stiffness: 100, damping: 10, restDelta: 2, mass: 0.5 })
  const mouseY = useSpring(0, { stiffness: 100, damping: 10, restDelta: 2, mass: 0.5 })

  function handleMouse(event) {
    mouseX.set(event.pageX - (cursorVariant === "text" ? 75 : 16))
    mouseY.set(event.pageY - (cursorVariant === "text" ? 75 : 16))
  }

  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: "#B86F52",
      mixBlendMode: "unset"
    },
    text: {
      height: 150,
      width: 150,
      backgroundColor: "#d8c1a7",
      mixBlendMode: "difference"
    }
  }

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <div>
      <Head>
        <title>Mikaela Lakew | Graphic Designer</title>
        <meta name="description" content="Mikaela Personal Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href='https://use.typekit.net/hcu8dkr.css'/>
      </Head>
      
      <div onMouseMove={handleMouse}>
        <Navbar textEnter={textEnter} textLeave={textLeave}/>
      </div>

      <motion.div
        className='cursor z-50 hidden md:block'
        variants={variants}
        animate={cursorVariant}
        style={{
          top: mouseY,
          left: mouseX
        }}/>

      <div 
          className="bg-[#d8c1a7] snap-y snap-mandatory h-screen overflow-scroll" 
          id="body"
          onMouseMove={handleMouse}
        >
 
        <LandingPage />

        <div>
          <div className="h-screen w-screen snap-center">
            <div className='text-9xl text-center' onMouseEnter={textEnter} onMouseLeave={textLeave}>
              Lorem Ipsum 
            </div>
          </div>

          <div className="h-screen w-screen snap-center">
            <div className='text-9xl'>
              Lorem Ipsum 
            </div>
          </div>
        </div>

      </div>
      
      <footer> </footer>
    </div>
  )
}
