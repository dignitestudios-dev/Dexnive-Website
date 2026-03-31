"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import type { OdooJob } from "@/lib/odoo.types";

const LIMIT = 10;

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function JobCard({ job }: { job: OdooJob }) {
  const dept     = Array.isArray(job.department_id) ? job.department_id[1] : null;
  const location = Array.isArray(job.address_id)    ? job.address_id[1]    : null;
  const preview  = job.x_studio_html_job_description
    ? stripHtml(job.x_studio_html_job_description)
    : job.description
      ? stripHtml(job.description)
      : "";

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
                  {job.no_of_recruitment} {job.no_of_recruitment === 1 ? "opening" : "openings"}
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

        <span className="text-[#7C1FFF] group-hover:text-[#C4A0FF] text-sm mt-1 shrink-0 transition-colors">
          →
        </span>
      </div>
    </Link>
  );
}

function Spinner() {
  return (
    <div className="flex justify-center py-10">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-t-[#840ECD] animate-spin" />
      </div>
    </div>
  );
}

interface Props {
  initialJobs: OdooJob[];
  initialHasMore: boolean;
}

export default function JobsList({ initialJobs, initialHasMore }: Props) {
  const [jobs, setJobs]       = useState<OdooJob[]>(initialJobs);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const sentinelRef           = useRef<HTMLDivElement>(null);
  const offsetRef             = useRef(initialJobs.length);
  const loadingRef            = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/jobs?offset=${offsetRef.current}&limit=${LIMIT}`);
      if (!res.ok) throw new Error("Failed to load more jobs.");
      const data = await res.json();
      setJobs((prev) => [...prev, ...data.jobs]);
      setHasMore(data.hasMore);
      offsetRef.current += data.jobs.length;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [hasMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="border-t border-white/10">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}

      {/* Sentinel — triggers next page load when scrolled into view */}
      <div ref={sentinelRef} className="h-1" />

      {loading && <Spinner />}

      {error && (
        <p className="text-center text-red-400 text-sm py-6">{error}</p>
      )}

      {!hasMore && jobs.length > 0 && (
        <p className="text-center text-gray-600 text-xs py-8 tracking-widest uppercase">
          All positions loaded
        </p>
      )}
    </div>
  );
}
