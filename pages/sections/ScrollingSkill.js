
import { useRef } from "react";
import {
  motion,
  useTransform,
  useMotionValue,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";
export default function ScrollingSkill() {
    return(
        <div className="h-screen w-screen snap-center flex justify-center flex-col">
            <ParallaxText baseVelocity={-1}>
                <span className="p-[.5%]">Branding</span>
                <span className="p-[.5%]">Logos</span>
                <span className="p-[.5%]">Posters</span>
            </ParallaxText>
            <ParallaxText baseVelocity={1}>
                <span className="p-[.5%]">Social Media Campaigning</span>
                <span className="p-[.5%]">Typefaces</span>
                <span className="p-[.5%]">Marketing</span>
            </ParallaxText>
         </div>
    )
}

function ParallaxText({ children, baseVelocity = 100 , repeats = 10 }) {
    const baseX = useMotionValue(0);

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  
    const directionFactor = useRef(1);
    
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
  
      baseX.set(baseX.get() + moveBy);
    });
  
    return (
      <div className="overflow-hidden flex flex-nowrap font-moret mt-5 text-[#B86F52]">
        <motion.div className="text-4xl md:text-9xl whitespace-nowrap" style={{ x }}>
            {Array.from({ length: repeats }, (key) => <span className="pt-8" key={key}>{children} </span>)}
        </motion.div>
      </div>
    );
  }