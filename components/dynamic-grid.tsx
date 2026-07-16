"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const cardVariant = {
  hidden: (i:number) => ({
    opacity: 0,
    y: 50,
    transition: { delay: i * 0.1 }
  }),
  visible: (i:number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 }
  })
};

interface Props {
  services: {
    title: string;
    description: string;
    image: string;
  }[];
}

export default function DynamicGrid({services}:Props) {
  const totalCards = services?.length;
  const remainder = totalCards % 3; // For lg screens (3 columns)

  return (
    <div className="">
      {/* Desktop / Default Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-6 py-12 gap-2 relative z-20 max-w-screen-2xl mx-auto w-[80%]">
        {services.map((service, index) => {
          const totalCards = services.length;
          const remainder = totalCards % 3;
          const isInLastRow = index >= totalCards - remainder && remainder !== 0;
          
          return (
            <motion.div
              key={service.title}
              custom={index % 3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariant}
              className={`bg-[#0A0118] rounded-xl overflow-hidden group relative pb-8 border-[#840ECDBF] border-4 shadow-md ${
                !isInLastRow ? 'lg:col-span-2' : ''
              } ${
                isInLastRow && remainder === 1 ? 'lg:col-span-6' : ''
              } ${
                isInLastRow && remainder === 2 ? 'lg:col-span-3' : ''
              }`}
            >
              <Image
                src={service.image}
                alt={service.title}
                width={500}
                height={500}
                className="group-hover:scale-110 transition-all duration-300 ease-linear w-full"
              />
              <div className="px-8">
                <h2 className="text-lg font-bold relative z-30 text-white">
                  {service.title}
                </h2>
                <p className="text-sm mt-2 text-[#9B96B0] relative z-30">
                  {service.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Mobile Shadcn Carousel */}
      <div className="block md:hidden max-w-screen-2xl mx-auto w-full px-4 py-12 relative z-20">
        <Carousel opts={{ align: "center", loop: false }} className="w-full">
          <CarouselContent>
            {services.map((service) => (
              <CarouselItem key={service.title} className="w-full">
                <div className="bg-[#0A0118] rounded-xl overflow-hidden group relative pb-8 border-[#840ECDBF] border-4 shadow-md h-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={500}
                    height={500}
                    className="w-full"
                  />
                  <div className="px-8">
                    <h2 className="text-lg font-bold relative z-30 text-white">
                      {service.title}
                    </h2>
                    <p className="text-sm mt-2 text-[#9B96B0] relative z-30">
                      {service.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}