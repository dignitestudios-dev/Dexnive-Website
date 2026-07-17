"use client";

import SubHeader from "@/components/ui/sub-header";
import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

const leftFaqs: FAQ[] = [
  {
    question: "What exactly is involved in Business Process Outsourcing service?",
    answer:
      "Business Process Outsourcing is basically the practice of outsourcing day to day basic or specific tasks to an external service provider. Businesses usually prefer to outsource the back office tasks.",
  },
  {
    question: "What services I may get through Business Process Outsourcing?",
    answer:
      "Business Process Outsourcing service that we provide would offer customer facing and back office operations. Commonly outsourced services are: Customer support, technical support, inbound, outbound call center services, live chat, email support, sales support, lead qualification, data entry, order processing.",
  },
  {
    question: "What advantages does a business get by Business Process Outsourcing?",
    answer:
      "Business Process Outsourcing can work for different businesses with multiple niches through reducing the usual operational costs, improving productivity, accessing experienced professionals without expanding internal teams for the businesses.",
  },
];

const rightFaqs: FAQ[] = [
  {
    question: "What kind of businesses would be eligible to utilize Business Process Outsourcing services?",
    answer:
      "Business Process Outsourcing is suitable for startups, small businesses, large enterprises across industries. Businesses often benefit from outsourcing if they’re growing customer inquiries, increasing administrative workloads, limiting internal resources.",
  },
  {
    question: "Can Business Process Outsourcing services scale with the business growth?",
    answer:
      "Yes. Business Process Outsourcing services are designed to grow with the business. Teams can be expanded or adjusted. This flexibility helps businesses respond to growth, seasonal demand, new opportunities. All without disrupting existing operations.",
  },
];

function FaqItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-medium text-white">{faq.question}</span>
        <span
          className={`text-xl text-white transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {open && (
        <div className="px-5 pb-4 text-sm text-white/70">{faq.answer}</div>
      )}
    </div>
  );
}

export default function FaqSection() {
  return (
    <section className="relative overflow-hidden  py-20">
      <div className="relative mx-auto max-w-screen-2xl text-center md:w-[60%] px-4">
        <SubHeader title="Frequently Asked Questions" />
        <h1 className="text-center text-3xl md:text-6xl leading-[1.1] font-bold text-white">
          Queries About Business Process Outsourcing (BPO)
        </h1>
      </div>

      <div className="mt-16 grid max-w-screen-2xl mx-auto w-[80%] gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {leftFaqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>

        <div className="space-y-4">
          {rightFaqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
