import JobExplorer from "@/components/job-explorer";
import { searchJobs } from "@/lib/jobs";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const jobs = searchJobs(query);

  return <JobExplorer query={query} jobs={jobs} />;
}
