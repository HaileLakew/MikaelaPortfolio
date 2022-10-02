import { AdaptiveDpr, AdaptiveEvents, BakeShadows, Float, MeshDistortMaterial, Plane, Scroll, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { animate, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";


export default function LandingPage () {
    
    const sizeFactor = 1.25;

    const sphereProperties = [
        {
            ref: useRef(),
            altRef: useRef(),
            position: [0, 0, 0],
            altPosition: {
                x: useSpring(0, { duration: 2500}),
                y: useSpring(0, { duration: 2500}),
            },
            args: [1.75 * sizeFactor, 64, 64],
            color: useMotionValue('#FF0000'),
            altColor: useMotionValue('#00ff00')
        },
        {
            ref: useRef(),
            altRef: useRef(),
            position: [-2, 2, 0],
            altPosition: {
                x: useSpring(-2, { duration: 2500}),
                y: useSpring(2, { duration: 2500}),
            },
            args: [1 * sizeFactor, 64, 64],
            color: useMotionValue('#00FF00'),
            altColor: useMotionValue('#0000ff')
        },
        {
            ref: useRef(),
            altRef: useRef(),
            position: [4.5, 2, -2],
            altPosition: {
                x: useSpring(4.5, { duration: 2500}),
                y: useSpring(2, { duration: 2500}),
            },
            args: [1.5 * sizeFactor, 64, 64],
            color: useMotionValue('#0000FF'),
            altColor: useMotionValue('#FF0000')
        },
        {
            ref: useRef(),
            altRef: useRef(),
            position: [-4, -1.5, -3],
            altPosition: {
                x: useSpring(-4, { duration: 2500}),
                y: useSpring(-1.5, { duration: 2500}),
            },
            args: [2 * sizeFactor, 64, 64],
            color: useMotionValue('#a34100'),
            altColor: useMotionValue('#F2EBE3')
        },
    ]


    sphereProperties.forEach((sphere)=>{
        animate(sphere.color, sphere.altColor.get(), { 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
        })
    })

    useFrame(({clock, mouse})=>{
        sphereProperties.forEach((sphere)=>{
            sphere.ref.current.material.color = new THREE.Color( sphere.color.get())
            sphere.ref.current.rotation.y = THREE.MathUtils.lerp(
                sphere.ref.current.rotation.y,
                mouse.x * Math.PI,
                0.005
            );
            sphere.ref.current.rotation.x = THREE.MathUtils.lerp(
                sphere.ref.current.rotation.x,
                mouse.y * Math.PI,
                0.005
            );
            
            // console.log(sphere.altPosition.x.get());

            sphere.altRef.current.position.x = sphere.altPosition.x.get();
            sphere.altRef.current.position.y = sphere.altPosition.y.get();
        })
    })

    return (
        <>
            <Scroll>
                <pointLight position={[10, 10, 5]} intensity={0.5} />

                {/* Floating Spheres */}
                {sphereProperties.map((sphere, index) => {
                    const randomFactor = Math.random() * 10 + index;

                    return (
                        <Float key={index} floatIntensity={randomFactor} floatingRange={randomFactor}>
                            <Sphere ref={sphere.ref} position={sphere.position} args={sphere.args}
                                onPointerOver={(e) => { 
                                    sphere.altPosition.x.set(sphere.position[0] + (.5 * Math.random() < 0.15 ? -1 : 1))
                                    sphere.altPosition.y.set(sphere.position[1] + (.5 * Math.random() < 0.15 ? -1 : 1))
                                 }} 
                                onPointerOut={(e) => { 
                                    sphere.altPosition.x.set(sphere.position[0])
                                    sphere.altPosition.y.set(sphere.position[1])
                                }} 
                            >
                                <MeshDistortMaterial
                                    color={sphere.color.get()}
                                    speed={1}
                                    factor={1}
                                    bumpScale={0.005}
                                    clearcoat={1}
                                    clearcoatRoughness={1}
                                    radius={1}
                                    distort={0.4}
                                />
                            </Sphere>
                            <Sphere ref={sphere.altRef} position={sphere.position} args={sphere.args}>
                                <MeshDistortMaterial
                                    color={sphere.color.get()}
                                    speed={1}
                                    factor={1}
                                    bumpScale={0.005}
                                    clearcoat={1}
                                    clearcoatRoughness={1}
                                    radius={1}
                                    distort={0.4}
                                />
                            </Sphere>
                        </Float>

                    )
                })}

                <EffectComposer>
                    <DepthOfField focusDistance={1} focalLength={1} bokehScale={50} height={480}/>
                    <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
                    <Noise opacity={0.1} />
                    <Vignette eskil={false} offset={0.1} darkness={1} />
                </EffectComposer>


                <BakeShadows />
                <AdaptiveDpr pixelated/>
                <AdaptiveEvents />
            </Scroll>
            <Scroll html>
                <div className="noise w-screen h-screen opacity-30 "/>
                <div className="text-9xl font-bold fixed top-[25vh] left-[20vw] mix-blend-soft-light">
                    <div className="text-center"> Mikaela Lakew </div>
                    <div className="text-center"> Graphic Designer </div>
                </div>
            </Scroll>
        </>
    )
}