import SubHeader from "@/components/ui/sub-header";
import Image from "next/image";
import React from "react";

const Thinking = () => {
  return (
    <div className="py-10 relative mt-40">
      <Image
        src="/images/home/bg.png"
        alt="dexnive-apart"
        width={1500}
        height={1500}
        className="absolute -top-40 left-0 w-full  object-cover -z-10"
      />
      <div className="max-w-screen-2xl relative z-20 mx-auto md:w-[40%] text-center">
        <SubHeader title={"Approach"} />
        <h1 className="text-3xl md:text-6xl leading-[1.1] font-bold text-center">
          The Right Business Process Outsourcing Partner
        </h1>
      </div>
      <div className="text-lg md:text-3xl text-[#D0C8C8] leading-[1.4] relative z-20 w-[95%]  md:w-[90%] mx-auto max-w-screen-2xl text-center font-medium pt-4 flex flex-col gap-6 mt-6">
        <p>
          <span className="bg-[#53029B] pl-2 mr-2">Business{` `}</span>
          Process Outsourcing (BPO) is the practice of outsourcing everyday business functions to an experienced service provider. Companies often outsource the usual back office tasks to free up internal teams in order to focus on growth.
        </p>
        <p>
          The right Business Process Outsourcing partner does more than complete routine tasks. Partners like Dignite Studios become an extension of your team. The right partner would adapt to changing business demands. Outsourcing lets your businesses grow without the complexity of hiring additional staff.
        </p>
        <p>
          Dignite Studios provides customized Business Process Outsourcing services that align with your industry requirements and customer expectations. The dedicated professionals and multilingual support at Dignite Studios can streamline business operations.
        </p>
      </div>
    </div>
  );
};

export default Thinking;
