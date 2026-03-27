// app/careers/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchJobs } from '@/lib/odoo';
import type { OdooJob } from '@/lib/odoo.types';
import SubHeader from '@/components/ui/sub-header';

export const metadata: Metadata = {
  title: 'Careers | Dexnive',
  description: 'Join the Dexnive team. Explore our open positions.',
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function JobCard({ job }: { job: OdooJob }) {
  const dept     = Array.isArray(job.department_id) ? job.department_id[1] : null;
  const location = Array.isArray(job.address_id)    ? job.address_id[1]    : null;
  const preview  = job.x_studio_html_job_description
    ? stripHtml(job.x_studio_html_job_description)
    : job.description
      ? stripHtml(job.description)
      : '';

  return (
    <Link
      href={`/careers/${job.id}`}
      className="group block border-b border-white/10 py-7 hover:border-[#7C1FFF]/50 transition-colors duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
            {dept && <span className="text-xs text-[#C4A0FF]">{dept}</span>}
            {dept && location && <span className="text-xs text-white/20">·</span>}
            {location && <span className="text-xs text-gray-500">{location}</span>}
            {job.no_of_recruitment > 0 && (
              <>
                <span className="text-xs text-white/20">·</span>
                <span className="text-xs text-gray-500">
                  {job.no_of_recruitment} {job.no_of_recruitment === 1 ? 'opening' : 'openings'}
                </span>
              </>
            )}
          </div>

          <h2 className="text-lg font-semibold text-white group-hover:text-[#C4A0FF] transition-colors duration-200 mb-1">
            {job.name}
          </h2>

          {preview && (
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
              {preview}
            </p>
          )}
        </div>

        <span className="text-[#7C1FFF] group-hover:text-[#C4A0FF] text-sm mt-1 shrink-0 transition-colors">→</span>
      </div>
    </Link>
  );
}

export default async function CareersPage() {
  let jobs: OdooJob[] = [];
  let error: string | null = null;

  try {
    jobs = await fetchJobs();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load jobs';
  }

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
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 pt-20 pb-16 text-center">
        <SubHeader title="Careers" />
        <h1 className="text-4xl md:text-6xl font-bold mt-5 mb-4">
          Grow With Dexnive
        </h1>
        <p className="text-gray-400 md:w-[48%] w-full mx-auto text-base leading-relaxed">
          We&apos;re looking for curious, driven people who enjoy solving real
          problems alongside a talented team.
        </p>
      </div>

      {/* Jobs */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 pb-24">
        {error && (
          <div className="border border-red-500/20 bg-red-900/10 text-red-400 rounded-xl p-5 mb-8 text-sm">
            <span className="font-medium">Failed to load jobs — </span>{error}
          </div>
        )}

        {!error && jobs.length === 0 && (
          <div className="text-center py-24">
            <p className="text-xl font-semibold text-white mb-2">No open positions right now</p>
            <p className="text-gray-500 text-sm">Check back soon — we&apos;re always growing.</p>
          </div>
        )}

        {jobs.length > 0 && (
          <div className="border-t border-white/10">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
