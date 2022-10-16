
import { motion, useSpring } from 'framer-motion';
import Head from 'next/head'
import { useState } from 'react';
import CustomCanvas from '../components/Canvas';
import Navbar from './components/Navbar';
import Introduction from './sections/Introduction';
import LandingPage from './sections/LandingPage'
import ScrollingSkill from './sections/ScrollingSkill';

export default function Home() {
  const [cursorVariant, setCursorVariant] = useState("default");

  const mouseX = useSpring(0, { stiffness: 100, damping: 10, restDelta: 2, mass: 0.5 })
  const mouseY = useSpring(0, { stiffness: 100, damping: 10, restDelta: 2, mass: 0.5 })

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

  if(typeof window !== 'undefined') onmousemove = (event) => {
    mouseX.set(event.clientX - (cursorVariant === "text" ? 75 : 16))
    mouseY.set(event.clientY - (cursorVariant === "text" ? 75 : 16))
  };

  return (
    <div>
      <Head>
        <title>Mikaela Lakew | Graphic Designer</title>
        <meta name="description" content="Mikaela Personal Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href='https://use.typekit.net/hcu8dkr.css'/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap" rel="stylesheet"/>
      </Head>
      

      <Navbar 
        textEnter={mouseActions.onMouseEnter} 
        textLeave={mouseActions.onMouseLeave}/>

      <motion.div
        className='cursor z-50 hidden md:block'
        variants={variants}
        animate={cursorVariant}
        style={{
          top: mouseY,
          left: mouseX
        }}/>

      <div className="bg-[#f2ebe3] h-[500vh] overflow-scroll">

        <CustomCanvas/>

        <LandingPage />

        <Introduction mouseActions={mouseActions}/>

        <div className="h-screen w-screen">
          <div className='text-9xl'>
            Lorem Ipsum 
          </div>
        </div>

        <ScrollingSkill/>

        <div className="h-screen w-screen">
          <div className='text-9xl'>
            Lorem Ipsum 
          </div>
        </div>
      </div>
      
      <footer> </footer>
    </div>
  )
}

