// app/careers/[id]/not-found.tsx

import Link from 'next/link';
import SubHeader from '@/components/ui/sub-header';

export default function JobNotFound() {
  return (
    <div
      className="min-h-[70vh] flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse 80% 45% at 50% 0%, #3b0068 0%, #0d0d14 55%)' }}
    >
      <div className="text-center px-6">
        <SubHeader title="404" />
        <h1 className="text-3xl md:text-5xl font-bold text-white mt-5 mb-3">
          Job not found
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          This position may have been filled or removed.
        </p>
        <Link
          href="/careers"
          className="inline-block transition-all ease-linear hover:shadow-[0px_0px_30px_0px_rgba(132,14,205,1)] hover:bg-[#840ECD] shadow-[0px_0px_30px_0px_rgba(132,14,205,0.25)] text-white border-2 border-[#840ECD] px-8 py-3 rounded-full text-sm font-medium"
        >
          View all open roles
        </Link>
      </div>
    </div>
  );
}
