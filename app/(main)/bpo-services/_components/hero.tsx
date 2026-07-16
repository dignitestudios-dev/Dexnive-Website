"use client";

import FloatingLines from "@/components/FloatingLines";
import HeroButton from "@/components/ui/hero-button";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="md:-mb-44 -mb-40">
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
        <p className="text-base md:w-[40%] w-[95%] pt-4 mx-auto text-center">
          Through Business Process Outsourcing services, businesses can hand over everyday tasks like customer support and technical assistance to experienced teams. It reduces overall costs and saves your business time to focus on growth.
        </p>
        <div className="md:w-[50%] w-full pt-4 mx-auto text-center">
          <HeroButton title="Explore Our BPO Services" />
        </div>
      </div>
      <div className="flex relative justify-center items-center -mt-22" >
        <motion.div
          className="absolute -top-8 left-36 -z-10"
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
