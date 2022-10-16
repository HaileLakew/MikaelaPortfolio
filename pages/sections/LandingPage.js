import { motion } from "framer-motion";

export default function LandingPage () {
    return (
        <div className="h-screen font-moret"> 
            <div className="absolute noise"/>
            <div className="absolute top-1/4 left-1/4 text-5xl md:text-8xl lg:text-9xl font-bold opacity-70 text-white mix-blend-overlay pointer-events-none">
                <div className="m-10 overflow-hidden">
                    <div className="flex justify-center"> 
                        {`Mikaela Lakew`.split("").map((token, index)=>{
                            return(
                                <motion.div key={index} style={{margin: `0 ${7 * (token === ' ')}px`}} 
                                    initial={{ opacity: 0, y: '100%' }} 
                                    whileInView={{ opacity: 1, y:0, transition: {delay: index/10, duration: 1}}}>
                                        {token}
                                </motion.div>)
                        })}
                    </div>
                </div>

                <motion.div className="flex justify-center"
                    initial={{  x: '3%' }} whileInView={{x: 0, transition: {delay: 1.5, duration: 1}}}> 
                        <span className="">Graphic Design</span>
                        <motion.div
                            initial={{ opacity: 0, y: '10%' }}
                            whileInView={{ opacity: 1, y:0, transition: {delay: 1.75, duration: 1}}}>er</motion.div>
                </motion.div>
            </div>
        </div>
    )
}

