// lib/odoo.ts

import type { OdooJob } from './odoo.types';

const ODOO_BASE_URL = process.env.ODOO_BASE_URL!;
const ODOO_API_KEY  = process.env.ODOO_API_KEY!;
const ODOO_DB_NAME  = process.env.ODOO_DB_NAME!;

const JOB_FIELDS: (keyof OdooJob)[] = [
  'id',
  'name',
  'description',
  'x_studio_html_job_description',
  'department_id',
  'address_id',
  'no_of_recruitment',
];

function odooHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${ODOO_API_KEY}`,
    'X-Odoo-Database': ODOO_DB_NAME,
  };
}

async function odooPost<T>(
  model: string,
  method: string,
  body: Record<string, unknown>,
  revalidate = 60,
): Promise<T> {
  const res = await fetch(`${ODOO_BASE_URL}/json/2/${model}/${method}`, {
    method: 'POST',
    headers: odooHeaders(),
    body: JSON.stringify(body),
    next: { revalidate },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.message ?? `Odoo API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Jobs ─────────────────────────────────────────────────────────────────────

export async function fetchJobs(): Promise<OdooJob[]> {
  return odooPost<OdooJob[]>('hr.job', 'search_read', {
    domain: [['website_published', '=', true]],
    fields: JOB_FIELDS,
  });
}

export async function fetchJobById(id: number | string): Promise<OdooJob | null> {
  const jobs = await odooPost<OdooJob[]>('hr.job', 'search_read', {
    domain: [['id', '=', Number(id)]],
    fields: JOB_FIELDS,
  });
  return jobs[0] ?? null;
}

// ─── Applications ─────────────────────────────────────────────────────────────

export interface ApplicantData {
  job_id: number;
  partner_name: string;
  email_from: string;
  partner_phone: string;
  linkedin_profile?: string;
  applicant_notes?: string;
}

export async function createApplicant(data: ApplicantData): Promise<number> {
  // Odoo 19 create() takes vals_list (array) and returns an array of IDs
  const ids = await odooPost<number[]>('hr.applicant', 'create', { vals_list: [data] }, 0);
  return ids[0];
}

export async function attachResume(
  applicantId: number,
  fileName: string,
  base64Data: string,
  mimetype: string,
): Promise<number> {
  const ids = await odooPost<number[]>('ir.attachment', 'create', {
    vals_list: [{
      name: fileName,
      datas: base64Data,
      res_model: 'hr.applicant',
      res_id: applicantId,
      mimetype,
    }],
  }, 0);
  return ids[0];
}
