import React, { useCallback, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

interface ResumeViewerProps {
  url: string
  fileName?: string
  open: boolean
  onClose: () => void
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({
  url,
  fileName = 'resume',
  open,
  onClose,
}) => {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.2)
  const [rotation, setRotation] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const onDocumentLoadSuccess = useCallback(
    ({ numPages: nextNumPages }: { numPages: number }) => {
      setNumPages(nextNumPages)
      setPageNumber(1)
      setLoading(false)
      setError(null)
    },
    [],
  )

  const onDocumentLoadError = useCallback((err: Error) => {
    setLoading(false)
    setError(err.message || 'Failed to load PDF')
  }, [])

  const goToPrevPage = () => setPageNumber((p) => Math.max(p - 1, 1))
  const goToNextPage = () => setPageNumber((p) => Math.min(p + 1, numPages ?? 1))

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 3))
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.4))
  const resetZoom = () => setScale(1.2)
  const toggleRotation = () => setRotation((r) => (r + 90) % 360)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 px-4 py-2 bg-slate-900 border-b border-slate-800 shrink-0">
        {/* Left: Close + File name */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close viewer"
          >
            <X size={18} />
          </button>
          <span className="text-sm text-slate-300 truncate max-w-[200px]">
            {fileName}
          </span>
        </div>

        {/* Center: Page navigation */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-slate-300 tabular-nums min-w-[80px] text-center">
            {loading ? '—' : `${pageNumber} / ${numPages}`}
          </span>
          <button
            onClick={goToNextPage}
            disabled={!numPages || pageNumber >= numPages}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Right: Zoom + Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={resetZoom}
            className="px-2 py-1 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors tabular-nums min-w-[44px] text-center"
            title="Reset zoom"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={zoomIn}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
          <div className="w-px h-5 bg-slate-700 mx-1" />
          <button
            onClick={toggleRotation}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Rotate"
          >
            <RotateCw size={16} />
          </button>
          <a
            href={url}
            download={fileName}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Download PDF"
          >
            <Download size={16} />
          </a>
        </div>
      </div>

      {/* PDF Canvas */}
      <div className="flex-1 overflow-auto flex items-start justify-center bg-slate-950 p-4">
        {error ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
            <p className="text-sm">Failed to load PDF</p>
            <p className="text-xs text-slate-500">{error}</p>
            <button
              onClick={onClose}
              className="mt-2 px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
                Loading PDF…
              </div>
            }
            className="flex flex-col items-center"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-2xl"
            />
          </Document>
        )}
      </div>
    </div>
  )
}
