import { Metadata } from "next";
import BpoSolutions from "./_components/bpo-solutions";

export const metadata: Metadata = {
  title: "Leading Business Process Outsourcing (BPO) Services",
  description:
    "Streamline your operations with Business Process Outsourcing (BPO) services by Dignite Studios designed to reduce usual costs and improve experiences.",
};

const page = () => {
  return (
    <div>
      <BpoSolutions />
    </div>
  );
};

export default page;
