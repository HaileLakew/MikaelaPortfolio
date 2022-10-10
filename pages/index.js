
import { motion, useDragControls, useMotionValue, useSpring } from 'framer-motion';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Introduction from './sections/Introduction';
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

  const mouseActions = {
    onMouseEnter: () => setCursorVariant("text"),
    onMouseLeave: () => setCursorVariant("default")
  }

  return (
    <div>
      <Head>
        <title>Mikaela Lakew | Graphic Designer</title>
        <meta name="description" content="Mikaela Personal Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href='https://use.typekit.net/hcu8dkr.css'/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap" rel="stylesheet"/>
      </Head>
      
      <div onMouseMove={handleMouse}>
        <Navbar 
          textEnter={mouseActions.onMouseEnter} 
          textLeave={mouseActions.onMouseLeave}/>
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
          className="bg-[#f2ebe3] snap-y snap-mandatory h-screen overflow-scroll" 
          id="body"
          onMouseMove={handleMouse}
        >
 
        <LandingPage />

        <Introduction mouseActions={mouseActions}/>


          <div className="h-screen w-screen snap-center">
            <div className='text-9xl'>
              Lorem Ipsum 
            </div>
          </div>


      </div>
      
      <footer> </footer>
    </div>
  )
}
