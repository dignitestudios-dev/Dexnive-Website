import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchJobById } from "@/lib/odoo";
import ApplyForm from "./_components/apply-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const job = await fetchJobById(id);
    if (!job) return { title: "Apply | Dexnive" };
    return { title: `Apply for ${job.name} | Dexnive` };
  } catch {
    return { title: "Apply | Dexnive" };
  }
}

export default async function ApplyPage({ params }: PageProps) {
  const { id } = await params;
  const job = await fetchJobById(id);

  if (!job) notFound();

  return (
    <div>
      {/* Background — same pattern as about-us and careers pages */}
      <Image
        src="/images/blue-hue.png"
        alt=""
        fill
        className="absolute inset-0 z-0 object-cover pointer-events-none"
      />

      {/* Form + sidebar (hero is inside ApplyForm so it hides on success) */}
      <div className="relative z-10">
        <ApplyForm job={job} />
      </div>
    </div>
  );
}
