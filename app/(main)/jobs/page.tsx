type JobsPageProps = {};

export default async function JobsPage({}: JobsPageProps) {
  const res = await fetch(
    "https://dexnive.odoo.com/jobs?minimal=1",
    {
      next: { revalidate: 60 }, // ISR
    }
  );

  const html = await res.text();

  // Fix internal links
  const fixedHtml = html.replaceAll(
    "https://dexnive.odoo.com/jobs/detail/",
    "/jobs/"
  );

  return (
    <div
      dangerouslySetInnerHTML={{ __html: fixedHtml }}
    />
  );
}