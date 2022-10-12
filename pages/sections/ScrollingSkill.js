
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
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
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false
    });
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  
    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
  
      /**
       * This is what changes the direction of the scroll once we
       * switch scrolling directions.
       */
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
  
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
  
      baseX.set(baseX.get() + moveBy);
    });
  
    /**
     * The number of times to repeat the child text should be dynamically calculated
     * based on the size of the text and viewport. Likewise, the x motion value is
     * currently wrapped between -20 and -45% - this 25% is derived from the fact
     * we have four children (100% / 4). This would also want deriving from the
     * dynamically generated number of children.
     */
    return (
      <div className="overflow-hidden flex flex-nowrap font-moret mt-5 text-[#B86F52]">
        <motion.div className="text-4xl md:text-9xl whitespace-nowrap" style={{ x }}>
            {Array.from({ length: repeats }, (key) => <span className="pt-8" key={key}>{children} </span>)}
        </motion.div>
      </div>
    );
  }