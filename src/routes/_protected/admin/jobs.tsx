import { JobPostManagement } from '@/features/admin/components/job-post-management'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/jobs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <JobPostManagement />
}
