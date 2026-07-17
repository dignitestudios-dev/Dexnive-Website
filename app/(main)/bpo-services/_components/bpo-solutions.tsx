import Hero from "./hero";
import Thinking from "./thinking";
import Services from "@/components/services";
import Development from "@/components/development";
import BpoCTA from "./cta";
// import ChooseUs from "@/components/choose-us";
import FaqSection from "./faq";
import Link from "next/link";
// import Industries from "./industries";
import ChooseUs from "./choose-us";
import CallToAction from "@/components/cta";
import AboutUs from "@/components/about-us";
import Industries from "@/components/industries";

const bpoServicesData = [
  {
    title: "Customer Support Services",
    description: "Slow or inconsistent customer support can damage satisfaction. Dexnive provides responsive multichannel support through experienced agents, helping you resolve inquiries faster and build stronger customer loyalty.",
    image: "/images/bpo/i1.webp",
  },
  {
    title: "Technical Support",
    description: "Technical issues interrupt operations and frustrate customers. We delivers expert troubleshooting and technical assistance, reducing downtime while improving service reliability and customer confidence.",
    image: "/images/bpo/i2.webp",
  },
  {
    title: "Outbound Call Center Services",
    description: "Reaching qualified prospects consistently takes time and resources. Dexnive manages outbound campaigns, lead generation, follow-ups, and appointment scheduling to increase conversions and grow your pipeline.",
    image: "/images/bpo/i3.webp",
  },
  {
    title: "Inbound Call Center Services",
    description: "High call volumes can overwhelm internal teams and delay responses. Dexnive handles incoming calls efficiently, ensuring customers receive prompt assistance and every opportunity is captured.",
    image: "/images/bpo/i4.webp",
  },
  {
    title: "Live Chat Support",
    description: "Delayed responses often cause website visitors to leave. We provides real-time live chat support that answers questions instantly, increasing engagement, customer satisfaction, and conversion rates.",
    image: "/images/bpo/i5.webp",
  },
  {
    title: "Email Support",
    description: "Unmanaged customer emails lead to slow responses and poor experiences. We delivers timely, professional email support that improves communication, resolves issues faster, and strengthens customer trust.",
    image: "/images/bpo/i6.webp",
  },
  {
    title: "Telephone Answering Services",
    description: "Missed business calls can mean lost customers and revenue. We answers every call professionally, directs inquiries accurately, and ensures your business never misses an opportunity.",
    image: "/images/bpo/i7.webp",
  },
  {
    title: "Sales Support & Lead Qualification",
    description: "Sales teams often spend time on unqualified prospects. Dexnive identifies high-quality leads, nurtures potential customers, and schedules appointments to improve sales efficiency and conversion rates.",
    image: "/images/bpo/i8.webp",
  },
  {
    title: "Back Office Support",
    description: "Administrative tasks reduce productivity and consume valuable resources. We manages back-office operations efficiently, allowing your team to focus on strategic growth while improving operational efficiency.",
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
    description: "Experienced BPO professionals at Dexnive bring the industry knowledge needed to manage customer facing. They follow established workflows across different functions",
  },
  {
    title: "24/7 Customer Support Availability",
    description: "24/7 customer support provided by us means that customers can receive assistance whenever they need it, regardless of time zones.",
  },
  {
    title: "Flexible Team Scaling",
    description: "Flexible team scaling service allows businesses to change the team size based on changing workloads. We provide the resources needed without the cost of hiring.",
  },
  {
    title: "Omnichannel Communication Support",
    description: "Omnichannel communication support means customers can connect through their preferred channels through us. Channels could be phone, email, live chat, social media.",
  },
  {
    title: "Strict Quality Assurance Processes",
    description: "Quality assurance processes by Dexnive maintain consistent service standards. Regular performance reviews, process evaluation identify areas for improvement. ",
  },
  {
    title: "Secure Data Handling",
    description: "Secure data handling by our professionals protects sensitive information. That too throughout the entire outsourcing process. Following security protocols protects confidential data.",
  },
];

const BpoSolutions = () => {
  return (
    <div>
      <Hero />
      <AboutUs imagePath="/images/bpo/about.webp" badge="Our Story" title="The Right Business Process Outsourcing Partner " paragraphs={["Business Process Outsourcing (BPO) service is basically outsourcing everyday business functions to an experienced service provider like us. Companies often outsource the usual back office tasks to free up internal teams in order to focus on growth.", " The right Business Process Outsourcing partner does more than complete routine tasks. Partners like Dexnive become an extension of your team and would adapt to changing business demands and needs. Outsourcing through our Business Process Outsourcing service help your business prioritize the right task without having to deal with the complexity of hiring additional staff.", "The customized Business Process Outsourcing services provided by us aligns with industry requirements and customer expectations. The dedicated professionals and multilingual support at Dexnive can streamline business operations. "]} />
      {/* <Thinking /> */}
      <div className="relative pb-10">
        <Services
          services={bpoServicesData}
          heading="What Does Business Process Outsourcing Include? "
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
        btnText="Talk to Our BPO Experts"
        service="BPO Services"
      />
    </div>
  );
};

export default BpoSolutions;
