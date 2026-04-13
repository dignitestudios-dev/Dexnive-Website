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
    const currentPay      = (form.get("x_studio_current_pay") as string | null)?.trim() ?? "";
    const expectedPay     = (form.get("x_studio_expected_pay") as string | null)?.trim() ?? "";
    const totalExperience = (form.get("x_studio_total_experience") as string | null)?.trim() ?? "";
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

    if (!partnerPhone) {
      errors.partner_phone = "Phone number is required.";
    } else if (!/^\d{7,15}$/.test(partnerPhone)) {
      errors.partner_phone = "Phone number must be 7 to 15 digits.";
    }

    if (!currentPay) {
      errors.x_studio_current_pay = "Current pay is required.";
    } else if (!/^\d+$/.test(currentPay)) {
      errors.x_studio_current_pay = "Current pay must contain numbers only.";
    }

    if (!expectedPay) {
      errors.x_studio_expected_pay = "Expected pay is required.";
    } else if (!/^\d+$/.test(expectedPay)) {
      errors.x_studio_expected_pay = "Expected pay must contain numbers only.";
    }

    if (!totalExperience) {
      errors.x_studio_total_experience = "Total experience is required.";
    } else if (!/^\d+$/.test(totalExperience)) {
      errors.x_studio_total_experience = "Total experience must contain numbers only.";
    }

    if (!linkedinProfile) {
      errors.linkedin_profile = "LinkedIn profile URL is required.";
    } else if (!/^https?:\/\/.+/i.test(linkedinProfile)) {
      errors.linkedin_profile = "Please enter a valid LinkedIn URL.";
    }

    if (!applicantNotes) {
      errors.applicant_notes = "Short introduction is required.";
    }

    if (!file) {
      errors.resume = "Resume is required.";
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
      x_studio_current_pay: currentPay || undefined,
      x_studio_expected_pay: expectedPay || undefined,
      x_studio_total_experience: totalExperience || undefined,
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
