"use client";

import { useState, useRef, FormEvent } from "react";
import Link from "next/link";
import SubHeader from "@/components/ui/sub-header";

interface Job {
  id: number;
  name: string;
  department_id: [number, string] | false;
  address_id: [number, string] | false;
  no_of_recruitment: number;
}

interface Props {
  job: Job;
}

interface FieldErrors {
  partner_name?: string;
  email_from?: string;
  partner_phone?: string;
  resume?: string;
  job_id?: string;
}

export default function ApplyForm({ job }: Props) {
  const [errors, setErrors]       = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const [fileName, setFileName]   = useState("");
  const fileRef                   = useRef<HTMLInputElement>(null);

  const dept     = Array.isArray(job.department_id) ? job.department_id[1] : null;
  const location = Array.isArray(job.address_id)    ? job.address_id[1]    : null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    form.set("job_id", String(job.id));

    try {
      const res = await fetch("/api/jobs/apply", { method: "POST", body: form });
      const data = await res.json();

      if (res.status === 422) {
        setErrors(data.errors ?? {});
      } else if (!res.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setSuccess(true);
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  // ── Success screen ─────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-32 px-6">
        <div className="w-16 h-16 rounded-full bg-[#840ECD]/20 border border-[#840ECD]/40 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#C4A0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Application Submitted!</h2>
        <p className="text-gray-400 text-sm max-w-sm mb-8">
          Thank you for applying for <span className="text-[#C4A0FF] font-medium">{job.name}</span>. We&apos;ll review your application and get back to you soon.
        </p>
        <Link
          href="/careers"
          className="inline-block transition-all ease-linear hover:shadow-[0px_0px_30px_0px_rgba(132,14,205,1)] hover:bg-[#840ECD] shadow-[0px_0px_30px_0px_rgba(132,14,205,0.25)] text-white border-2 border-[#840ECD] px-8 py-3 rounded-full text-sm font-medium"
        >
          ← Back to Careers
        </Link>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Back link — same style as "← All jobs" on the detail page */}
      <div className="max-w-screen-xl mx-auto px-6 pt-16">
        <Link
          href={`/careers/${job.id}`}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors duration-200"
        >
          ← View Job Description
        </Link>
      </div>

      {/* Hero header */}
      <div className="max-w-screen-xl mx-auto px-6 pt-8 pb-6 text-center">
        <div className="mb-4">
          <SubHeader title="Join Our Team" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mt-5">
          Apply Now
        </h1>
        <p className="text-gray-400 text-sm mt-4 max-w-md mx-auto">
          Complete the form below and we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      {/* Form (2/3) + Sidebar (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-screen-xl mx-auto px-6 py-16">
      <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold text-white mb-2">Your Details</h2>
        <p className="text-gray-500 text-sm mb-6">Fields marked with <span className="text-[#C4A0FF]">*</span> are required.</p>

        {serverError && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {serverError}
          </div>
        )}

        {/* Name */}
        <Field label="Full Name" required error={errors.partner_name}>
          <input
            name="partner_name"
            type="text"
            placeholder="Muhammad Ali"
            className={inputClass(!!errors.partner_name)}
          />
        </Field>

        {/* Email */}
        <Field label="Email Address" required error={errors.email_from}>
          <input
            name="email_from"
            type="email"
            placeholder="ali@example.com"
            className={inputClass(!!errors.email_from)}
          />
        </Field>

        {/* Phone */}
        <Field label="Phone Number" required error={errors.partner_phone}>
          <input
            name="partner_phone"
            type="tel"
            placeholder="+92 300 0000000"
            className={inputClass(!!errors.partner_phone)}
          />
        </Field>

        {/* LinkedIn */}
        <Field label="LinkedIn Profile URL" error={undefined} hint="Required if no resume is uploaded.">
          <input
            name="linkedin_profile"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            className={inputClass(false)}
          />
        </Field>

        {/* Resume */}
        <Field label="Resume / CV" error={errors.resume} hint="PDF, DOC or DOCX — max 5 MB. Required if no LinkedIn provided.">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full text-left rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-400 hover:border-[#840ECD]/60 hover:bg-white/8 transition-colors duration-200 focus:outline-none focus:border-[#840ECD]"
          >
            {fileName ? (
              <span className="text-white">{fileName}</span>
            ) : (
              <span>Click to upload file…</span>
            )}
          </button>
          <input
            ref={fileRef}
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </Field>

        {/* Short Introduction */}
        <Field label="Short Introduction" error={undefined} hint="Tell us a bit about yourself and why you're a great fit.">
          <textarea
            name="applicant_notes"
            rows={5}
            placeholder="I'm a passionate engineer with 3 years of experience…"
            className={inputClass(false) + " resize-none"}
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="inline-block transition-all ease-linear hover:shadow-[0px_0px_30px_0px_rgba(132,14,205,1)] hover:bg-[#840ECD] shadow-[0px_0px_30px_0px_rgba(132,14,205,0.25)] text-white border-2 border-[#840ECD] px-10 py-3 rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting…" : "Submit Application →"}
        </button>
      </form>

      <aside className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">You&apos;re applying for</p>
          <h3 className="text-lg font-semibold text-white mb-4 leading-snug">{job.name}</h3>

          <div className="space-y-3 text-sm">
            {dept && (
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Department</p>
                  <p className="text-[#C4A0FF]">{dept}</p>
                </div>
              </div>
            )}
            {location && (
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Location</p>
                  <p className="text-white">{location}</p>
                </div>
              </div>
            )}
            {job.no_of_recruitment > 0 && (
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Openings</p>
                  <p className="text-white">{job.no_of_recruitment}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
      </div>
    </>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600",
    "transition-colors duration-200 outline-none",
    hasError
      ? "border-red-500/60 focus:border-red-500"
      : "border-white/10 focus:border-[#840ECD]",
  ].join(" ");
}

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-[#C4A0FF] ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-600">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
