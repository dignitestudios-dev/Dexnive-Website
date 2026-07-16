import SubHeader from "@/components/ui/sub-header";
import Image from "next/image";

import Link from "next/link";

const industries = [
  {
    title: "Healthcare",
    description: "Business Process Outsourcing works for healthcare providers by managing patient support and other basic administrative tasks more efficiently. Outsourcing these operations reduces staff workload.",
    icon: "/images/bpo/icons/1.webp",
  },
  {
    title: "Ecommerce",
    description: "Business Process Outsourcing for ecommerce businesses is managing order processing, returns, refunds, product inquiries. Reliable outsourcing would offer better response time.",
    icon: "/images/home/industries/i2.png",
  },
  {
    title: "SaaS",
    description: "Business Process Outsourcing works for SaaS companies by managing customer support and subscription related inquiries. Outsourcing these services reduces support backlogs.",
    icon: "/images/bpo/icons/2.webp",
  },
  {
    title: "Retail",
    description: "Business Process Outsourcing for retail businesses means managing order tracking, product information, returns, after sales support. It also improves over all customer service.",
    icon: "/images/bpo/icons/3.webp",
  },
  {
    title: "Finance",
    description: "Business Process Outsourcing works for financial organizations by managing customer support, account inquiries, documentation, administrative processes with accuracy.",
    icon: "/images/bpo/icons/4.webp",
  },
  {
    title: "Real Estate",
    description: "Business Process Outsourcing works for real estate businesses to manage property inquiries, appointment scheduling, lead qualification, documentation, customer communication.",
    icon: "/images/bpo/icons/5.webp",
  },
  {
    title: "Logistics",
    description: "Business Process Outsourcing for logistics companies is managing shipment inquiries, order tracking, documentation, customer communication, operational support.",
    icon: "/images/bpo/icons/6.webp",
  },
  {
    title: "Travel",
    description: "Business Process Outsourcing works well for travel businesses. It can manage reservation changes, travel assistance and post booking services.",
    icon: "/images/bpo/icons/7.webp",
  },
];

const Industries = () => {
  return (
    <div className="py-20">
      <div className="max-w-screen-2xl mx-auto md:w-[60%] text-center px-4">
        <h1 className="text-3xl md:text-6xl font-bold leading-[1.1]">Which Industries Can Use Business Process Outsourcing Services?</h1>
      </div>
      <p className="text-lg md:w-[60%] w-[95%] mx-auto max-w-screen-2xl text-center font-medium pt-4">
        Business Process Outsourcing is for different industries. Every industry has different customer expectations. So outsourcing solutions should be tailored to specific business needs.
      </p>
      <div className="max-w-screen-2xl bg-[#0A0118] relative overflow-hidden rounded-[30px] mx-auto md:w-[80%] my-12 shadow-[0_0_30px_rgba(132,14,205,0.25)] border border-white/5">
        <Image
          src="/images/home/industries/shadow.png"
          alt="industries-bg"
          width={1500}
          height={1500}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative w-full z-30 grid grid-cols-1 md:grid-cols-6 text-center">
          {industries.map((industry, index) => {
            const isRow3 = index >= 6;
            const colSpan = isRow3 ? "col-span-1 md:col-span-3" : "col-span-1 md:col-span-2";
            const hasBottomBorder = index < 6;
            const hasRightBorder = isRow3 ? index === 6 : (index % 3 !== 2);

            return (
              <div
                key={index}
                className={`flex flex-col items-center justify-start p-10 group ${colSpan} ${
                  hasBottomBorder ? "border-b border-white/10" : ""
                } ${hasRightBorder ? "md:border-r border-white/10" : ""}`}
              >
                <Image
                  src={industry.icon}
                  alt={industry.title}
                  width={60}
                  height={60}
                  className="w-14 h-14 mb-6 group-hover:scale-110 transition-transform object-contain"
                />
                <h3 className="text-2xl mb-4 font-bold text-white">{industry.title}</h3>
                <p className="text-[15px] font-medium text-white/80 leading-relaxed max-w-sm mx-auto">
                  {industry.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center mt-8 relative z-30">
        <Link href={"/contact-us"} className="px-8 py-3 rounded-full bg-gradient-to-r from-[#7C1FFF] to-[#53029B] text-white font-medium hover:scale-105 transition-transform shadow-[0_0_20px_#7c1fff80]">
          Discuss Your Niche
        </Link>
      </div>
    </div>
  );
};

export default Industries;
