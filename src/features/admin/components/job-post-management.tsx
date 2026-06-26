import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  Archive,
  Briefcase,
  Calendar,
  Clock,
  List,
  Loader2,
  PauseCircle,
  Pencil,
  PlayCircle,
  Plus,
  RefreshCw,
  Save,
  Search,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react'
import { adminJobPostService } from '../data/api'
import { PaginationControls } from './PaginationControls'
import type { JobPost, JobPostFormData } from '../data/schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

const RECENT_DAYS = 7

function isRecentPost(createdAt: string | null): boolean {
  if (!createdAt) return false
  const posted = new Date(createdAt).getTime()
  const now = Date.now()
  const diffMs = now - posted
  return diffMs >= 0 && diffMs < RECENT_DAYS * 24 * 60 * 60 * 1000
}

const emptyForm: JobPostFormData = {
  title: '',
  description: '',
  is_active: true,
  apply_duration: '',
}

export const JobPostManagement: React.FC = () => {
  const queryClient = useQueryClient()

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showForm, setShowForm] = useState(false)

  // Count queries for each tab
  const { data: allCountData } = useQuery({
    queryKey: ['admin-job-posts-count-all'],
    queryFn: () => adminJobPostService.getPosts({ per_page: 1 }),
  })

  const { data: activeCountData } = useQuery({
    queryKey: ['admin-job-posts-count-active'],
    queryFn: () =>
      adminJobPostService.getPosts({ per_page: 1, status: 'active' }),
  })

  const { data: expiredCountData } = useQuery({
    queryKey: ['admin-job-posts-count-expired'],
    queryFn: () =>
      adminJobPostService.getPosts({ per_page: 1, status: 'expired' }),
  })

  const { data: inactiveCountData } = useQuery({
    queryKey: ['admin-job-posts-count-inactive'],
    queryFn: () =>
      adminJobPostService.getPosts({ per_page: 1, status: 'inactive' }),
  })
  const [editingPost, setEditingPost] = useState<JobPost | null>(null)
  const [form, setForm] = useState<JobPostFormData>(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number
    title: string
  } | null>(null)
  const [deactivateTarget, setDeactivateTarget] = useState<{
    id: number
    title: string
  } | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-job-posts', page, perPage, search, statusFilter],
    queryFn: () =>
      adminJobPostService.getPosts({
        page,
        per_page: perPage,
        status:
          statusFilter === 'all'
            ? undefined
            : (statusFilter as 'active' | 'inactive'),
        search: search || undefined,
      }),
  })

  const posts: Array<JobPost> = data?.data ?? []
  const meta = data?.meta

  const createMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      adminJobPostService.createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-job-posts'] })
      toast.success('Job post created successfully')
      resetForm()
    },
    onError: () => toast.error('Failed to create job post'),
  })

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number
      payload: Record<string, unknown>
    }) => adminJobPostService.updatePost({ id, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-job-posts'] })
      toast.success('Job post updated successfully')
      resetForm()
    },
    onError: () => toast.error('Failed to update job post'),
  })

  const deleteMutation = useMutation({
    mutationFn: adminJobPostService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-job-posts'] })
      toast.success('Job post deleted successfully')
    },
    onError: () => toast.error('Failed to delete job post'),
  })

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) =>
      adminJobPostService.updatePost({ id, payload: { is_active } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-job-posts'] })
    },
    onError: () => toast.error('Failed to update status'),
  })

  const resetForm = () => {
    setForm(emptyForm)
    setEditingPost(null)
    setShowForm(false)
  }

  const handleEdit = (post: JobPost) => {
    setForm({
      title: post.title,
      description: post.description,
      is_active: post.is_active,
      apply_duration: post.apply_duration ?? '',
    })
    setEditingPost(post)
    setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: Record<string, unknown> = {
      ...form,
      apply_duration: form.apply_duration || null,
    }

    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, payload })
    } else {
      createMutation.mutate(payload)
    }
  }

  const handleToggleStatus = (id: number, current: boolean, title: string) => {
    if (current) {
      setDeactivateTarget({ id, title })
    } else {
      toggleStatusMutation.mutate({ id, is_active: true })
      toast.success(`"${title}" is now active`)
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Manage Job Posts
        </h1>
        <Button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="gap-2"
        >
          <Plus size={16} />
          New Job Post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm mb-6">
        <Tabs
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v)
            setPage(1)
          }}
          className="w-full sm:w-auto"
        >
          <TabsList className="bg-slate-100/50 p-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-indigo-200 border border-transparent transition-all"
            >
              <List size={14} className="mr-1.5 text-indigo-500" />
              <span className="font-semibold">All</span>{' '}
              {allCountData?.meta?.total !== undefined
                ? `(${allCountData.meta.total})`
                : ''}
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-emerald-200 border border-transparent transition-all"
            >
              <PlayCircle size={14} className="mr-1.5 text-emerald-500" />
              <span className="font-semibold">Active</span>{' '}
              {activeCountData?.meta?.total !== undefined
                ? `(${activeCountData.meta.total})`
                : ''}
            </TabsTrigger>
            <TabsTrigger
              value="inactive"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-slate-300 border border-transparent transition-all"
            >
              <PauseCircle size={14} className="mr-1.5 text-slate-400" />
              <span className="font-semibold">Inactive</span>{' '}
              {inactiveCountData?.meta?.total !== undefined
                ? `(${inactiveCountData.meta.total})`
                : ''}
            </TabsTrigger>
            <TabsTrigger
              value="expired"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-amber-200 border border-transparent transition-all"
            >
              <Archive size={14} className="mr-1.5 text-amber-500" />
              <span className="font-semibold">Expired</span>{' '}
              {expiredCountData?.meta?.total !== undefined
                ? `(${expiredCountData.meta.total})`
                : ''}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex items-center w-full sm:w-64">
            <Search className="absolute left-3 text-slate-400" size={16} />
            <Input
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="pl-9 h-9"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ['admin-job-posts'] })
              queryClient.invalidateQueries({
                queryKey: ['admin-job-posts-count-all'],
              })
              queryClient.invalidateQueries({
                queryKey: ['admin-job-posts-count-active'],
              })
              queryClient.invalidateQueries({
                queryKey: ['admin-job-posts-count-expired'],
              })
              queryClient.invalidateQueries({
                queryKey: ['admin-job-posts-count-inactive'],
              })
            }}
            title="Refresh"
          >
            <RefreshCw size={16} />
          </Button>
        </div>
      </div>

      {/* Job Post Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-10 bg-black/40 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {editingPost ? 'Edit Job Post' : 'New Job Post'}
              </h2>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X size={20} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Job Title *
                </label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="e.g. Staff Nurse"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description *
                </label>
                <Textarea
                  rows={6}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                  placeholder="Describe the role, responsibilities, qualifications..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Active Status */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Status
                  </label>
                  <div className="flex items-center gap-3 h-9">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          is_active: !prev.is_active,
                        }))
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        form.is_active ? 'bg-green-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
                          form.is_active
                            ? 'translate-x-[22px]'
                            : 'translate-x-[2px]'
                        }`}
                      />
                    </button>
                    <span
                      className={`text-sm font-medium ${form.is_active ? 'text-green-600' : 'text-slate-400'}`}
                    >
                      {form.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Apply Duration */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Apply By (Deadline)
                  </label>
                  <Input
                    type="date"
                    value={form.apply_duration}
                    onChange={(e) =>
                      setForm({ ...form, apply_duration: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending || !form.title || !form.description}
                  className="gap-2"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {editingPost ? 'Update Job Post' : 'Create Job Post'}
                </Button>
              </div>
            </form>
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
            <AlertDialogTitle>Delete Job Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{' '}
              <strong>{deleteTarget?.title}</strong>?
              <br />
              <br />
              This action cannot be undone.
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

      {/* Deactivation Confirmation */}
      <AlertDialog
        open={!!deactivateTarget}
        onOpenChange={(open) => {
          if (!open) setDeactivateTarget(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Job Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to deactivate{' '}
              <strong>{deactivateTarget?.title}</strong>?
              <br />
              <br />
              This will hide this job from the public career page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeactivateTarget(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deactivateTarget) {
                  toggleStatusMutation.mutate({
                    id: deactivateTarget.id,
                    is_active: false,
                  })
                  toast.success(`"${deactivateTarget.title}" is now inactive`)
                }
                setDeactivateTarget(null)
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Yes, Deactivate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Job Posts List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="grid gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white rounded-xl border border-slate-200 p-4"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-200 animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 rounded bg-slate-200 animate-pulse" />
                  <div className="h-3 w-32 rounded bg-slate-200 animate-pulse" />
                </div>
                <div className="h-5 w-14 rounded-full bg-slate-200 animate-pulse" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <Briefcase size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No job posts found</p>
            <p className="text-sm">
              Create your first job post to get started.
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shrink-0 mt-0.5 shadow-sm ring-1 ring-blue-200/50">
                  <Briefcase size={20} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  {/* Title Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-slate-900 truncate max-w-md">
                          {post.title}
                        </h3>
                        {isRecentPost(post.created_at) && (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium shrink-0 animate-pulse">
                            <Sparkles size={10} />
                            New
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 shadow-sm ${
                        post.is_active
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                    >
                      {post.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-500 mt-2.5 leading-relaxed line-clamp-3">
                    {post.description}
                  </p>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-xs text-slate-400">
                    {post.apply_duration && (
                      <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-medium">
                        <Calendar size={12} />
                        Deadline:{' '}
                        {new Date(post.apply_duration).toLocaleDateString()}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={12} className="text-slate-400" />
                      Posted{' '}
                      {new Date(post.created_at ?? '').toLocaleDateString()}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-blue-600 font-medium">
                      <Briefcase size={12} />
                      {post.applications_count ?? 0} applicant
                      {(post.applications_count ?? 0) !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() =>
                        handleToggleStatus(post.id, post.is_active, post.title)
                      }
                      disabled={toggleStatusMutation.isPending}
                      title={
                        post.is_active
                          ? 'Deactivate this job post'
                          : 'Activate this job post'
                      }
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                        post.is_active ? 'bg-green-400' : 'bg-slate-300'
                      } ${toggleStatusMutation.isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
                          post.is_active
                            ? 'translate-x-[18px]'
                            : 'translate-x-[2px]'
                        }`}
                      />
                    </button>
                    <div className="ml-auto flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(post)}
                        className="gap-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Pencil size={14} />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setDeleteTarget({ id: post.id, title: post.title })
                        }
                        className="gap-1.5 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

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
