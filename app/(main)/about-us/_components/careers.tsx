"use client";
import SubHeader from "@/components/ui/sub-header";
import Image from "next/image";
import Link from "next/link";

const Careers = () => {
  return (
    <div className="relative">
      <Image
        src="/images/home/bg.png"
        alt="dexnive-apart"
        width={1500}
        height={1500}
        className="absolute -top-52 left-0 w-full  object-cover"
      />
      <div className="flex md:flex-row flex-col items-center relative z-20 justify-between w-[80%] mx-auto">
        <div className="md:w-[50%] w-full flex gap-4 flex-col items-start">
          <div>
            <SubHeader title="Careers" />
          </div>
          <h1 className="text-3xl md:text-6xl font-bold">Grow With Dexnive</h1>
          <p className="text-sm lg:text-lg">
            In Dexnive, great work starts with curious, motivated people. Our
            culture is built on collaboration, learning and shared ownership.
            Where the ideas are welcomed and the growth is encouraged. We look
            for the individuals who enjoy solving real problems, working with
            the smart teams and pushing their skills forward. Dexnive is the
            place for you if you really want to produce meaningful products and
            doing well in the fast paced environment.
          </p>
          <div className="flex items-center justify-center">
            <Link
              href={"/careers"}
              className="px-8 py-2 rounded-full border border-[#7C1FFF] text-white hover:bg-[#7C1FFF] transition"
            >
              See Our Open Positions
            </Link>
          </div>
        </div>
        <Image
          src={"/images/about-us/env.png"}
          alt="envelop"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default Careers;
