// lib/odoo.types.ts

export interface OdooJob {
  id: number;
  name: string;
  description: string | false;
  x_studio_html_job_description: string | false;
  department_id: [number, string] | false;
  address_id: [number, string] | false;
  no_of_recruitment: number;
}

export interface OdooApiError {
  name: string;
  message: string;
  arguments: unknown[];
  context: Record<string, unknown>;
}
