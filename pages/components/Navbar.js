import {motion, useCycle} from 'framer-motion';
import { useEffect } from 'react';

export default function Navbar({textEnter, textLeave}) {
    const [isOpen, toggleOpen] = useCycle(false, true);

    const sidebar = {
        open: {
            top: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        closed: {
            bottom: '100%',
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    useEffect(()=>{
        isOpen ?  document.documentElement.style.overflow = 'hidden' : document.documentElement.style.overflow = 'scroll' 
    }, [isOpen])

    return (
        <motion.nav 
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className='flex fixed top-0 left-[100vw] justify-end z-40 pointerBody'>

            <motion.div className="bg-[#d8c1a7] w-screen h-screen fixed p-[10%]" variants={sidebar} >

                {"PROJECTS ABOUT CONNECT".split(` `).map((word, index) => {
                    return (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: '100%' }}
                            onMouseEnter={textEnter}
                            onMouseLeave={textLeave}
                            whileInView={{ opacity: 1, y:0, transition: { delay: index/7 } }}
                            className='text-5xl md:text-8xl lg:text-9xl text-center m-10 h-36 overflow-hidden'>
                        {word}
                    </motion.div>
                    )
                })}

            </motion.div>

            <button className='absolute top-0 m-4' 
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
                onClick={() => toggleOpen()} >
                <svg width="75" height="75" viewBox="0 0 30 20">
                    <Path variants={{ closed: { d: "M 2 2.5 L 20 2.5" }, open: { d: "M 3 16.5 L 17 2.5" }}}/>
                    <Path variants={{ closed: { d: "M 2 10.346 L 20 10.346" }, open: { d: "M 3 2.5 L 17 16.346" }}}/>
                </svg>
            </button>
      </motion.nav>
    )
}

const Path = props => (
    <motion.path
      fill="transparent"
      strokeWidth="1"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      {...props}
    />
  );
