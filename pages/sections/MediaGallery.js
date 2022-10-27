import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function MediaGallery({ mouseActions }) {
    const [isOpen, setIsOpen] = useState(false)

    const variants = {
        open: { width: '200vw'  },
        closed: { width: '100vw'  },
      }

    return(
        <div className="h-screen snap-center overflow-scroll">
            <motion.div className="flex" animate={isOpen ? "open" : "closed"}
                variants={variants} onClick={() => setIsOpen(isOpen => !isOpen)} transition={{ ease: "easeOut", duration: .75 }}>
                {Array(5).fill().map((_, index) => {
                    return (
                        <motion.div className='m-5' key={index}
                                onMouseEnter={mouseActions.onMouseEnter}
                                onMouseLeave={mouseActions.onMouseLeave}
                                whileHover={{ scale: .8, transition: { duration: .5 } }}
                                initial={{ x: '100%' }} 
                                whileInView={{ scale: .99, x:'0%', transition: { duration: 1, delay: index/20} }}
                                viewport={{ once: true }}
                                >
                            <Image 
                            className='h-[80vh] object-cover' src={`/images/Sample${index}.jpeg`}
                            height={500} width={500} alt='image'/>
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    );
}