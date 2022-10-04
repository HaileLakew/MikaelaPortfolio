
import { motion } from 'framer-motion';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './sections/LandingPage'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const [cursorVariant, setCursorVariant] = useState("default");


  const mouseMove = e => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    })
  }

  useEffect(() => {
    document.querySelectorAll('.pointerBody').forEach((body)=>{
      body.addEventListener("mousemove", mouseMove);
    })

    return () => {
      document.querySelectorAll('.pointerBody').forEach((body)=>{
        body.removeEventListener("mousemove", mouseMove);
      })
    }
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
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

      <Navbar/>

      <div className="bg-[#d8c1a7] snap-y snap-mandatory h-screen overflow-scroll">
      
        <LandingPage />

        <div className="pointerBody">
          <div className="h-screen w-screen snap-start">
            <div className='text-9xl text-center' onMouseEnter={textEnter} onMouseLeave={textLeave}>
              Yeet 
            </div>
          </div>

          <div className="h-screen w-screen snap-center">
            <div className='text-9xl'>
              Yeet 
            </div>
          </div>
        </div>

        <motion.div
            className='cursor'
            variants={variants}
            animate={cursorVariant}
          />
      </div>

      <footer> </footer>
    </div>
  )
}
