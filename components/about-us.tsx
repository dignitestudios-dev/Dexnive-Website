import React from "react";
import Image from "next/image";
import SubHeader from "./ui/sub-header";

interface AboutUsProps {
  imagePath: string;
  badge?: string;
  title?: React.ReactNode;
  paragraphs?: string[];
}

const AboutUs = ({ imagePath, badge, title, paragraphs }: AboutUsProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 max-w-screen-2xl mx-auto px-5 pt-10 relative z-20">
         <Image
              src="/images/home/bg.png"
              alt=""
              width={1500}
              height={1500}
              className="absolute top-0 left-0 w-screen h-full -z-10"
            />
      {/* Left side: Image */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-start relative min-h-[300px] md:min-h-[550px]">
        <Image
          src={imagePath}
          alt="About Us"
          fill
          className="object-contain rounded-2xl"
        />
      </div>

      {/* Right side: Content */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className=" relative z-20 flex flex-col items-start justify-start text-start">
          <div className='px-6 py-2 border w-fit  text-sm border-[#99999940]  rounded-full shadow-[inset_0px_-8.22px_12.91px_0px_#A48FFF1F]' >
        {badge}
    </div>
        <h1 className="text-3xl md:text-6xl leading-[1.1] pr-5 font-bold text-start">
         {title}
        </h1>
      </div>

        {paragraphs && paragraphs.length > 0 && (
          <div className="flex flex-col gap-[28px] mt-[15px]">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[#D0C8C8] text-[18px] pr-8 font-medium leading-[28px]"
              >
                {p}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;