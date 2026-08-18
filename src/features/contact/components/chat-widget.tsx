import { useState, useRef, useEffect, useCallback } from 'react'
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  CheckCircle,
  ArrowLeft,
  Calendar,
  Star,
  HelpCircle,
  Stethoscope,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useContactMutation } from '../hooks/use-contact-mutation'
import { company } from '@/lib/company'
import { z } from 'zod'

type ChatStep =
  | 'greeting'
  | 'ask-name'
  | 'ask-email'
  | 'ask-phone'
  | 'ask-concern'
  | 'ask-department'
  | 'ask-patient-type'
  | 'ask-rating'
  | 'ask-age'
  | 'ask-description'
  | 'confirm'
  | 'sending'
  | 'success'

type Message = {
  role: 'bot' | 'user'
  content: string
  id: string
}

const concernOptions = [
  { value: 'general', label: 'General Inquiry', icon: HelpCircle },
  { value: 'appointment', label: 'Appointment Booking', icon: Calendar },
  { value: 'feedback', label: 'Patient Feedback', icon: Star },
  { value: 'other', label: 'Other', icon: Stethoscope },
]

const departments = [
  'General Medicine',
  'Cardiology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Neurology',
  'Ophthalmology',
  'ENT',
  'Gynecology',
  'Dentistry',
]

const validators = {
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  concern: z.string().min(1, 'Please select a concern type'),
  phone: z
    .string()
    .refine(
      (v) => v === '' || /^[\d\s\+\-\(\)]{7,20}$/.test(v),
      'Please enter a valid phone number',
    ),
  age: z
    .string()
    .refine(
      (v) => {
        if (v === '') return true
        return /^\d{1,3}$/.test(v) && Number(v) >= 1 && Number(v) <= 150
      },
      'Please enter a valid age (1-150)',
    ),
  description: z.string().min(10, 'Please describe your concern (min 10 characters)'),
}

const STORAGE_KEY = 'park-clinic-chat-state'
type ChatStorageState = {
  formData: {
    name: string
    email: string
    phone: string
    concern: string
    department: string
    patientType: string
    rating: string
    age: string
    description: string
  }
  step: ChatStep
  messages: Message[]
}

function saveChatState(state: ChatStorageState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage might be full or unavailable
  }
}

function loadChatState(): ChatStorageState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function clearChatState(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore storage errors on cleanup
  }
}

let msgIdCounter = 0
function initMsgIdCounter(savedMessages?: Message[]) {
  if (savedMessages && savedMessages.length > 0 && msgIdCounter === 0) {
    const maxId = savedMessages.reduce((max, m) => {
      const num = parseInt(m.id.replace('msg-', ''), 10)
      return isNaN(num) ? max : Math.max(max, num)
    }, 0)
    msgIdCounter = maxId
  }
}
function nextMsgId() {
  return `msg-${++msgIdCounter}`
}

export default function ChatWidget() {
  const savedState = useRef(loadChatState()).current
  // Initialize message counter to avoid duplicate keys with restored messages
  useRef(initMsgIdCounter(savedState?.messages))

  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<ChatStep>(savedState?.step ?? 'greeting')
  const [messages, setMessages] = useState<Message[]>(savedState?.messages ?? [])
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState<string | null>(null)
  const [formData, setFormData] = useState(
    savedState?.formData ?? {
      name: '',
      email: '',
      phone: '',
      concern: '',
      department: '',
      patientType: '',
      rating: '',
      age: '',
      description: '',
    },
  )

  const chatBodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const botTypingRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const formDataRef = useRef(formData)
  formDataRef.current = formData

  const mutation = useContactMutation()

  const [isSending, setIsSending] = useState(false)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      requestAnimationFrame(() => {
        chatBodyRef.current!.scrollTop = chatBodyRef.current!.scrollHeight
      })
    }
  }, [messages, step])

  // Focus input when entering a new step that needs text input
  useEffect(() => {
    if (
      open &&
      inputRef.current &&
      step !== 'greeting' &&
      step !== 'ask-concern' &&
      step !== 'ask-department' &&
      step !== 'ask-patient-type' &&
      step !== 'ask-rating' &&
      step !== 'confirm' &&
      step !== 'sending' &&
      step !== 'success'
    ) {
      inputRef.current.focus()
    }
  }, [step, open])

  // Persist chat state to sessionStorage (survives page redirects, errors)
  useEffect(() => {
    if (step !== 'greeting' && step !== 'success') {
      saveChatState({ formData, step, messages })
    }
  }, [formData, step, messages])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
      if (botTypingRef.current) clearTimeout(botTypingRef.current)
    }
  }, [])

  const addBotMessage = useCallback((content: string) => {
    setMessages((prev) => [...prev, { role: 'bot', content, id: nextMsgId() }])
  }, [])

  const addUserMessage = useCallback((content: string) => {
    setMessages((prev) => [...prev, { role: 'user', content, id: nextMsgId() }])
  }, [])

  const advanceStep = useCallback(
    (nextStep: ChatStep, botMessage: string, delay = 500) => {
      setTimeout(() => {
        addBotMessage(botMessage)
        setStep(nextStep)
      }, delay)
    },
    [addBotMessage],
  )

  const startConversation = () => {
    addBotMessage("Let's start! What's your full name?")
    setStep('ask-name')
  }

  const handleInputSubmit = () => {
    setInputError(null)

    switch (step) {
      case 'ask-name': {
        const result = validators.name.safeParse(inputValue.trim())
        if (!result.success) {
          setInputError(result.error.issues[0].message)
          return
        }
        const name = result.data
        addUserMessage(name)
        setFormData((prev) => ({ ...prev, name }))
        setInputValue('')
        advanceStep(
          'ask-email',
          `Nice to meet you, ${name.split(' ')[0]}! What's your email address?`,
        )
        break
      }

      case 'ask-email': {
        const result = validators.email.safeParse(inputValue.trim())
        if (!result.success) {
          setInputError(result.error.issues[0].message)
          return
        }
        const email = result.data
        addUserMessage(email)
        setFormData((prev) => ({ ...prev, email }))
        setInputValue('')
        advanceStep(
          'ask-phone',
          `Thanks! Would you like to share your phone number? (optional)`,
        )
        break
      }

      case 'ask-phone': {
        const phone = inputValue.trim()
        const result = validators.phone.safeParse(phone)
        if (!result.success) {
          setInputError(result.error.issues[0].message)
          return
        }
        const displayPhone = phone || 'Not provided'
        addUserMessage(displayPhone)
        setFormData((prev) => ({ ...prev, phone }))
        setInputValue('')
        advanceStep('ask-concern', 'Great! How can we help you today?')
        break
      }

      case 'ask-age': {
        const result = validators.age.safeParse(inputValue.trim())
        if (!result.success) {
          setInputError(result.error.issues[0].message)
          return
        }
        const age = result.data
        addUserMessage(age ? `${age} years` : 'Not provided')
        setFormData((prev) => ({ ...prev, age }))
        setInputValue('')
        advanceStep(
          'ask-description',
          'Thank you. Please describe your concern in detail so we can assist you better.',
        )
        break
      }

      case 'ask-description': {
        const result = validators.description.safeParse(inputValue.trim())
        if (!result.success) {
          setInputError(result.error.issues[0].message)
          return
        }
        const description = result.data
        addUserMessage(description)
        setFormData((prev) => ({ ...prev, description }))
        setInputValue('')
        setTimeout(() => {
          const d = formDataRef.current
          addBotMessage(
            `Perfect! Here's a summary of your request:\n\n` +
              `**Name:** ${d.name}\n` +
              `**Email:** ${d.email}\n` +
              (d.phone ? `**Phone:** ${d.phone}\n` : '') +
              `**Concern:** ${concernOptions.find((c) => c.value === d.concern)?.label || d.concern}\n` +
              (d.department ? `**Department:** ${d.department}\n` : '') +
              (d.patientType ? `**Patient Type:** ${d.patientType}\n` : '') +
              (d.rating ? `**Rating:** ${d.rating}/5\n` : '') +
              (d.age ? `**Age:** ${d.age}\n` : '') +
              `**Description:** ${description}\n\n` +
              `Would you like to send this to our team?`,
          )
          setStep('confirm')
        }, 500)
        break
      }
    }
  }

  const handleSkipPhone = () => {
    addUserMessage('Not provided')
    setFormData((prev) => ({ ...prev, phone: '' }))
    setInputValue('')
    setInputError(null)
    advanceStep('ask-concern', 'Great! How can we help you today?', 300)
  }

  const handleSkipAge = () => {
    addUserMessage('Not provided')
    setFormData((prev) => ({ ...prev, age: '' }))
    setInputValue('')
    setInputError(null)
    advanceStep(
      'ask-description',
      'Thank you. Please describe your concern in detail so we can assist you better.',
      300,
    )
  }

  const handleConcernSelect = (value: string) => {
    setInputError(null)
    const result = validators.concern.safeParse(value)
    if (!result.success) {
      setInputError(result.error.issues[0].message)
      return
    }
    const label = concernOptions.find((c) => c.value === value)?.label || value
    addUserMessage(label)
    setFormData((prev) => ({ ...prev, concern: value }))

    // Ask subject-specific follow-up questions
    setTimeout(() => {
      switch (value) {
        case 'appointment':
          addBotMessage(
            'Are you a **new patient** or a **returning patient**?',
          )
          setStep('ask-patient-type')
          break
        case 'feedback':
          addBotMessage(
            'Which department did you visit? We value your feedback!',
          )
          setStep('ask-department')
          break
        case 'general':
          addBotMessage(
            'Which department is your inquiry related to?',
          )
          setStep('ask-department')
          break
        default:
          addBotMessage('Thanks! What is your age? (optional)')
          setStep('ask-age')
      }
    }, 500)
  }

  const handleDepartmentSelect = (dept: string) => {
    addUserMessage(dept)
    setFormData((prev) => ({ ...prev, department: dept }))

    setTimeout(() => {
      if (formDataRef.current.concern === 'feedback') {
        addBotMessage(
          'How would you rate your experience? (1 = Poor, 5 = Excellent)',
        )
        setStep('ask-rating')
      } else {
        addBotMessage('Thanks! What is your age? (optional)')
        setStep('ask-age')
      }
    }, 500)
  }

  const handlePatientTypeSelect = (type: string) => {
    addUserMessage(type)
    setFormData((prev) => ({ ...prev, patientType: type }))

    setTimeout(() => {
      addBotMessage('Which department would you like to visit?')
      setStep('ask-department')
    }, 500)
  }

  const handleRatingSelect = (rating: number) => {
    const labels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
    addUserMessage(`${rating}/5 - ${labels[rating - 1]}`)
    setFormData((prev) => ({ ...prev, rating: String(rating) }))

    setTimeout(() => {
      addBotMessage('Thanks! What is your age? (optional)')
      setStep('ask-age')
    }, 500)
  }

  const handleSend = async () => {
    if (!formData.name || !formData.email || !formData.description) {
      // Safety check — should never happen since validation blocks submission
      addBotMessage('⚠️ Something went wrong. Please try starting a new conversation.')
      setStep('confirm')
      return
    }

    setStep('sending')
    setIsSending(true)
    try {
      // Build the message body from collected form data
      const parts: (string | null)[] = [
        `Name: ${formData.name}`,
        `Phone: ${formData.phone || 'Not provided'}`,
        `Age: ${formData.age || 'Not provided'}`,
        formData.department ? `Department: ${formData.department}` : null,
        formData.patientType ? `Patient Type: ${formData.patientType}` : null,
        formData.rating ? `Rating: ${formData.rating}/5` : null,
      ]

      const detailLines = parts.filter((p): p is string => p !== null).join('\n')
      const message = [detailLines, formData.description].filter(Boolean).join('\n\n')

      await mutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        subject: formData.concern || 'general',
        phone: formData.phone || undefined,
        message,
      } as any)

      clearChatState()
      setIsSending(false)
      setStep('success')
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: `Thank you for reaching out to ${company.shortName}. A member of our team will get back to you at your provided email within 24 hours. Have a healthy day! 🌟`,
          id: nextMsgId(),
        },
      ])
      setTimeout(() => {
        handleOpenChange(false)
      }, 5000)
    } catch (err) {
      console.error('Chat submission failed:', err)
      setIsSending(false)
      setStep('confirm')
      addBotMessage('⚠️ Failed to send your message. Please check your details and try again.')
      // Keep state in storage on error so user can retry later
    }
  }

  const handleGoBack = () => {
    setInputError(null)
    switch (step) {
      case 'ask-email':
        setStep('ask-name')
        setInputValue(formData.name)
        break
      case 'ask-phone':
        setStep('ask-email')
        setInputValue(formData.email)
        break
      case 'ask-concern':
        setStep('ask-phone')
        setInputValue(formData.phone)
        break
      case 'ask-department':
        if (formData.concern === 'appointment') {
          setStep('ask-patient-type')
        } else {
          setStep('ask-concern')
        }
        break
      case 'ask-patient-type':
        setStep('ask-concern')
        break
      case 'ask-rating':
        setStep('ask-department')
        break
      case 'ask-age':
        if (formData.concern === 'other') {
          setStep('ask-concern')
        } else if (formData.concern === 'feedback') {
          setStep('ask-rating')
        } else {
          setStep('ask-department')
        }
        break
      case 'ask-description':
        setStep('ask-age')
        setInputValue(formData.age)
        break
    }
  }

  const clearChat = useCallback(() => {
    clearChatState()
    setStep('greeting')
    setMessages([])
    setInputValue('')
    setInputError(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      concern: '',
      department: '',
      patientType: '',
      rating: '',
      age: '',
      description: '',
    })
  }, [])

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen && closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleInputSubmit()
    }
  }

  // Determine if current step needs text input
  const needsTextInput =
    step === 'ask-name' ||
    step === 'ask-email' ||
    step === 'ask-phone' ||
    step === 'ask-age' ||
    step === 'ask-description'

  const inputPlaceholder = (() => {
    switch (step) {
      case 'ask-name':
        return 'e.g. John Doe'
      case 'ask-email':
        return 'e.g. john@email.com'
      case 'ask-phone':
        return '+1 555-123-4567'
      case 'ask-age':
        return 'e.g. 35'
      case 'ask-description':
        return 'Describe your concern in detail...'
      default:
        return 'Type your response...'
    }
  })()

  const canGoBack =
    step === 'ask-email' ||
    step === 'ask-phone' ||
    step === 'ask-concern' ||
    step === 'ask-department' ||
    step === 'ask-patient-type' ||
    step === 'ask-rating' ||
    step === 'ask-age' ||
    step === 'ask-description'

  const backLabel = (() => {
    switch (step) {
      case 'ask-department':
        return formData.concern === 'appointment'
          ? 'Back to patient type'
          : 'Back to concern'
      case 'ask-patient-type':
        return 'Back to concern'
      case 'ask-rating':
        return 'Back to department'
      case 'ask-age':
        return formData.concern === 'feedback'
          ? 'Back to rating'
          : 'Back to department'
      default:
        return 'Back'
    }
  })()

  return (
    <>
      {/* Chat Bubble Trigger */}
      <button
        id="chat-widget-trigger"
        onClick={() => handleOpenChange(true)}
        aria-label="Open chat"
        className="fixed bottom-24 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 group shadow-blue-600/25"
      >
        <MessageCircle size={24} className="group-hover:animate-bounce" />
      </button>

      {/* Chat Dialog */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-36 right-8 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            style={{ maxHeight: 'min(600px, calc(100vh - 10rem))' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-1.5">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                    {company.shortName} Chat
                    {step !== 'greeting' && step !== 'success' && (
                      <button
                        onClick={clearChat}
                        aria-label="Start new conversation"
                        className="text-[10px] bg-white/15 hover:bg-white/25 text-white/80 px-2 py-0.5 rounded-md transition-colors"
                      >
                        New
                      </button>
                    )}
                  </h3>
                  <p className="text-blue-100 text-xs">
                    We typically reply in minutes
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleOpenChange(false)}
                aria-label="Close chat"
                className="text-white/80 hover:text-white cursor-pointer transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Body */}
            <div
              ref={chatBodyRef}
              className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scroll-smooth"
            >
              {/* Greeting step */}
              {step === 'greeting' && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-3"
                >
                  <div className="bg-blue-100 rounded-full p-2 h-fit shrink-0">
                    <Bot size={18} className="text-blue-600" />
                  </div>
                  <div className="bg-slate-50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-slate-800 text-sm leading-relaxed">
                      👋 <strong>Hello!</strong> Welcome to{' '}
                      <strong>{company.name}</strong>.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed mt-2">
                      We're here to help. Let's get started — I'll ask you a few
                      quick questions to connect you with the right team member.
                    </p>
                    <button
                      onClick={startConversation}
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm shadow-blue-600/20 hover:shadow-md active:scale-[0.98]"
                    >
                      Start Conversation
                      <Sparkles size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Accumulated chat messages */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.role === 'bot' && (
                    <div className="bg-blue-100 rounded-full p-2 h-fit shrink-0">
                      <Bot size={18} className="text-blue-600" />
                    </div>
                  )}
                  {msg.role === 'bot' && msg.content.includes('**') ? (
                    <div
                      className="bg-slate-50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] text-sm leading-relaxed whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: msg.content.replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong>$1</strong>',
                        ),
                      }}
                    />
                  ) : (
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[80%] text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'bot'
                          ? 'bg-slate-50 rounded-tl-sm text-slate-700'
                          : 'bg-blue-600 text-white rounded-tr-sm'
                      }`}
                    >
                      {msg.content}
                      {msg.role === 'user' && (
                        <div className="flex items-center gap-1.5 mt-1 opacity-70">
                          <User size={12} />
                          <span className="text-[11px]">You</span>
                        </div>
                      )}
                    </div>
                  )}
                  {msg.role === 'user' && (
                    <div className="bg-blue-100 rounded-full p-2 h-fit shrink-0 self-end">
                      <User size={18} className="text-blue-600" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Concern selection */}
              {step === 'ask-concern' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="bg-blue-100 rounded-full p-2 h-fit shrink-0">
                    <Bot size={18} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-500 mb-2 ml-1">
                      Select your concern type:
                    </p>
                    <div className="space-y-1.5">
                      {concernOptions.map((opt) => {
                        const Icon = opt.icon
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleConcernSelect(opt.value)}
                            className="w-full flex items-center gap-3 bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 text-sm py-2.5 px-4 rounded-xl transition-all cursor-pointer active:scale-[0.98]"
                          >
                            <Icon size={16} className="text-blue-500 shrink-0" />
                            <span>{opt.label}</span>
                          </button>
                        )
                      })}
                    </div>
                    {inputError && (
                      <p className="text-red-500 text-xs mt-2 ml-1">
                        {inputError}
                      </p>
                    )}
                    <button
                      onClick={handleGoBack}
                      className="mt-3 flex items-center gap-1 text-slate-400 hover:text-slate-600 text-xs transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      Back to phone
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Department selection (for general, appointment, feedback) */}
              {step === 'ask-department' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="bg-blue-100 rounded-full p-2 h-fit shrink-0">
                    <Bot size={18} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-500 mb-2 ml-1">
                      Select a department:
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
                      {departments.map((dept) => (
                        <button
                          key={dept}
                          onClick={() => handleDepartmentSelect(dept)}
                          className="text-left bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 text-sm py-2 px-3 rounded-xl transition-all cursor-pointer active:scale-[0.98]"
                        >
                          {dept}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleGoBack}
                      className="mt-3 flex items-center gap-1 text-slate-400 hover:text-slate-600 text-xs transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      {backLabel}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Patient type selection (for appointment) */}
              {step === 'ask-patient-type' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="bg-blue-100 rounded-full p-2 h-fit shrink-0">
                    <Bot size={18} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePatientTypeSelect('New Patient')}
                        className="flex-1 bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 text-sm py-3 px-4 rounded-xl transition-all cursor-pointer active:scale-[0.98] font-semibold"
                      >
                        🆕 New Patient
                      </button>
                      <button
                        onClick={() => handlePatientTypeSelect('Returning Patient')}
                        className="flex-1 bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 text-sm py-3 px-4 rounded-xl transition-all cursor-pointer active:scale-[0.98] font-semibold"
                      >
                        🔄 Returning Patient
                      </button>
                    </div>
                    <button
                      onClick={handleGoBack}
                      className="mt-3 flex items-center gap-1 text-slate-400 hover:text-slate-600 text-xs transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      Back to concern
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Rating selection (for feedback) */}
              {step === 'ask-rating' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="bg-blue-100 rounded-full p-2 h-fit shrink-0">
                    <Bot size={18} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-500 mb-2 ml-1">
                      Rate your experience:
                    </p>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          onClick={() => handleRatingSelect(n)}
                          className="flex-1 flex flex-col items-center gap-1 bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-600 py-3 rounded-xl transition-all cursor-pointer active:scale-[0.95]"
                        >
                          <Star
                            size={20}
                            className="text-blue-400 fill-blue-400"
                          />
                          <span className="text-xs font-medium">{n}</span>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleGoBack}
                      className="mt-3 flex items-center gap-1 text-slate-400 hover:text-slate-600 text-xs transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      Back to department
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Confirm & Send */}
              {step === 'confirm' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="bg-blue-100 rounded-full p-2 h-fit shrink-0">
                    <Bot size={18} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <button
                      onClick={handleSend}
                      disabled={isSending}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm shadow-blue-600/20 hover:shadow-md active:scale-[0.98]"
                    >
                      {isSending ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          Send Message
                          <Send size={16} />
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setStep('ask-description')
                        setInputValue(formData.description)
                      }}
                      className="w-full text-center text-slate-500 hover:text-slate-700 text-xs mt-2 cursor-pointer transition-colors"
                    >
                      Edit my response
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Sending indicator */}
              {step === 'sending' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="bg-blue-100 rounded-full p-2 h-fit shrink-0">
                    <Bot size={18} className="text-blue-600" />
                  </div>
                  <div className="bg-slate-50 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-blue-600"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span className="text-sm text-slate-600">
                        Sending your message...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Success celebration */}
              {step === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-center"
                >
                  <div className="bg-blue-50 rounded-2xl px-5 py-4 border border-blue-100 text-center max-w-[90%]">
                    <div className="flex justify-center mb-2">
                      <div className="bg-blue-100 rounded-full p-2">
                        <CheckCircle size={24} className="text-blue-600" />
                      </div>
                    </div>
                    <p className="text-blue-800 font-semibold text-sm">
                      Message Sent Successfully! ✅
                    </p>
                    <p className="text-blue-600 text-xs mt-1">
                      This chat will close shortly.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input area */}
            {needsTextInput && (
              <div className="border-t border-slate-100 px-4 py-3 bg-white shrink-0">
                <div className="flex items-center gap-2">
                  {canGoBack && (
                    <button
                      onClick={handleGoBack}
                      aria-label="Go back"
                      className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors shrink-0"
                    >
                      <ArrowLeft size={18} />
                    </button>
                  )}
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type={
                        step === 'ask-email'
                          ? 'email'
                          : step === 'ask-age'
                            ? 'number'
                            : 'text'
                      }
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value)
                        if (inputError) setInputError(null)
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder={inputPlaceholder}
                      disabled={isSending}
                      className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400 ${
                        inputError
                          ? 'border-red-400'
                          : 'border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {inputError && (
                      <p className="text-red-500 text-[11px] mt-1 absolute -bottom-5 left-1">
                        {inputError}
                      </p>
                    )}
                  </div>
                  {(step === 'ask-phone' || step === 'ask-age') && (
                    <button
                      onClick={
                        step === 'ask-phone' ? handleSkipPhone : handleSkipAge
                      }
                      className="text-blue-600 hover:text-blue-700 text-xs font-medium cursor-pointer transition-colors shrink-0 px-1"
                    >
                      Skip
                    </button>
                  )}
                  <button
                    onClick={handleInputSubmit}
                    disabled={!inputValue.trim() || isSending}
                    aria-label="Send response"
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white p-2.5 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed shrink-0 active:scale-[0.95]"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-slate-100 px-5 py-2.5 bg-slate-50/50 shrink-0">
              <p className="text-[11px] text-slate-400 text-center">
                We respect your privacy. Your information is kept confidential.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
