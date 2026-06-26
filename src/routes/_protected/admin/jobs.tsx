import { createFileRoute } from '@tanstack/react-router'
import { JobPostManagement } from '@/features/admin/components/job-post-management'

export const Route = createFileRoute('/_protected/admin/jobs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <JobPostManagement />
}
