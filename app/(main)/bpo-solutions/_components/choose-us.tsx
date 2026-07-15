"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import SubHeader from "@/components/ui/sub-header";
// import SubHeader from "./ui/sub-header";

type Props = {
    heading :string;
    subHeading:string;
    p:string;
    choose:{
        title:string;
        description:string;
    }[]

}

const cardLayout = [
  {
    col: "col-span-4 row-span-4",
    height: "h-[330px]",
    bg: "bg-[#840ECD]",
    icon: "/images/home/dex-apart/i1.png",
    deco: "/images/home/dex-apart/mini.png",
    decoClass: "absolute -bottom-5 right-0 rounded-br-2xl"
  },
  {
    col: "col-span-4 row-span-3",
    height: "h-[230px]",
    bg: "bg-[#53029B]",
    icon: "/images/home/dex-apart/i2.png"
  },
  {
    col: "col-span-4 row-span-4",
    height: "h-[330px]",
    bg: "bg-[#222222]",
    icon: "/images/home/dex-apart/i3.png",
    deco: "/images/home/dex-apart/mini2.png",
    decoClass: "absolute -bottom-3   right-0 rounded-br-2xl"
  },
  {
    col: "col-span-4 row-span-6",
    height: "h-[480px]",
    bg: "bg-gradient-to-b from-[#7C1FFF] to-[#4B0082]",
    icon: "/images/home/dex-apart/i5.png",
    deco: "/images/home/dex-apart/mini3.png",
    decoClass: "absolute bottom-0 right-0  rounded-br-2xl"
  },
  {
    col: "col-span-4 row-span-8",
    height: "h-[440px]",
    bg: "bg-[#222222]",
    icon: "/images/home/dex-apart/i4.png",
    deco: "/images/home/dex-apart/mini4.png",
    decoClass:
      "absolute -bottom-5 left-1/2 p-4 -translate-x-1/2 w-full rounded-b-2xl"
  },
  {
    col: "col-span-4 row-span-6",
    height: "h-[480px]",
    bg: "bg-[#840ECD]",
    icon: "/images/home/dex-apart/i6.png",
    deco: "/images/home/dex-apart/mini5.png",
    decoClass: "absolute bottom-0 right-0 mr-5 mb-5 rounded-br-2xl"
  }
];


 const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

const ChooseUs = ({heading , subHeading , p , choose}: Props) => {
  return (
        <div className="py-10 relative">
      <Image
        src="/images/home/bg.png"
        alt="dexnive-apart"
        width={1500}
        height={1500}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="max-w-screen-2xl relative z-20 mx-auto md:w-[40%] text-center">
        <SubHeader title={subHeading || ""} />
        <h1 className="text-3xl md:text-6xl leading-[1.1] font-bold text-center">
         {heading}
        </h1>
      </div>
        <p className="text-lg  relative z-20  md:w-[60%] mx-auto max-w-screen-2xl text-center font-medium pt-4">
         {p}
        </p>
      <div className="min-h-screen flex md:w-[60%] mx-auto items-center justify-center px-6 py-20">
      <div className="grid md:grid-cols-12 md:grid-rows-10 gap-4 max-w-7xl w-full relative z-30">
  {choose.slice(0, cardLayout.length).map((item, index) => {
    const layout = cardLayout[index];

    return (
      <motion.div
        key={item.title}
        className={`
          ${layout.col}
          ${layout.height}
          ${layout.bg}
          border-2 border-[#99999940]
          rounded-2xl p-5 group text-white overflow-hidden relative
        `}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src={layout.icon}
          alt={item.title}
          width={30}
          height={30}
          className="mb-4"
        />

        <h3 className="font-semibold mb-2">{item.title}</h3>
        <p className="text-sm text-white/80">{item.description}</p>

        {layout.deco && (
          <Image
            src={layout.deco}
            alt=""
            width={index > 2 ? 230 : 180}
            height={180}
            className={layout.decoClass + " group-hover:scale-110 transition"}
          />
        )}
      </motion.div>
    );
  })}
</div>

      </div>
      <div className="flex justify-center relative z-30 md:-mt-40 mb-20">
        <Link href={"contact-us"} className="px-8 py-2 rounded-full border border-[#7C1FFF] text-white hover:bg-[#7C1FFF] transition">
          Explore the Possibilities
        </Link>
      </div>
    </div>
  )
}

export default ChooseUs