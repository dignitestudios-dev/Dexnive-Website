"use client";

import { useState, FormEvent, useEffect } from "react";
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
  linkedin_profile?: string;
  applicant_notes?: string;
  x_studio_current_pay?: string;
  x_studio_expected_pay?: string;
  x_studio_total_experience?: string;
  resume?: string;
  job_id?: string;
}

export default function ApplyForm({ job }: Props) {
  const [errors, setErrors]       = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const dept     = Array.isArray(job.department_id) ? job.department_id[1] : null;
  const location = Array.isArray(job.address_id)    ? job.address_id[1]    : null;

  useEffect(() => {
    if (!selectedFile) {
      setSelectedFileUrl("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setSelectedFileUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  function clearFieldError(field: keyof FieldErrors) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      if (Object.keys(next).length === 0) setFormError("");
      return next;
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setFormError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    form.set("job_id", String(job.id));
    const clientErrors = validateForm(form);

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setFormError("Please fix the highlighted fields before submitting.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/jobs/apply", { method: "POST", body: form });
      const data = await res.json();

      if (res.status === 422) {
        setErrors(data.errors ?? {});
        setFormError("Please fix the highlighted fields before submitting.");
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
      <form noValidate onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
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
            onChange={() => clearFieldError("partner_name")}
            className={inputClass(!!errors.partner_name)}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <Field label="Email Address" required error={errors.email_from}>
            <input
              name="email_from"
              type="email"
              placeholder="ali@example.com"
              onChange={() => clearFieldError("email_from")}
              className={inputClass(!!errors.email_from)}
            />
          </Field>

          {/* Phone */}
          <Field label="Phone Number" required error={errors.partner_phone}>
            <input
              name="partner_phone"
              type="tel"
              maxLength={16}
              onInput={(e) => {
                const target = e.currentTarget;
                target.value = target.value.replace(/[^\d+]/g, "").slice(0, 16);
                clearFieldError("partner_phone");
              }}
              placeholder="e.g. +1234567890"
              className={inputClass(!!errors.partner_phone)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Current Pay" required error={errors.x_studio_current_pay}>
            <input
              name="x_studio_current_pay"
              type="text"
              inputMode="numeric"
              maxLength={12}
              onInput={(e) => {
                const target = e.currentTarget;
                target.value = target.value.replace(/\D/g, "").slice(0, 12);
                clearFieldError("x_studio_current_pay");
              }}
              placeholder="e.g. 120000"
              className={inputClass(!!errors.x_studio_current_pay)}
            />
          </Field>

          <Field label="Expected Pay" required error={errors.x_studio_expected_pay}>
            <input
              name="x_studio_expected_pay"
              type="text"
              inputMode="numeric"
              maxLength={12}
              onInput={(e) => {
                const target = e.currentTarget;
                target.value = target.value.replace(/\D/g, "").slice(0, 12);
                clearFieldError("x_studio_expected_pay");
              }}
              placeholder="e.g. 180000"
              className={inputClass(!!errors.x_studio_expected_pay)}
            />
          </Field>
        </div>

        <Field label="Total Experience (Years)" required error={errors.x_studio_total_experience}>
          <input
            name="x_studio_total_experience"
            type="text"
            inputMode="numeric"
            maxLength={2}
            onInput={(e) => {
              const target = e.currentTarget;
              target.value = target.value.replace(/\D/g, "").slice(0, 2);
              clearFieldError("x_studio_total_experience");
            }}
            placeholder="e.g. 4"
            className={inputClass(!!errors.x_studio_total_experience)}
          />
        </Field>

        {/* LinkedIn */}
        <Field label="LinkedIn Profile URL" required error={errors.linkedin_profile}>
          <input
            name="linkedin_profile"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            onChange={() => clearFieldError("linkedin_profile")}
            className={inputClass(!!errors.linkedin_profile)}
          />
        </Field>

        {/* Resume */}
        <Field label="Resume / CV" required error={errors.resume} hint="PDF, DOC or DOCX — max 5 MB.">
          <label
            className={[
              "relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 px-4 py-8 text-center cursor-pointer transition-colors",
              errors.resume ? "border-red-500/60 bg-red-500/5" : "border-gray-600/70 bg-white/[0.03] hover:border-gray-500/80",
            ].join(" ")}
            style={{ borderStyle: "dashed" }}
          >
            <div className="w-12 h-12 rounded-full bg-[#840ECD]/20 border border-[#840ECD]/35 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#C4A0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 16.5 12 12m0 0L7.5 16.5M12 12v9M6.75 7.5a4.5 4.5 0 0 0-3 7.852M6.75 7.5a5.25 5.25 0 0 1 10.306-1.228 4.5 4.5 0 0 1 3.194 8.77M6.75 7.5a5.23 5.23 0 0 0-.447 2.144" />
              </svg>
            </div>
            <p className="text-sm text-white font-medium">
              {selectedFile ? selectedFile.name : "Click to upload your CV"}
            </p>
            <p className="text-xs text-gray-500">PDF, DOC or DOCX</p>
            <input
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                setSelectedFile(e.currentTarget.files?.[0] ?? null);
                clearFieldError("resume");
              }}
            />
          </label>

          {selectedFileUrl && (
            <a
              href={selectedFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[#C4A0FF] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .644C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              View uploaded CV
            </a>
          )}
        </Field>

        {/* Short Introduction */}
        <Field label="Short Introduction" required error={errors.applicant_notes} hint="Tell us a bit about yourself and why you're a great fit.">
          <textarea
            name="applicant_notes"
            rows={5}
            placeholder="I'm a passionate engineer with 3 years of experience…"
            onChange={() => clearFieldError("applicant_notes")}
            className={inputClass(!!errors.applicant_notes) + " resize-none"}
          />
        </Field>

        {formError && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {formError}
          </div>
        )}

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

function validateForm(form: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const partnerName = (form.get("partner_name") as string | null)?.trim() ?? "";
  const email = (form.get("email_from") as string | null)?.trim() ?? "";
  const phone = (form.get("partner_phone") as string | null)?.trim() ?? "";
  const currentPay = (form.get("x_studio_current_pay") as string | null)?.trim() ?? "";
  const expectedPay = (form.get("x_studio_expected_pay") as string | null)?.trim() ?? "";
  const totalExperience = (form.get("x_studio_total_experience") as string | null)?.trim() ?? "";
  const linkedIn = (form.get("linkedin_profile") as string | null)?.trim() ?? "";
  const applicantNotes = (form.get("applicant_notes") as string | null)?.trim() ?? "";
  const resume = form.get("resume");
  const hasResume = resume instanceof File && resume.size > 0;

  if (!partnerName) errors.partner_name = "Full name is required.";

  if (!email) errors.email_from = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email_from = "Please enter a valid email address.";

  if (!phone) errors.partner_phone = "Phone number is required.";
  else if (!/^\+?\d{7,15}$/.test(phone)) errors.partner_phone = "Phone number must be valid (7 to 15 digits).";

  if (!currentPay) errors.x_studio_current_pay = "Current pay is required.";
  else if (!/^\d+$/.test(currentPay)) errors.x_studio_current_pay = "Current pay must contain numbers only.";

  if (!expectedPay) errors.x_studio_expected_pay = "Expected pay is required.";
  else if (!/^\d+$/.test(expectedPay)) errors.x_studio_expected_pay = "Expected pay must contain numbers only.";

  if (!totalExperience) errors.x_studio_total_experience = "Total experience is required.";
  else if (!/^\d+$/.test(totalExperience)) errors.x_studio_total_experience = "Total experience must contain numbers only.";

  if (!linkedIn) errors.linkedin_profile = "LinkedIn profile URL is required.";
  else if (!/^https?:\/\/.+/i.test(linkedIn)) errors.linkedin_profile = "Please enter a valid LinkedIn URL.";

  if (!hasResume) errors.resume = "Resume is required.";
  if (!applicantNotes) errors.applicant_notes = "Short introduction is required.";

  return errors;
}

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
