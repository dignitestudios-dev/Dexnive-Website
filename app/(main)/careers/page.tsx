// app/careers/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import { fetchJobs } from '@/lib/odoo';
import type { OdooJob } from '@/lib/odoo.types';
import SubHeader from '@/components/ui/sub-header';
import JobsList from './_components/jobs-list';

export const metadata: Metadata = {
  title: 'Careers | Dexnive',
  description: 'Join the Dexnive team. Explore our open positions.',
};

const LIMIT = 10;

export default async function CareersPage() {
  let initialJobs: OdooJob[] = [];
  let initialHasMore = false;
  let error: string | null = null;

  try {
    const jobs = await fetchJobs(0, LIMIT);
    initialJobs = jobs;
    initialHasMore = jobs.length === LIMIT;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load jobs';
  }

  return (
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

        {!error && initialJobs.length === 0 && (
          <div className="text-center py-24">
            <p className="text-xl font-semibold text-white mb-2">No open positions right now</p>
            <p className="text-gray-500 text-sm">Check back soon — we&apos;re always growing.</p>
          </div>
        )}

        {!error && initialJobs.length > 0 && (
          <JobsList initialJobs={initialJobs} initialHasMore={initialHasMore} />
        )}
      </div>
    </div>
  );
}
