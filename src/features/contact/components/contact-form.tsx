import { useState } from 'react'
import { AlertCircle, Send } from 'lucide-react'
import { useForm } from '@tanstack/react-form'
import { contactSchema } from '../schema'
import { useContactMutation } from '../hooks/use-contact-mutation'
import { contactPageData as data } from '@/data/contact/contact.data'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const mutation = useContactMutation({
    onSuccess: () => {
      setSubmitted(true)
      form.reset()
      setTimeout(() => setSubmitted(false), 5000)
    },
  })

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      mutation.mutate(value)
    },
  })

  return (
    <div className="p-8 md:p-12 lg:p-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
          Contact Form
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
        {data.form.title}
      </h2>
      <p className="text-slate-500 text-lg mb-10">{data.form.description}</p>

      {submitted && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in duration-300">
          <div className="bg-green-500 text-white rounded-full p-1">
            <Send size={16} />
          </div>
          <span className="font-medium">{data.form.successMessage}</span>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              {data.form.labels.name}
            </label>
            <form.Field
              name="name"
              validators={{
                onChange: contactSchema.shape.name,
              }}
              children={(field) => (
                <div className="space-y-1">
                  <input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Your Full Name"
                    className={`w-full px-5 py-4 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400 ${
                      field.state.meta.errors.length
                        ? 'border-red-500'
                        : 'border-slate-200 focus:border-blue-500'
                    }`}
                    disabled={mutation.isPending}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
                      <AlertCircle size={12} />{' '}
                      {String(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              {data.form.labels.email}
            </label>
            <form.Field
              name="email"
              validators={{
                onChange: contactSchema.shape.email,
              }}
              children={(field) => (
                <div className="space-y-1">
                  <input
                    type="email"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full px-5 py-4 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400 ${
                      field.state.meta.errors.length
                        ? 'border-red-500'
                        : 'border-slate-200 focus:border-blue-500'
                    }`}
                    disabled={mutation.isPending}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
                      <AlertCircle size={12} />{' '}
                      {String(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">
            Subject
          </label>
          <form.Field
            name="subject"
            validators={{
              onChange: contactSchema.shape.subject,
            }}
            children={(field) => (
              <div className="space-y-1">
                <select
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`w-full px-5 py-4 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-700 ${
                    field.state.meta.errors.length
                      ? 'border-red-500'
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                  disabled={mutation.isPending}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="appointment">Appointment Booking</option>
                  <option value="feedback">Patient Feedback</option>
                  <option value="other">Other</option>
                </select>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
                    <AlertCircle size={12} />{' '}
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">
            {data.form.labels.message}
          </label>
          <form.Field
            name="message"
            validators={{
              onChange: contactSchema.shape.message,
            }}
            children={(field) => (
              <div className="space-y-1">
                <textarea
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={5}
                  placeholder="How can we help you?"
                  className={`w-full px-5 py-4 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none placeholder:text-slate-400 ${
                    field.state.meta.errors.length
                      ? 'border-red-500'
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                  disabled={mutation.isPending}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
                    <AlertCircle size={12} />{' '}
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit]}
          children={([canSubmit]) => (
            <button
              type="submit"
              disabled={!canSubmit || mutation.isPending}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? 'Sending...' : data.form.labels.submit}
              {!mutation.isPending && (
                <Send
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              )}
            </button>
          )}
        />
      </form>
    </div>
  )
}
