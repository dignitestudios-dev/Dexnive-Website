// app/careers/[id]/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchJobById, fetchJobs } from '@/lib/odoo';
import SubHeader from '@/components/ui/sub-header';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const jobs = await fetchJobs();
    return jobs.map((job) => ({ id: String(job.id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const job = await fetchJobById(id);
    if (!job) return { title: 'Job Not Found | Dexnive' };

    const rawDesc = job.x_studio_html_job_description || job.description;
    const description = rawDesc
      ? (rawDesc as string).replace(/<[^>]*>/g, '').slice(0, 160)
      : `Apply for ${job.name} at Dexnive`;

    return {
      title: `${job.name} | Careers at Dexnive`,
      description,
    };
  } catch {
    return { title: 'Careers | Dexnive' };
  }
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params;
  const job = await fetchJobById(id);

  if (!job) notFound();

  const dept     = Array.isArray(job.department_id) ? job.department_id[1] : null;
  const location = Array.isArray(job.address_id)    ? job.address_id[1]    : null;
  const applyUrl = `/careers/${job.id}/apply`;

  return (
    // No `relative` — same as about-us hero, so the fill Image escapes to viewport and paints behind navbar
    <div>
      <Image
        src="/images/blue-hue.png"
        alt=""
        fill
        className="absolute inset-0 z-0 object-cover pointer-events-none"
      />

      {/* Hero */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 pt-16 pb-14">
        <Link
          href="/careers"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-white mb-10 transition-colors duration-200"
        >
          ← All jobs
        </Link>

        <div className="mb-3">
          <SubHeader title="Open Position" />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white mt-5 mb-6 md:w-[70%]">
          {job.name}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-8 text-sm text-gray-400">
          {dept && <span className="text-[#C4A0FF]">{dept}</span>}
          {dept && location && <span className="text-white/20">·</span>}
          {location && <span>{location}</span>}
          {job.no_of_recruitment > 0 && (
            <>
              <span className="text-white/20">·</span>
              <span>{job.no_of_recruitment} {job.no_of_recruitment === 1 ? 'opening' : 'openings'}</span>
            </>
          )}
        </div>

        <ApplyButton href={applyUrl} />
      </div>

      {/* Description */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 pb-24">
        <div className="border-t border-white/10 pt-10">
          {job.description ? (
            <div
              className="
                prose prose-invert max-w-none
                prose-headings:font-semibold prose-headings:text-white
                prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
                prose-p:text-gray-400 prose-p:leading-relaxed prose-p:text-sm
                prose-li:text-gray-400 prose-li:text-sm
                prose-a:text-[#C4A0FF] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
              "
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          ) : job.x_studio_html_job_description ? (
            <div
              className="
                prose prose-invert max-w-none
                prose-headings:font-semibold prose-headings:text-white
                prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
                prose-p:text-gray-400 prose-p:leading-relaxed prose-p:text-sm
                prose-li:text-gray-400 prose-li:text-sm
                prose-a:text-[#C4A0FF] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
              "
              dangerouslySetInnerHTML={{ __html: job.x_studio_html_job_description }}
            />
          ) : (
            <p className="text-gray-500 italic text-sm">No description provided.</p>
          )}

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-500 text-sm mb-5">Interested? We&apos;d love to hear from you.</p>
            <ApplyButton href={applyUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplyButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-block transition-all ease-linear hover:shadow-[0px_0px_30px_0px_rgba(132,14,205,1)] hover:bg-[#840ECD] shadow-[0px_0px_30px_0px_rgba(132,14,205,0.25)] text-white border-2 border-[#840ECD] px-8 py-3 rounded-full text-sm font-medium"
    >
      Apply for this role →
    </Link>
  );
}
