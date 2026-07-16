"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { TextAnimate } from "@/components/ui/text-animate";
import Link from "next/link";

const text = "DEXNIVE";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08, 
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 120,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

const Footer = () => {
  return (
    <footer className="relative z-10 overflow-hidden pt-32 pb-[20%]">
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(180deg,transparent_0%,#000000_150px)] -z-10" />
      <Image
        src={"/images/elip.png"}
        alt="ellipse"
        width={500}
        height={500}
        className="absolute bottom-0 z-10 left-0"
      />

      <div className="mx-auto w-[80%] relative z-30 max-w-screen-2xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="">
            <p className="text-2xl font-extralight text-nowrap">
              Something you’ve been <br />{" "}
              <span className="font-bold">thinking about building?</span>
            </p>

            <button className="mt-6 capitalize tracking-widest rounded-full text-sm  bg-linear-to-b from-[#840ECD] to-[#53029B]">
              <Link href="/contact-us" className="w-full px-12 p-4 block">Discuss your idea</Link>
            </button>

            <p className="mt-8 text-xs ">
              Copyright © Dexnive. All Rights Reserved.
            </p>
          </div>

          <div className="col-span-0"></div>
          <div className="text-sm ">
            <p className="mb-4 text-xs uppercase tracking-wider ">Phones</p>
            <p>+92 21 334-886-28</p>

            <p className="mt-4">info@dexnive.com</p>

            <p className="mt-6 text-xs uppercase tracking-wider ">Address</p>
            <p className="mt-2">
              {/* Head Office Suite A-104,
              <br /> */}
             Suite # 104, Emarah Suites, Sharah-e-Faisal
 
              <br />
              Karachi
            </p>

            {/* <p className="mt-4 text-xs  cursor-pointer">→ Get Directions</p> */}
          </div>

          <div className="text-sm ">
            <p className="mb-4 text-xs uppercase tracking-wider ">
              Quick Links
            </p>
            <ul className="space-y-2">
              <li className="hover:text-white transition cursor-pointer">
                <Link href="/mobile-app-development">
                  Mobile App Development
                </Link>
              </li>
              <li className="hover:text-white transition cursor-pointer">
                <Link href="/web-app-development">Web App Development</Link>
              </li>
              <li className="hover:text-white transition cursor-pointer">
                <Link href="/custom-software-development">
                  Custom Software Development
                </Link>
              </li>
              <li className="hover:text-white transition cursor-pointer">
                <Link href="/bpo-solutions">
                  BPO Services
                </Link>
              </li>
              <li className="hover:text-white transition cursor-pointer">
                <Link href="/about-us">About Us</Link>
              </li>
              <li className="hover:text-white transition cursor-pointer">
                <Link href="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <TextAnimate
        duration={1}
        by="character"
        style={{
          WebkitTextStrokeWidth: "20px",
          WebkitTextStrokeColor: "#0f0f0f",
          fontWeight: 1000,
        }}
        className="absolute uppercase tracking-wide text-[#65656526] -bottom-40 -left-10 font-black  text-[24vw] text-nowrap!"
      >
        Dexnive
      </TextAnimate>
    </footer>
  );
};

export default Footer;
