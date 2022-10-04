import { AdaptiveDpr, AdaptiveEvents, BakeShadows, Float, Html, Instance, Instances, MeshDistortMaterial, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { motion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LandingPage () {
    return (
        <div className='snap-center max-h-[120vh]'>
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1}}
                viewport={{ once: true }}
                style={{
                    height: '110vh', 
                    width: '100vw', 
                    color: '#F2EBE3', 
                    filter: 'blur(50px)'
                  }}
            >
                <Canvas 
                    performance={{ min: 0.1 }} gl={{ antialias: false }}
                    onCreated={({ gl }) => ((gl.shadowMap.autoUpdate = false), (gl.shadowMap.needsUpdate = true))}>

                    <pointLight intensity={1} position={[10, 10, 10]}/>

                    <SphereBlobs/>
                    <Preload/>

                    <EffectComposer>
                        <Vignette eskil={false} offset={0.1} darkness={1} />
                    </EffectComposer>

                    <BakeShadows />
                    <AdaptiveDpr pixelated/>
                    <AdaptiveEvents />
                    <Html fullscreen>
                        <div className="w-screen h-[120vh] opacity-20 bg-gradient-to-tr from-amber-700 to-[#F2EBE3]"/>
                    </Html>
                </Canvas>
 
            </motion.div>
            
            <div className="noise relative" style={{bottom: '110vh'}}/>

            <div className="relative bottom-[200vh] snap-center text-9xl font-bold text-black mix-blend-soft-light">
                <div className="h-36 overflow-hidden">
                    <div className="flex justify-center"> 
                        {`Mikaela Lakew`.split("").map((token, index)=>{
                            return(
                                <motion.div key={index} style={{margin: `0 ${10 * (token === ' ')}px`}} 
                                    initial={{ opacity: 0, y: '100%' }} 
                                    whileInView={{ opacity: 1, y:0, transition: {delay: index/20, duration: 1}}}>
                                        {token}
                                </motion.div>)
                        })}
                    </div>
                  </div>
                <motion.div className="flex justify-center"
                    initial={{  x: '3%' }}
                    whileInView={{x: 0, transition: {delay: 1.5, duration: 1}}}> 
                        Graphic Design
                        <motion.div
                            initial={{ opacity: 0, y: '10%' }}
                            whileInView={{ opacity: 1, y:0, transition: {delay: 1.75, duration: 1}}}>er</motion.div>
                </motion.div>
            </div>
        </div>
    )
}

function SphereBlobs() {

    const sphereProperties = [
        {
            ref: useRef(),
            altRef: useRef(),
            position: [2, -2, 2],
            altPosition: {
                x: useSpring(2, { duration: 1500}),
                y: useSpring(-2, { duration: 1500}),
            },
            scale: 3.5,
            color: useSpring('#a34100')
        },
        {
            ref: useRef(),
            altRef: useRef(),
            position: [-1, 4, 0],
            altPosition: {
                x: useSpring(-1, { duration: 1500}),
                y: useSpring(4, { duration: 1500}),
            },
            scale: 3,
            color: useSpring('#F29F05')
        },

        {
            ref: useRef(),
            altRef: useRef(),
            position: [-5, -1.5, -3],
            altPosition: {
                x: useSpring(-5, { duration: 1500}),
                y: useSpring(-1.5, { duration: 1500}),
            },
            scale: 2.5,
            color: useSpring('#731919')
        },
    ]

    const groupRef = useRef();

    useFrame(({mouse, clock})=>{
        groupRef.current.rotation.x = clock.getElapsedTime() / 5;
        groupRef.current.rotation.y = clock.getElapsedTime() / 5;

        groupRef.current.position.z = Math.sin(clock.getElapsedTime() / 2) - 7;

        sphereProperties.forEach((sphere)=>{

            sphere.ref.current.rotation.y = THREE.MathUtils.lerp(
                sphere.ref.current.rotation.y,
                mouse.x * Math.PI,
                0.007
            );
            sphere.ref.current.rotation.x = THREE.MathUtils.lerp(
                sphere.ref.current.rotation.x,
                mouse.y * Math.PI,
                0.007
            );
            
            sphere.ref.current.color.set( sphere.color.get() );
            sphere.altRef.current.color.set( sphere.color.get() );

            sphere.altRef.current.position.x = sphere.altPosition.x.get();
            sphere.altRef.current.position.y = sphere.altPosition.y.get();
        })
    })

    return (
        <group ref={groupRef} position-z={-5}>
            <Instances>
                <sphereGeometry args={[1.25, 16, 16]}/>
                <MeshDistortMaterial toneMapped={false} fog={false}
                    speed={1}
                    factor={1}
                    bumpScale={0.005}
                    clearcoat={1}
                    clearcoatRoughness={1}
                    radius={1}
                    distort={0.5}
                />
                {sphereProperties.map((sphere, index) => {
                    const randomFactor = Math.random() * 20 + index;

                    return (
                        <Float key={index} floatIntensity={randomFactor} floatingRange={randomFactor}>
                            <Instance
                                ref={sphere.ref} 
                                scale={sphere.scale}
                                color={sphere.color.get()}
                                position={sphere.position} 
                                onPointerOver={(e) => { 
                                    sphere.altPosition.x.set(sphere.position[0] + (Math.random() < 0.15 ? -2 : 2))
                                    sphere.altPosition.y.set(sphere.position[1] + (Math.random() < 0.15 ? -2 : 2))
                                    }} 
                                onPointerOut={(e) => { 
                                    sphere.altPosition.x.set(sphere.position[0])
                                    sphere.altPosition.y.set(sphere.position[1])
                                }} 
                                onClick={(e) => {
                                    sphere.color.set(`rgb(${randomBetween(90, 243)},${randomBetween(39, 180)},${randomBetween(6, 46)})`);
                                }}
                            />
                            <Instance ref={sphere.altRef} color={sphere.color.get()} scale={sphere.scale} position={sphere.position} />
                        </Float>
                    )
                })}
            </Instances>

        </group>
    )
}

const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));