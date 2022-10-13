import { Float, Instance, Instances, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";


export default function SphereBlobs() {

    const sphereProperties = [
        {
            ref: useRef(),
            altRef: useRef(),
            position: [0, 0, 0],
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
            position: [2, -2, 0],
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
            position: [-5, -1.5, 0],
            altPosition: {
                x: useSpring(-5, { duration: 1500}),
                y: useSpring(-1.5, { duration: 1500}),
            },
            scale: 2.5,
            color: useSpring('#610000')
        },
    ]

    const groupRef = useRef();

    useFrame(({mouse, clock})=>{
        groupRef.current.rotation.x = clock.getElapsedTime() / 5;
        groupRef.current.rotation.z = clock.getElapsedTime() / 5;

        groupRef.current.position.z = Math.sin(clock.getElapsedTime() / 2) - 10;

        sphereProperties.forEach((sphere)=>{

            sphere.ref.current.rotation.y = THREE.MathUtils.lerp(
                sphere.ref.current.rotation.y,
                mouse.x * Math.PI + Math.random(),
                0.007
            );
            sphere.ref.current.rotation.x = THREE.MathUtils.lerp(
                sphere.ref.current.rotation.x,
                mouse.y * Math.PI + Math.random(),
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
                    // wireframe
                    speed={1}
                    factor={10}
                    bumpScale={0.005}
                    radius={1.5}
                    distort={0.75}
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
                                    sphere.color.set(`rgb(${randomBetween(90, 243)},${randomBetween(39, 120)},${randomBetween(6, 46)})`);
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