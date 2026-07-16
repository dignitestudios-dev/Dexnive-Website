import Hero from "./hero";
import Thinking from "./thinking";
import Services from "@/components/services";
import Development from "@/components/development";
import BpoCTA from "./cta";
// import ChooseUs from "@/components/choose-us";
import FaqSection from "./faq";
import Link from "next/link";
import Industries from "./industries";
import ChooseUs from "./choose-us";
import CallToAction from "@/components/cta";

const bpoServicesData = [
  {
    title: "Customer Support Services",
    description: "Customers are assisted through customer support services before, during and after a purchase. Support is provided through phone, email, live chat and other communication channels.",
    image: "/images/bpo/i1.webp",
  },
  {
    title: "Technical Support",
    description: "Customers resolve problems with products, software or services through technical support. It includes troubleshooting, answering technical questions, and identifying issues. Reliable technical support reduces downtime.",
    image: "/images/bpo/i2.webp",
  },
  {
    title: "Outbound Call Center Service",
    description: "Outbound call center service is the process of contacting existing and potential customers. It includes lead generation, appointment scheduling, followup calls, customer surveys, promotional campaigns.",
    image: "/images/bpo/i3.webp",
  },
  {
    title: "Inbound Call Center Service",
    description: "Inbound call center services involve handling incoming customer calls. The calls are generally for inquiries and general assistance. It can be for processing orders and directing callers to the right department.",
    image: "/images/bpo/i4.webp",
  },
  {
    title: "Live Chat Support",
    description: "Live chat support means providing live assistance through a website or mobile application to customers. This service is for offering immediate support without requiring a phone call.",
    image: "/images/bpo/i5.webp",
  },
  {
    title: "Email Support",
    description: "Email support is managing customer communication through email in a clear way. It includes responding to inquiries and handling service tickets. Timely email support mainly improves response times.",
    image: "/images/bpo/i6.webp",
  },
  {
    title: "Telephone Answering Services",
    description: "Telephone answering services are for answering incoming business calls professionally at all times. They include directing calls and providing basic information to callers.",
    image: "/images/bpo/i7.webp",
  },
  {
    title: "Sales Support",
    description: "Sales support and lead qualification services for businesses identify potential customers most likely to make a purchase. The process is about engaging prospects and scheduling appointments.",
    image: "/images/bpo/i8.webp",
  },
  {
    title: "Back Office Support",
    description: "Back office support manages the administrative tasks that run the business operations smoothly. Services include data entry, CRM management, order processing, documentation, reporting, record management.",
    image: "/images/bpo/i9.webp",
  },
];

const bpoProcessSteps = [
  {
    title: "Business Discovery",
    subtitle: "Understanding Needs",
    description: "Business discovery is the first step of the Business Process Outsourcing process. It creates an understanding of business goals, challenges and outsourcing requirements.",
    imagePath: "/images/bpo/1.webp",
  },
  {
    title: "Team Selection & Onboarding",
    subtitle: "Building the Team",
    description: "The right people are selected based on your business needs, industry and project requirements. The onboarding process introduces your workflows and expectations once the team is formed.",
    imagePath: "/images/bpo/2.webp",
  },
  {
    title: "Process Training",
    subtitle: "Preparing the Team",
    description: "Process training is for preparing the outsourced team. So it performs the tasks accurately and consistently. It covers your products, services, internal workflows, communication standards, tools.",
    imagePath: "/images/bpo/3.webp",
  },
  {
    title: "Service Launch",
    subtitle: "Going Live",
    description: "Service launch is the stage where the outsourced team starts handling daily operations or offering the services. Tasks are performed according to the agreed workflows and goals.",
    imagePath: "/images/bpo/4.webp",
  },
  {
    title: "Ongoing Optimization",
    subtitle: "Continuous Improvement",
    description: "Business Process Outsourcing is an ongoing process that improves with time. Performance is continuously monitored for service quality. Feedback opens the gate for new opportunities.",
    imagePath: "/images/bpo/5.webp",
  },
];

const chooseUsData = [
  {
    title: "Experienced BPO Professionals",
    description: "Experienced BPO professionals bring the industry knowledge needed to manage customer facing. They follow established workflows across different functions.",
  },
  {
    title: "24/7 Customer Support Availability",
    description: "24/7 customer support means customers can receive assistance whenever they need it, regardless of time zones.",
  },
  {
    title: "Flexible Team Scaling",
    description: "Flexible team scaling allows businesses to change the team size based on changing workloads. It provides the resources needed without the cost of hiring.",
  },
  {
    title: "Omnichannel Communication Support",
    description: "Omnichannel communication support means customers can connect through their preferred channels. Channels could be phone, email, live chat, social media.",
  },
  {
    title: "Strict Quality Assurance Processes",
    description: "Quality assurance processes maintain consistent service standards. Regular performance reviews, process evaluation identify areas for improvement.",
  },
  {
    title: "Secure Data Handling",
    description: "Secure data handling protects sensitive information. That too throughout the entire outsourcing process. Following security protocols protects confidential data.",
  },
];

const BpoSolutions = () => {
  return (
    <div>
      <Hero />
      <Thinking />
      <div className="relative pb-10">
        <Services
          services={bpoServicesData}
          heading="What Does Business Process Outsourcing Include?"
          p="Business Process Outsourcing has a wide range of services. Those services are provided in order to offer support for your basic daily operations. Businesses can outsource customer services according to their needs."
        />
        <div className="flex justify-center -mt-10 relative z-30">
          <Link href={"/contact-us"} className="px-8 py-3 rounded-full bg-gradient-to-r from-[#7C1FFF] to-[#53029B] text-white font-medium hover:scale-105 transition-transform shadow-[0_0_20px_#7c1fff80]">
            Explore our BPO Services
          </Link>
        </div>
      </div>
      <Development
        process={bpoProcessSteps}
        header="How Our BPO Process Works?"
        p="Business Process Outsourcing is most effective when every stage is planned with care so every successful Business Process Outsourcing partnership begins with a structured approach. A clear process makes sure that outsourced teams work as a natural extension of their operations."
      />
      {/* <BpoCTA /> */}
      <ChooseUs
        heading="Features to Look for in a Business Process Outsourcing Partner"
        subHeading="Our Excellence"
        p="Choosing a business process outsourcing partner isn’t just outsourcing daily tasks to randomly. The right provider adapts to your workflows as your needs change. The Business Process Outsourcing services are built on experienced professionals who help businesses operate more efficiently."
        choose={chooseUsData}
      />
      <Industries />
      <FaqSection />
      <CallToAction
        imgPath="/images/web-app/call.png"
        header=" Time to Simplify Your Business with Business Process Outsourcing!"
        p="    The right Business Process Outsourcing partner can work on your business’s operational costs while improving customer experiences. So it’s time to contact us if you’re ready to prioritize what matters and to build a solution that fits your business goals."
        btnText="Talk to the experts"
        service="BPO Services"
      />
    </div>
  );
};

export default BpoSolutions;
