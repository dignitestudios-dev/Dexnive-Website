import { NextRequest, NextResponse } from "next/server";
import { createApplicant, attachResume } from "@/lib/odoo";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const partnerName     = (form.get("partner_name")     as string | null)?.trim() ?? "";
    const emailFrom       = (form.get("email_from")       as string | null)?.trim() ?? "";
    const partnerPhone    = (form.get("partner_phone")    as string | null)?.trim() ?? "";
    const linkedinProfile = (form.get("linkedin_profile") as string | null)?.trim() ?? "";
    const applicantNotes  = (form.get("applicant_notes")  as string | null)?.trim() ?? "";
    const jobId           = parseInt(form.get("job_id")   as string, 10);
    const file            = form.get("resume") as File | null;

    // ── Validation ──────────────────────────────────────────────────────────
    const errors: Record<string, string> = {};

    if (!partnerName) errors.partner_name = "Full name is required.";

    if (!emailFrom) {
      errors.email_from = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFrom)) {
      errors.email_from = "Please enter a valid email address.";
    }

    if (!partnerPhone) errors.partner_phone = "Phone number is required.";

    if (!file && !linkedinProfile) {
      errors.resume = "Please upload a resume or provide your LinkedIn profile URL.";
    }

    if (file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.resume = "Only PDF, DOC, and DOCX files are accepted.";
      } else if (file.size > MAX_SIZE) {
        errors.resume = "File must be 5 MB or smaller.";
      }
    }

    if (isNaN(jobId)) errors.job_id = "Invalid job ID.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }

    // ── Create applicant ─────────────────────────────────────────────────────
    const applicantId = await createApplicant({
      job_id:           jobId,
      partner_name:     partnerName,
      email_from:       emailFrom,
      partner_phone:    partnerPhone,
      linkedin_profile: linkedinProfile || undefined,
      applicant_notes:  applicantNotes
        ? `<p>${applicantNotes.replace(/\n/g, "<br/>")}</p>`
        : undefined,
    });

    // ── Upload resume ────────────────────────────────────────────────────────
    if (file) {
      const bytes  = await file.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      await attachResume(applicantId, file.name, base64, file.type);
    }

    return NextResponse.json({ success: true, applicantId });
  } catch (err: unknown) {
    console.error("[apply] error:", err);
    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
