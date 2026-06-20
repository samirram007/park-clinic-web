import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminDoctorService } from '../data/api'
import type { Doctor, DoctorFormData } from '../data/doctor-schema'
import { getDoctorImageUrl } from '@/features/doctors/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import {
  Plus,
  RefreshCw,
  Search,
  Pencil,
  Trash2,
  X,
  Loader2,
  UserRound,
  Save,
  Upload,
  ChevronDown,
  ChevronUp,
  Clock,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { PaginationControls } from './PaginationControls'
import { parseSchedule, combineSchedule } from '@/features/doctors/utils/schedule-utils'

/** Quick filter presets for common combinations. */
const FILTER_PRESETS = [
  { label: 'All Doctors', type: 'all', status: 'all' },
  { label: 'Active Consultants', type: 'consultant', status: 'active' },
  { label: 'Active Outdoor', type: 'outdoor', status: 'active' },
  { label: 'All Active', type: 'all', status: 'active' },
  { label: 'Inactive', type: 'all', status: 'inactive' },
] as const

/** Accepted MIME types for doctor photos. */
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const MAX_SIZE_BYTES = 2 * 1024 * 1024 // 2 MB
const ACCEPTED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp']
const MAX_SIZE_MB = 2

const RECENT_KEY = 'park-clinic:recent-doctors'
const MAX_RECENT = 5

type RecentEntry = {
  id: number
  name: string
  type: string[]
  title: string | null
  image: string | null
}

function getRecent(): RecentEntry[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]')
  } catch {
    return []
  }
}

function addRecent(doctor: Doctor): RecentEntry[] {
  const list = getRecent().filter((r) => r.id !== doctor.id)
  list.unshift({
    id: doctor.id,
    name: doctor.name,
    type: doctor.type,
    title: doctor.title,
    image: doctor.image,
  })
  const trimmed = list.slice(0, MAX_RECENT)
  localStorage.setItem(RECENT_KEY, JSON.stringify(trimmed))
  return trimmed
}

function clearRecent() {
  localStorage.removeItem(RECENT_KEY)
}

/**
 * Read a URL search param with a fallback default.
 * Used on initial mount to restore filter state from the URL.
 */
function getUrlParam(key: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  return new URLSearchParams(window.location.search).get(key) ?? fallback
}

/**
 * Persist filter state to the URL search params via replaceState.
 * Omits params with default/empty values for clean URLs.
 */
function syncUrl(params: { page: number; per_page: number; type: string; status: string; q: string; sort_by: string; sort_order: string }) {
  const sp = new URLSearchParams()
  if (params.page > 1) sp.set('page', String(params.page))
  if (params.per_page !== 10) sp.set('per_page', String(params.per_page))
  if (params.type !== 'all') sp.set('type', params.type)
  if (params.status !== 'all') sp.set('status', params.status)
  if (params.q) sp.set('q', params.q)
  if (params.sort_by !== 'name') sp.set('sort_by', params.sort_by)
  if (params.sort_order !== 'asc') sp.set('sort_order', params.sort_order)
  const qs = sp.toString()
  const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname
  window.history.replaceState(null, '', url)
}

/** Skeleton placeholder that mirrors the DoctorRow layout while data loads. */
const DoctorRowSkeleton = () => (
  <div className="flex items-center gap-4 bg-white rounded-xl border border-slate-200 p-4">
    {/* Avatar */}
    <div className="w-12 h-12 rounded-full bg-slate-200 animate-pulse shrink-0" />
    {/* Name + details */}
    <div className="flex-1 min-w-0 space-y-2">
      <div className="flex items-center gap-2">
        <div className="h-4 w-32 rounded bg-slate-200 animate-pulse" />
        <div className="h-5 w-20 rounded-full bg-slate-200 animate-pulse" />
      </div>
      <div className="h-3.5 w-48 rounded bg-slate-200 animate-pulse" />
    </div>
    {/* Actions */}
    <div className="flex items-center gap-2 shrink-0">
      <div className="h-5 w-9 rounded-full bg-slate-200 animate-pulse" />
      <div className="h-4 w-10 rounded bg-slate-200 animate-pulse" />
      <div className="h-8 w-8 rounded-md bg-slate-200 animate-pulse" />
      <div className="h-8 w-8 rounded-md bg-slate-200 animate-pulse" />
    </div>
  </div>
)

/** A single doctor row in the admin list with image preview fallback. */
const DoctorRow = ({
  doctor,
  onEdit,
  onDelete,
  onToggleStatus,
  isToggling,
}: {
  doctor: Doctor
  onEdit: (doctor: Doctor) => void
  onDelete: (id: number, name: string) => void
  onToggleStatus: (id: number, currentStatus: boolean, name: string) => void
  isToggling: boolean
}) => {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl border border-slate-200 p-4 hover:shadow-sm transition-shadow">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center shrink-0 overflow-hidden">
        {doctor.image && !imgError ? (
          <img
            src={getDoctorImageUrl(doctor.id)}
            alt={doctor.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <UserRound size={22} className="text-blue-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900 truncate">{doctor.name}</h3>
          <div className="flex gap-1 flex-wrap">
            {doctor.type.length > 1 ? (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gradient-to-r from-blue-100 to-amber-100 text-slate-800 ring-1 ring-blue-200/50">
                Consultant & Outdoor
              </span>
            ) : (
              doctor.type.map(t => (
                <span
                  key={t}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    t === 'consultant'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {t}
                </span>
              ))
            )}
          </div>
        </div>
        <p className="text-sm text-slate-500 truncate">
          {doctor.title ?? doctor.department ?? '—'}
          {doctor.experience && ` · ${doctor.experience}`}
          {doctor.rating && ` · ⭐ ${doctor.rating}`}
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {/* Quick status toggle */}
        <button
          type="button"
          onClick={() => onToggleStatus(doctor.id, doctor.is_active, doctor.name)}
          disabled={isToggling}
          title={doctor.is_active ? 'Deactivate doctor' : 'Activate doctor'}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 shrink-0 ${
            doctor.is_active ? 'bg-green-400' : 'bg-slate-300'
          } ${isToggling ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
              doctor.is_active ? 'translate-x-[18px]' : 'translate-x-[2px]'
            }`}
          />
        </button>
        <span className={`text-xs font-medium w-14 ${doctor.is_active ? 'text-green-600' : 'text-slate-400'}`}>
          {doctor.is_active ? 'Active' : 'Inact.'}
        </span>
        <Button variant="ghost" size="icon" onClick={() => onEdit(doctor)} title="Edit">
          <Pencil size={16} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(doctor.id, doctor.name)} title="Delete" className="text-red-500 hover:text-red-700 hover:bg-red-50">
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  )
}

const emptyForm: DoctorFormData = {
  name: '',
  title: '',
  department: '',
  rating: null,
  image: '',
  imagePreview: '',
  experience: '',
  education: '',
  schedule: '',
  consultantSchedule: '',
  outdoorSchedule: '',
  bio: '',
  reviews: null,
  type: ['consultant'],
  is_active: true,
}

export const DoctorManagement: React.FC = () => {
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Filter state persisted in URL search params (survives refresh)
  const [page, setPage] = useState(() => parseInt(getUrlParam('page', '1'), 10))
  const [typeFilter, setTypeFilter] = useState(() => getUrlParam('type', 'all'))
  const [statusFilter, setStatusFilter] = useState(() => getUrlParam('status', 'all'))
  const [sortBy, setSortBy] = useState(() => getUrlParam('sort_by', 'name'))
  const [sortOrder, setSortOrder] = useState(() => getUrlParam('sort_order', 'asc'))
  const [perPage, setPerPage] = useState(() => {
    const v = getUrlParam('per_page', '10')
    const n = parseInt(v, 10)
    return [10, 25, 50].includes(n) ? n : 10
  })
  // Debounced search — input updates immediately, but filtering + URL sync is debounced
  const [searchInput, setSearchInput] = useState(() => getUrlParam('q', ''))
  const [search, setSearch] = useState(() => getUrlParam('q', ''))
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      setSearch(searchInput)
      setPage(1)
    }, 300)
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [searchInput])

  // Sync filter state to URL on changes (skip first mount to avoid redundant replace)
  const isFirstMountRef = useRef(true)
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false
      return
    }
    syncUrl({ page, per_page: perPage, type: typeFilter, status: statusFilter, q: search, sort_by: sortBy, sort_order: sortOrder })
  }, [page, perPage, typeFilter, statusFilter, search, sortBy, sortOrder])
  const [showForm, setShowForm] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [form, setForm] = useState<DoctorFormData>(emptyForm)
  const [deactivateTarget, setDeactivateTarget] = useState<{ id: number; name: string } | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null)
  const [pillsExpanded, setPillsExpanded] = useState(true)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [recentList, setRecentList] = useState<RecentEntry[]>(() => getRecent())

  // Show "Back to top" button when scrolled past 300px
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const validateImage = (file: File): string | null => {
    // Check MIME type
    if (!ACCEPTED_TYPES.includes(file.type)) {
      const ext = file.name.split('.').pop()?.toLowerCase()
      if (!ext || !ACCEPTED_EXTENSIONS.includes(ext)) {
        return `Invalid file type. Accepted: ${ACCEPTED_EXTENSIONS.join(', ')}.`
      }
    }

    // Check file size
    if (file.size > MAX_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1)
      return `File too large (${sizeMB} MB). Maximum size is ${MAX_SIZE_MB} MB.`
    }

    return null
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate the file before proceeding
    const error = validateImage(file)
    if (error) {
      toast.error(error)
      // Clear the file input so the user can pick again
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    // Revoke previous blob URL to avoid memory leaks
    if (form.imagePreview && form.imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(form.imagePreview)
    }

    // Show local preview
    const previewUrl = URL.createObjectURL(file)
    setForm(prev => ({ ...prev, image: file, imagePreview: previewUrl }))
  }

  const handleRemoveImage = () => {
    if (form.imagePreview && form.imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(form.imagePreview)
    }
    setForm(prev => ({ ...prev, image: '', imagePreview: '' }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const { data, isLoading } = useQuery({
    queryKey: ['admin-doctors', page, perPage, typeFilter, statusFilter, search, sortBy, sortOrder],
    queryFn: () =>
      adminDoctorService.getDoctors({
        page,
        per_page: perPage,
        type: typeFilter === 'all' ? undefined : (typeFilter as 'consultant' | 'outdoor'),
        status: statusFilter === 'all' ? undefined : (statusFilter as 'active' | 'inactive'),
        search: search || undefined,
        sort_by: sortBy as 'name' | 'is_active',
        sort_order: sortOrder as 'asc' | 'desc',
      }),
  });

  const doctors: Doctor[] = data?.data ?? [];
  const meta = data?.meta;

  const createMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => adminDoctorService.createDoctor(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-doctors'] })
      toast.success('Doctor created successfully')
      resetForm()
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || 'Failed to create doctor'
      toast.error(msg)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Record<string, unknown> }) =>
      adminDoctorService.updateDoctor({ id, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-doctors'] })
      toast.success('Doctor updated successfully')
      resetForm()
    },
    onError: () => toast.error('Failed to update doctor'),
  })

  const deleteMutation = useMutation({
    mutationFn: adminDoctorService.deleteDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-doctors'] })
      toast.success('Doctor deleted successfully')
    },
    onError: () => toast.error('Failed to delete doctor'),
  })

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) =>
      adminDoctorService.updateDoctor({ id, payload: { is_active } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-doctors'] })
    },
    onError: () => toast.error('Failed to update status'),
  })

  const executeToggle = (id: number, newStatus: boolean, name: string) => {
    toggleStatusMutation.mutate(
      { id, is_active: newStatus },
      {
        onSuccess: () => toast.success(`${name} is now ${newStatus ? 'active' : 'inactive'}`),
      },
    )
  }

  const handleToggleStatus = (id: number, currentStatus: boolean, name: string) => {
    const newStatus = !currentStatus
    // Only show confirmation when deactivating
    if (!newStatus) {
      setDeactivateTarget({ id, name })
    } else {
      executeToggle(id, newStatus, name)
    }
  }

  const resetForm = () => {
    // Revoke any blob URL to avoid memory leaks
    if (form.imagePreview && form.imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(form.imagePreview)
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
    setForm(emptyForm)
    setEditingDoctor(null)
    setShowForm(false)
  }

  const handleEdit = (doctor: Doctor) => {
    setRecentList(addRecent(doctor))
    const parsed = parseSchedule(doctor.schedule ?? '')
    setForm({
      name: doctor.name,
      title: doctor.title ?? '',
      department: doctor.department ?? '',
      rating: doctor.rating,
      image: doctor.image ?? '',
      imagePreview: doctor.image ?? '',
      experience: doctor.experience ?? '',
      education: doctor.education ?? '',
      schedule: doctor.schedule ?? '',
      consultantSchedule: parsed.consultant,
      outdoorSchedule: parsed.outdoor,
      bio: doctor.bio ?? '',
      reviews: doctor.reviews,
      type: doctor.type,
      is_active: doctor.is_active ?? true,
    })
    setEditingDoctor(doctor)
    setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Merge schedule: dual-type uses separate fields, single-type uses the legacy textarea
    const isDualSchedule = form.type.length > 1
    const mergedSchedule = isDualSchedule
      ? combineSchedule(form.consultantSchedule || '', form.outdoorSchedule || '', '')
      : form.schedule || null

    const payload: Record<string, unknown> = {
      ...form,
      title: form.title || null,
      department: form.department || null,
      experience: form.experience || null,
      education: form.education || null,
      schedule: mergedSchedule || null,
      bio: form.bio || null,
    }
    delete payload.consultantSchedule
    delete payload.outdoorSchedule

    // If image is a file (new upload) or empty/null (no image), pass it through
    if (form.image instanceof File || !form.image) {
      payload.image = form.image || null
    }
    // If it's a string URL (existing image kept), keep as-is in payload
    // buildDoctorFormData will send it as 'image' field directly
    delete payload.imagePreview

    if (editingDoctor) {
      updateMutation.mutate({ id: editingDoctor.id, payload })
    } else {
      createMutation.mutate(payload)
    }
  }

  const handleDelete = (id: number, name: string) => {
    setDeleteTarget({ id, name })
  }

  const handleEditCb = useCallback((doctor: Doctor) => handleEdit(doctor), [])
  const handleDeleteCb = useCallback((id: number, name: string) => handleDelete(id, name), [])
  const handleToggleCb = useCallback(
    (id: number, currentStatus: boolean, name: string) => handleToggleStatus(id, currentStatus, name),
    [],
  )

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manage Doctors</h1>
        <Button onClick={() => { resetForm(); setShowForm(true) }} className="gap-2">
          <Plus size={16} />
          Add Doctor
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-start justify-between gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-wrap items-center gap-2">
            <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1) }}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="consultant">Consultant</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1) }}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value="__presets__"
              onValueChange={(v) => {
                const preset = FILTER_PRESETS.find((p) => p.label === v)
                if (preset) {
                  setTypeFilter(preset.type)
                  setStatusFilter(preset.status)
                  setSearchInput('')
                  setSearch('')
                  setPage(1)
                  setPillsExpanded(true)
                }
              }}
            >
              <SelectTrigger className="w-40 border-dashed border-blue-300 text-blue-700 text-xs">
                <SelectValue placeholder="⚡ Presets" />
              </SelectTrigger>
              <SelectContent>
                {FILTER_PRESETS.map((preset) => (
                  <SelectItem key={preset.label} value={preset.label}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative flex items-center w-64">
              <Search className="absolute left-3 text-slate-400" size={16} />
              <Input
                placeholder="Search doctors..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <Button variant="ghost" size="icon" onClick={() => queryClient.invalidateQueries({ queryKey: ['admin-doctors'] })} title="Refresh">
              <RefreshCw size={16} />
            </Button>
            <div className="h-5 w-px bg-slate-200 mx-1" />
            <Select
              value={sortBy}
              onValueChange={(v) => { setSortBy(v); setPage(1) }}
            >
              <SelectTrigger className="w-28 h-9 text-xs">
                <div className="flex items-center gap-1.5">
                  <ArrowUpDown size={13} className="text-slate-400" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="is_active">Status</SelectItem>
              </SelectContent>
            </Select>
            <button
              type="button"
              onClick={() => {
                setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                setPage(1)
              }}
              className="flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium border border-slate-200 bg-white hover:bg-slate-50 transition-colors h-9 shrink-0"
              title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            >
              {sortOrder === 'asc' ? (
                <ArrowUp size={13} className="text-blue-600" />
              ) : (
                <ArrowDown size={13} className="text-blue-600" />
              )}
              <span className="text-slate-600">{sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
            </button>
          </div>

          {/* Active filter pills */}
          {(() => {
            const activeFilterCount = (typeFilter !== 'all' ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0) + (search ? 1 : 0)
            const showToggle = activeFilterCount >= 2

            /* Collapsed summary bar */
            if (showToggle && !pillsExpanded) {
              return (
                <div className="flex flex-wrap items-center gap-2 min-h-[28px]">
                  {meta && (
                    <span className="text-xs text-slate-500 font-medium mr-2">
                      {meta.total} doctor{meta.total !== 1 ? 's' : ''} found
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                  </span>
                  <button
                    type="button"
                    onClick={() => setPillsExpanded(true)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center gap-0.5"
                  >
                    Show <ChevronDown size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTypeFilter('all'); setStatusFilter('all'); setSearchInput(''); setSearch(''); setPage(1) }}
                    className="text-xs text-slate-400 hover:text-red-500 transition-colors underline underline-offset-2 ml-auto"
                  >
                    Clear all
                  </button>
                </div>
              )
            }

            /* Expanded pills */
            return (
              <div className="flex flex-wrap items-center gap-2 min-h-[28px]">
                {meta && (
                  <span className="text-xs text-slate-500 font-medium mr-2">
                    {meta.total} doctor{meta.total !== 1 ? 's' : ''} found
                  </span>
                )}
                {typeFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                    Type: {typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)}
                    <button
                      type="button"
                      onClick={() => { setTypeFilter('all'); setPage(1) }}
                      className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      title="Clear type filter"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {statusFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                    <button
                      type="button"
                      onClick={() => { setStatusFilter('all'); setPage(1) }}
                      className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors"
                      title="Clear status filter"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
                    Search: &ldquo;{search}&rdquo;
                    <button
                      type="button"
                      onClick={() => { setSearchInput(''); setSearch(''); setPage(1) }}
                      className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                      title="Clear search"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                <div className="flex items-center gap-2 ml-1">
                  {showToggle && (
                    <button
                      type="button"
                      onClick={() => setPillsExpanded(false)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center gap-0.5"
                    >
                      <ChevronDown size={12} className="rotate-180" /> Hide
                    </button>
                  )}
                  {(typeFilter !== 'all' || statusFilter !== 'all' || search) && (
                    <button
                      type="button"
                      onClick={() => { setTypeFilter('all'); setStatusFilter('all'); setSearchInput(''); setSearch(''); setPage(1) }}
                      className="text-xs text-slate-400 hover:text-red-500 transition-colors underline underline-offset-2"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>
            )
          })()}
        </div>
      </div>

      {/* Doctor Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-10 bg-black/40 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {editingDoctor ? 'Edit Doctor' : 'Add Doctor'}
              </h2>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X size={20} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Dr. John Doe" />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type *</label>
                  <div className="flex gap-4 h-9 items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.type.includes('consultant')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setForm({ ...form, type: [...form.type, 'consultant'] })
                          } else {
                            setForm({ ...form, type: form.type.filter(t => t !== 'consultant') })
                          }
                        }}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">Consultant</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.type.includes('outdoor')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setForm({ ...form, type: [...form.type, 'outdoor'] })
                          } else {
                            setForm({ ...form, type: form.type.filter(t => t !== 'outdoor') })
                          }
                        }}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">Outdoor</span>
                    </label>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title / Speciality</label>
                  <Input value={form.title ?? ''} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Cardiologist" />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <Input value={form.department ?? ''} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="e.g. Cardiology" />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
                  <Input value={form.experience ?? ''} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 10 years" />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rating (0-5)</label>
                  <Input type="number" min={0} max={5} step={0.1} value={form.rating ?? ''} onChange={(e) => setForm({ ...form, rating: e.target.value ? parseFloat(e.target.value) : null })} />
                </div>

                {/* Reviews */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Reviews Count</label>
                  <Input type="number" min={0} value={form.reviews ?? ''} onChange={(e) => setForm({ ...form, reviews: e.target.value ? parseInt(e.target.value) : null })} />
                </div>

                {/* Active Status */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <div className="flex items-center gap-3 h-9">
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, is_active: !prev.is_active }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        form.is_active ? 'bg-green-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
                          form.is_active ? 'translate-x-[22px]' : 'translate-x-[2px]'
                        }`}
                      />
                    </button>
                    <span className={`text-sm font-medium ${form.is_active ? 'text-green-600' : 'text-slate-400'}`}>
                      {form.is_active ? 'Active' : 'Inactive'}
                    </span>
                    {!form.is_active && (
                      <span className="text-xs text-amber-600">(Hidden from public site)</span>
                    )}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Doctor Photo</label>
                  <div className="flex items-start gap-4">
                    {/* Preview */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                      {form.imagePreview ? (
                        <img
                          src={form.imagePreview}
                          alt="Doctor preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserRound size={32} className="text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="gap-2"
                        >
                          <Upload size={14} />
                          {form.imagePreview ? 'Change Photo' : 'Upload Photo'}
                        </Button>
                        {form.imagePreview && (
                          <Button type="button" variant="ghost" size="sm" onClick={handleRemoveImage} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                            <X size={14} />
                            Remove
                          </Button>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <p className="text-xs text-slate-400">
                        JPEG, PNG, JPG, GIF or WebP. Max 2MB.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Education</label>
                <Textarea rows={3} value={form.education ?? ''} onChange={(e) => setForm({ ...form, education: e.target.value })} placeholder="MBBS, MD (Cardiology)&#10;DM, Fellowship in..." />
              </div>

              {/* Schedule - separate fields for Consultant and Outdoor */}
              {form.type.length > 1 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Consultant Schedule
                    </label>
                    <Textarea rows={3} value={form.consultantSchedule ?? ''} onChange={(e) => setForm({ ...form, consultantSchedule: e.target.value })} placeholder="Monday - Friday: 9:00 AM - 1:00 PM&#10;Saturday: 9:00 AM - 12:00 PM" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Outdoor Schedule
                    </label>
                    <Textarea rows={3} value={form.outdoorSchedule ?? ''} onChange={(e) => setForm({ ...form, outdoorSchedule: e.target.value })} placeholder="Monday - Saturday: 10:00 AM - 4:00 PM&#10;Sunday: Emergency only" />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Schedule</label>
                  <Textarea rows={3} value={form.schedule ?? ''} onChange={(e) => setForm({ ...form, schedule: e.target.value })} placeholder="Monday - Friday: 9:00 AM - 5:00 PM&#10;Saturday: 9:00 AM - 1:00 PM" />
                </div>
              )}

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bio / Description</label>
                <Textarea rows={4} value={form.bio ?? ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="A brief professional biography..." />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                <Button type="submit" disabled={isPending || !form.name} className="gap-2">
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
                  {editingDoctor ? 'Update Doctor' : 'Create Doctor'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Doctor</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{deleteTarget?.name}</strong>?
              <br /><br />
              This action <strong>cannot</strong> be undone. All doctor data,
              including their profile photo and scheduling information, will be
              permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteTarget(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) {
                  deleteMutation.mutate(deleteTarget.id)
                }
                setDeleteTarget(null)
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Deactivation Confirmation Dialog */}
      <AlertDialog
        open={!!deactivateTarget}
        onOpenChange={(open) => { if (!open) setDeactivateTarget(null) }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Doctor</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to deactivate <strong>{deactivateTarget?.name}</strong>?
              <br /><br />
              This will hide this doctor from the public website. Patients will
              no longer see them on the doctors list or detail pages.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeactivateTarget(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deactivateTarget) {
                  executeToggle(deactivateTarget.id, false, deactivateTarget.name)
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

      {/* Recently viewed */}
      {recentList.length > 0 && !showForm && (
        <div className="mb-6 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Clock size={14} />
              Recently Viewed
            </h2>
            <button
              type="button"
              onClick={() => { clearRecent(); setRecentList([]) }}
              className="text-xs text-slate-400 hover:text-red-500 transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentList.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  // Find the doctor in current data or fetch individually
                  const found = doctors.find((d) => d.id === r.id)
                  if (found) {
                    handleEdit(found)
                  } else {
                    adminDoctorService.getDoctor(r.id)
                      .then((res) => handleEdit(res.data))
                      .catch(() => {
                        toast.error(`Could not load "${r.name}"`)
                        const updated = getRecent().filter((x) => x.id !== r.id)
                        localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
                        setRecentList(updated)
                      })
                  }
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all text-sm"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center shrink-0 overflow-hidden">
                  {r.image ? (
                    <img src={getDoctorImageUrl(r.id)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <UserRound size={12} className="text-blue-600" />
                  )}
                </div>
                <span className="font-medium text-slate-700">{r.name}</span>
                <span className="text-xs text-slate-400">
                  {Array.isArray(r.type) ? r.type.join(', ') : r.type}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Doctor List */}
      <div className="space-y-2">
        {isLoading ? (
          <div className="grid gap-3">
            <DoctorRowSkeleton />
            <DoctorRowSkeleton />
            <DoctorRowSkeleton />
            <DoctorRowSkeleton />
            <DoctorRowSkeleton />
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <UserRound size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No doctors found</p>
            <p className="text-sm">Add your first doctor to get started.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {doctors.map((doctor: Doctor) => (
                <DoctorRow
                  key={doctor.id}
                  doctor={doctor}
                  onEdit={handleEditCb}
                  onDelete={handleDeleteCb}
                  onToggleStatus={handleToggleCb}
                  isToggling={toggleStatusMutation.isPending}
                />
              ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {meta && meta.last_page > 1 && (
        <div className="flex items-center justify-between pt-6">
          <p className="text-sm text-slate-500">
            Page {meta.current_page} of {meta.last_page} ({meta.total} total)
          </p>
          <PaginationControls page={page} lastPage={meta.last_page} onPageChange={setPage} perPage={perPage} onPerPageChange={(v) => { setPerPage(v); setPage(1) }} />
        </div>
      )}

      {/* Back to top */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium"
          title="Back to top"
        >
          <ChevronUp size={16} />
          Back to top
        </button>
      )}
    </div>
  )
}
