import { AdaptiveDpr, AdaptiveEvents, BakeShadows, Float, MeshDistortMaterial, Preload, RoundedBox, Scroll, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { animate, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";


export default function LandingPage () {
    
    return (
        <>            
            <ambientLight intensity={.25}/>

            <SphereBlobs/>
            <Preload/>

            <EffectComposer>
                <Vignette eskil={false} offset={0.1} darkness={.5} />
            </EffectComposer>


            <BakeShadows />
            <AdaptiveDpr pixelated/>
            <AdaptiveEvents />
        </>
    )
}

function SphereBlobs() {
    const sizeFactor = 1.25;

    const sphereProperties = [
        {
            ref: useRef(),
            altRef: useRef(),
            position: [2, -2, 2],
            altPosition: {
                x: useSpring(2, { duration: 1000}),
                y: useSpring(-2, { duration: 1000}),
            },
            args: [3 * sizeFactor, 32, 32],
            color: useMotionValue('#a34100')
        },
        {
            ref: useRef(),
            altRef: useRef(),
            position: [-1, 4, 0],
            altPosition: {
                x: useSpring(-1, { duration: 1000}),
                y: useSpring(4, { duration: 1000}),
            },
            args: [3 * sizeFactor, 32, 32],
            color: useMotionValue('#F29F05')
        },

        {
            ref: useRef(),
            altRef: useRef(),
            position: [-5, -1.5, -3],
            altPosition: {
                x: useSpring(-5, { duration: 1000}),
                y: useSpring(-1.5, { duration: 1000}),
            },
            args: [2.5 * sizeFactor, 32, 32],
            color: useMotionValue('#731919')
        },
    ]

    const groupRef = useRef();

    useFrame(({mouse, clock, delta})=>{
        groupRef.current.rotation.x = clock.getElapsedTime() / 5;
        groupRef.current.rotation.y = clock.getElapsedTime() / 5;

        groupRef.current.position.z = Math.sin(clock.getElapsedTime() / 2) - 5;

        sphereProperties.forEach((sphere)=>{

            sphere.ref.current.rotation.y = THREE.MathUtils.lerp(
                sphere.ref.current.rotation.y,
                mouse.x * Math.PI,
                0.003
            );
            sphere.ref.current.rotation.x = THREE.MathUtils.lerp(
                sphere.ref.current.rotation.x,
                mouse.y * Math.PI,
                0.003
            );
            

            sphere.altRef.current.position.x = sphere.altPosition.x.get();
            sphere.altRef.current.position.y = sphere.altPosition.y.get();
        })
    })

    return (
        <group ref={groupRef} position-z={-5}>
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
                                toneMapped={false} fog={false}
                                color={sphere.color.get()}
                                speed={1}
                                factor={1}
                                bumpScale={0.005}
                                clearcoat={1}
                                clearcoatRoughness={1}
                                radius={1}
                                distort={0.5}
                            />
                        </Sphere>
                        <Sphere ref={sphere.altRef} position={sphere.position} args={sphere.args}>
                            <MeshDistortMaterial
                                toneMapped={false} fog={false}
                                color={sphere.color.get()}
                                speed={1}
                                factor={1}
                                bumpScale={0.005}
                                clearcoat={1}
                                clearcoatRoughness={1}
                                radius={1}
                                distort={0.5}
                            />
                        </Sphere>
                    </Float>

                )
            })}
        </group>
    )
}