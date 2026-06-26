import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  BadgeCheck,
  Briefcase,
  Calendar,
  Download,
  Eye,
  FileText,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  User,
  X,
} from 'lucide-react'
import { adminCareerApplicationService, adminJobPostService } from '../data/api'
import { PaginationControls } from './PaginationControls'
import { ResumeViewer } from './ResumeViewer'
import type { CareerApplication, JobPost } from '../data/schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export const CareerApplications: React.FC = () => {
  const queryClient = useQueryClient()

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [selectedApp, setSelectedApp] = useState<CareerApplication | null>(null)
  const [viewerApp, setViewerApp] = useState<CareerApplication | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number
    name: string
  } | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-career-applications', page, perPage, search],
    queryFn: () =>
      adminCareerApplicationService.getApplications({
        page,
        per_page: perPage,
        search: search || undefined,
      }),
  })

  // Fetch all job posts to match applications against
  const { data: jobsData } = useQuery({
    queryKey: ['admin-job-posts-match'],
    queryFn: () => adminJobPostService.getPosts({ per_page: 100 }),
    staleTime: 60000,
  })

  const jobs: Array<JobPost> = jobsData?.data ?? []
  // Build a Set of active job titles for quick lookup
  const activeJobTitles = new Set<string>(
    jobs.filter((j) => j.is_active).map((j) => j.title.toLowerCase().trim()),
  )

  const applications: Array<CareerApplication> = data?.data ?? []
  const meta = data?.meta

  const deleteMutation = useMutation({
    mutationFn: adminCareerApplicationService.deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-career-applications'] })
      toast.success('Application deleted successfully')
    },
    onError: () => toast.error('Failed to delete application'),
  })

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Career Applications
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            queryClient.invalidateQueries({
              queryKey: ['admin-career-applications'],
            })
          }
          title="Refresh"
        >
          <RefreshCw size={16} />
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div className="relative flex items-center w-72">
          <Search className="absolute left-3 text-slate-400" size={16} />
          <Input
            placeholder="Search by name, email, or position..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="pl-9 h-9"
          />
        </div>
        {meta && (
          <span className="text-xs text-slate-500 ml-auto mr-2">
            {meta.total} application{meta.total !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Detail Panel */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-10 bg-black/40 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Application Details
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedApp(null)}
              >
                <X size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center shrink-0">
                  <User size={22} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {selectedApp.full_name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-slate-500">
                      {selectedApp.position}
                    </span>
                    {activeJobTitles.has(
                      selectedApp.position.toLowerCase().trim(),
                    ) && (
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                        <BadgeCheck size={11} />
                        Active Job
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-slate-400 shrink-0" />
                  <a
                    href={`mailto:${selectedApp.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedApp.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-slate-400 shrink-0" />
                  <a
                    href={`tel:${selectedApp.phone}`}
                    className="text-slate-700"
                  >
                    {selectedApp.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase size={16} className="text-slate-400 shrink-0" />
                  <span className="text-slate-700">{selectedApp.position}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-slate-400 shrink-0" />
                  <span className="text-slate-500">
                    {new Date(
                      selectedApp.created_at ?? '',
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {selectedApp.message && (
                <div className="pt-4 border-t border-slate-100">
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Cover Letter / Message
                  </label>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap bg-slate-50 rounded-lg p-3">
                    {selectedApp.message}
                  </p>
                </div>
              )}

              {selectedApp.resume_url && (
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setViewerApp(selectedApp)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    <Eye size={16} />
                    View Resume
                  </button>
                  <a
                    href={selectedApp.resume_url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium"
                  >
                    <Download size={16} />
                    Download
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
              <Button variant="outline" onClick={() => setSelectedApp(null)}>
                Close
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setDeleteTarget({
                    id: selectedApp.id,
                    name: selectedApp.full_name,
                  })
                  setSelectedApp(null)
                }}
                className="gap-2"
              >
                <Trash2 size={14} />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{' '}
              <strong>{deleteTarget?.name}</strong>'s application?
              <br />
              <br />
              The uploaded resume will also be permanently deleted. This cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteTarget(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) deleteMutation.mutate(deleteTarget.id)
                setDeleteTarget(null)
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Applications List */}
      <div className="space-y-2">
        {isLoading ? (
          <div className="grid gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white rounded-xl border border-slate-200 p-4"
              >
                <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-40 rounded bg-slate-200 animate-pulse" />
                  <div className="h-3 w-24 rounded bg-slate-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <FileText size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No applications yet</p>
            <p className="text-sm">
              Applications from the career page will appear here.
            </p>
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedApp(app)}
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center shrink-0 mt-0.5 shadow-sm ring-1 ring-blue-200/50">
                  <User size={20} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  {/* Title Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate max-w-sm">
                        {app.full_name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        {activeJobTitles.has(
                          app.position.toLowerCase().trim(),
                        ) && (
                          <span
                            className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium"
                            title="This position is an active job posting"
                          >
                            <BadgeCheck size={11} />
                            Applied
                          </span>
                        )}
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                          {app.position}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 shrink-0 whitespace-nowrap mt-1">
                      <Calendar size={12} className="inline mr-1" />
                      {new Date(app.created_at ?? '').toLocaleDateString()}
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Mail size={12} className="text-slate-400" />
                      {app.email}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Phone size={12} className="text-slate-400" />
                      {app.phone}
                    </span>
                    {app.resume_url && (
                      <span className="inline-flex items-center gap-1.5">
                        <FileText size={12} className="text-slate-400" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setViewerApp(app)
                          }}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          View Resume
                        </button>
                      </span>
                    )}
                  </div>

                  {/* Message Preview */}
                  {app.message && (
                    <p className="text-xs text-slate-400 mt-2.5 line-clamp-1 italic">
                      "{app.message}"
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedApp(app)
                      }}
                      className="gap-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Eye size={14} />
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeleteTarget({ id: app.id, name: app.full_name })
                      }}
                      className="gap-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 ml-auto"
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resume Viewer */}
      {viewerApp?.resume_url && (
        <ResumeViewer
          url={viewerApp.resume_url}
          fileName={`resume-${viewerApp.full_name.replace(/\s+/g, '-').toLowerCase()}.pdf`}
          open={!!viewerApp}
          onClose={() => setViewerApp(null)}
        />
      )}

      {/* Pagination */}
      {meta && meta.last_page > 1 && (
        <div className="flex items-center justify-between pt-6">
          <p className="text-sm text-slate-500">
            Page {meta.current_page} of {meta.last_page} ({meta.total} total)
          </p>
          <PaginationControls
            page={page}
            lastPage={meta.last_page}
            onPageChange={setPage}
            perPage={perPage}
            onPerPageChange={(v) => {
              setPerPage(v)
              setPage(1)
            }}
          />
        </div>
      )}
    </div>
  )
}
