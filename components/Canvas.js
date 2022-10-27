import { AdaptiveDpr, AdaptiveEvents, BakeShadows, Preload} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { motion, useScroll } from "framer-motion";

import SphereBlobs from './SphereBlobs'


export default function CustomCanvas () {
    return (
        <div className='font-moret'>
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { duration: 2 } }}
                viewport={{ once: true }}
                style={{
                    height: '100vh', 
                    width: '100vw', 
                    filter: 'blur(50px)'
                  }}
            >
                <Canvas 
                    performance={{ min: 0.1 }} gl={{ antialias: false }}
                    onCreated={({ gl }) => ((gl.shadowMap.autoUpdate = false), (gl.shadowMap.needsUpdate = true))}
                    >

                    <pointLight intensity={1.25} position={[10, 10, 10]}/>

                    <SphereBlobs/>

                    <Preload/>

                    <EffectComposer>
                        <Vignette eskil={false} offset={0.1} darkness={.7} />
                    </EffectComposer>

                    <BakeShadows />
                    <AdaptiveDpr pixelated/>
                    <AdaptiveEvents />
                </Canvas>

            </motion.div>
        </div>
    )
}

function Scroller ({children}) {
    const { scrollYProgress } = useScroll();
    const { camera } = useThree();

    useFrame(() => {
        camera.position.y = scrollYProgress.get() * -50 ;
    });

    return(
        <>
            {children}
        </>
    )
}