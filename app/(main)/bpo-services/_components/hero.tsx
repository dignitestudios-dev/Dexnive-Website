"use client";

import FloatingLines from "@/components/FloatingLines";
import HeroButton from "@/components/ui/hero-button";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="md:-mb-0 -mb-40">
      <Image
        src="/images/blue-hue.png"
        alt="bg"
        fill
        className="absolute inset-0 z-20 object-cover"
      />
      <div className="max-w-screen-2xl mx-auto relative py-20 z-20">
        <h1 className="text-3xl md:text-6xl md:w-[60%] w-full mx-auto text-center font-bold">
          Professional Business Process Outsourcing Services for Different Niches
        </h1>
        <p className="text-base md:w-[45%] w-[95%] pt-4 mx-auto text-center">
          Professionals at Dexnive provide outstanding Business Process Outsourcing services. The BPO service let you hand over the basic, daily repetitive tasks like technical support and assistance to us while reducing your over all cost and saving time of your business.
        </p>
        <div className="md:w-[50%] w-full pt-4 mx-auto text-center">
          <HeroButton title="Explore Our BPO Services" />
        </div>
      </div>
      <div className="flex relative justify-center items-center -mt-22" >
        <div className="absolute inset-0 z-0">
          <FloatingLines
            enabledWaves={["middle", "top"]}
            topWavePosition={{ x: 0, y: 0, rotate: 0 }}
            lineCount={5}
            lineDistance={5}
            bendRadius={5}
            bendStrength={-0.5}
            interactive
            parallax={false}
            mixBlendMode="normal"
          />
        </div>
        <motion.div
          className="absolute -top-8 left-32 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
        >
          <Image
            src={"/images/bpo/headphone.webp"}
            className="object-center md:block hidden"
            alt="hero"
            width={400}
            height={400}
          />
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={"/images/bpo/hero.webp"}
            className="  object-center z-[9999]  relative"
            alt="hero"
            width={1200}
            height={1200}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
