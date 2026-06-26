import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X, SlidersHorizontal, Check, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

interface DoctorSearchPanelProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedDepartment: string
  onDepartmentChange: (value: string) => void
  departments: string[]
  resultsCount: number
  totalCount: number
}

const panelVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

const filterRowVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
}

const DEBOUNCE_MS = 300

export const DoctorSearchPanel = ({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  departments,
  resultsCount,
  totalCount,
}: DoctorSearchPanelProps) => {
  const [departmentOpen, setDepartmentOpen] = useState(false)
  const [inputValue, setInputValue] = useState(searchQuery)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  // Sync inputValue when the parent resets searchQuery externally
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  // Debounced update to parent
  const handleInputChange = (value: string) => {
    setInputValue(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onSearchChange(value)
    }, DEBOUNCE_MS)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  // Immediate clear
  const handleClear = () => {
    setInputValue('')
    if (debounceRef.current) clearTimeout(debounceRef.current)
    onSearchChange('')
  }

  const hasActiveFilters = inputValue.length > 0 || selectedDepartment !== 'All'

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto mb-10"
    >
      {/* Main search card */}
      <div className="relative backdrop-blur-xl bg-white/80 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/50 p-5 space-y-4">
        {/* Search input row */}
        <div className="relative flex items-center">
          <div className="absolute left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-blue-500/60" />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search by doctor name..."
            className="w-full pl-11 pr-10 py-3.5 bg-white/60 border border-slate-200/80 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-300"
          />
          <AnimatePresence>
            {inputValue && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                type="button"
                onClick={handleClear}
                className="absolute right-3 p-1 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-3">
          <SlidersHorizontal size={14} className="text-slate-400 shrink-0" />

          {/* Department combobox */}
          <Popover open={departmentOpen} onOpenChange={setDepartmentOpen}>
            <PopoverTrigger asChild>
              <motion.button
                type="button"
                layout
                className={cn(
                  'flex items-center justify-between gap-2 flex-1 min-w-[160px] max-w-[220px]',
                  'bg-white/60 border border-slate-200/80 rounded-lg px-3 py-2',
                  'text-sm font-medium',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50',
                  'transition-all duration-200',
                  selectedDepartment === 'All'
                    ? 'text-slate-400'
                    : 'text-slate-600',
                )}
              >
                <span className="truncate">
                  {selectedDepartment === 'All'
                    ? 'All Departments'
                    : selectedDepartment}
                </span>
                <motion.div
                  animate={{ rotate: departmentOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  <ChevronDown size={14} className="text-slate-400 shrink-0" />
                </motion.div>
              </motion.button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={6}
              className="w-[220px] p-0 rounded-xl overflow-hidden border-slate-200/80 shadow-lg"
            >
              <Command>
                <CommandInput
                  placeholder="Search department..."
                  className="h-9 text-sm"
                />
                <CommandList>
                  <CommandEmpty className="py-6 text-sm text-slate-400">
                    No department found
                  </CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value="All"
                      onSelect={() => {
                        onDepartmentChange('All')
                        setDepartmentOpen(false)
                      }}
                      className="flex items-center gap-2 py-2.5 px-3 text-sm cursor-pointer"
                    >
                      <motion.div
                        animate={{ scale: selectedDepartment === 'All' ? 1 : 0 }}
                        transition={{ duration: 0.15 }}
                        className={cn(
                          'flex items-center justify-center w-4 h-4 rounded-sm shrink-0',
                          selectedDepartment === 'All'
                            ? 'text-blue-600'
                            : 'text-transparent',
                        )}
                      >
                        <Check size={14} />
                      </motion.div>
                      <span>All Departments</span>
                    </CommandItem>
                    {departments.map((dept) => (
                      <CommandItem
                        key={dept}
                        value={dept}
                        onSelect={() => {
                          onDepartmentChange(dept)
                          setDepartmentOpen(false)
                        }}
                        className="flex items-center gap-2 py-2.5 px-3 text-sm cursor-pointer"
                      >
                        <motion.div
                          animate={{
                            scale: selectedDepartment === dept ? 1 : 0,
                          }}
                          transition={{ duration: 0.15 }}
                          className={cn(
                            'flex items-center justify-center w-4 h-4 rounded-sm shrink-0',
                            selectedDepartment === dept
                              ? 'text-blue-600'
                              : 'text-transparent',
                          )}
                        >
                          <Check size={14} />
                        </motion.div>
                        <span>{dept}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Results count */}
          <motion.span
            key={`${resultsCount}-${totalCount}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-slate-400 font-medium ml-auto"
          >
            Showing {resultsCount} of {totalCount} doctors
          </motion.span>
        </div>

        {/* Active filter badges */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              variants={filterRowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="flex flex-wrap items-center gap-2 overflow-hidden"
            >
              {inputValue && (
                <motion.span
                  layout
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200/50"
                >
                  Search: &ldquo;{inputValue}&rdquo;
                  <button
                    type="button"
                    onClick={handleClear}
                    className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                  >
                    <X size={11} />
                  </button>
                </motion.span>
              )}
              {selectedDepartment !== 'All' && (
                <motion.span
                  layout
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/50"
                >
                  {selectedDepartment}
                  <button
                    type="button"
                    onClick={() => onDepartmentChange('All')}
                    className="hover:bg-emerald-100 rounded-full p-0.5 transition-colors"
                  >
                    <X size={11} />
                  </button>
                </motion.span>
              )}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  handleClear()
                  onDepartmentChange('All')
                }}
                className="text-xs text-slate-400 hover:text-red-500 transition-colors underline underline-offset-2 ml-1"
              >
                Clear all
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
