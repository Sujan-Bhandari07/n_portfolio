import { useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { GitBranch, Briefcase, Mail, MapPin, type LucideIcon } from 'lucide-react'
import { EMAIL, GITHUB, LINKEDIN, LOCATION } from './data'

type F = { name: string; email: string; subject: string; message: string }
const empty: F = { name: '', email: '', subject: '', message: '' }
const env = import.meta.env
export default function Contact() {
  const [f, setF] = useState<F>(empty)
  const [err, setErr] = useState<Partial<F>>({})
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'fail'>('idle')
  const [msg, setMsg] = useState('')
  const set = (k: keyof F) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (state === 'sending') return
    if ((new FormData(e.currentTarget).get('website') as string)) return // honeypot
    const v: Partial<F> = {}
    if (f.name.trim().length < 2) v.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) v.email = 'Enter a valid email address.'
    if (f.subject.trim().length < 3) v.subject = 'Add a short subject.'
    if (f.message.trim().length < 10) v.message = 'Write at least 10 characters.'
    setErr(v); if (Object.keys(v).length) return
    const [s, t, k] = [env.VITE_EMAILJS_SERVICE_ID, env.VITE_EMAILJS_TEMPLATE_ID, env.VITE_EMAILJS_PUBLIC_KEY]
    if (!s || !t || !k) { setState('fail'); setMsg('The form is not configured yet. Add the EmailJS keys to .env (see README), or email me directly.'); return }
    setState('sending')
    try {
      await emailjs.send(s, t, { from_name: f.name, reply_to: f.email, subject: f.subject, message: f.message }, { publicKey: k })
      setState('ok'); setMsg('Message sent. I will reply soon.'); setF(empty)
    } catch { setState('fail'); setMsg('Sending failed. Check your connection and try again, or email me directly.') }
  }
  const links: [LucideIcon, string, string][] = [[Mail, EMAIL, `mailto:${EMAIL}`], [GitBranch, 'GitHub', GITHUB]]
  if (LINKEDIN) links.push([Briefcase, 'LinkedIn', LINKEDIN])
  return (
    <section id="contact" className="px-6 md:px-14 py-32 grid lg:grid-cols-2 gap-16">
      <div>
        <h2 className="h text-5xl md:text-7xl" data-split>Have an interesting idea? Let's build something meaningful.</h2>
        <ul className="mt-12 space-y-4 text-mute">
          {links.map(([I, l, h]) => <li key={l}><a className="inline-flex items-center gap-3 hover:text-amber transition-colors" href={h} {...(h.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}><I size={18} />{l}</a></li>)}
          <li className="inline-flex items-center gap-3"><MapPin size={18} />{LOCATION}</li>
        </ul>
      </div>
      <form onSubmit={submit} noValidate className="space-y-6 self-end" aria-busy={state === 'sending'}>
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        {(['name', 'email', 'subject'] as const).map(k => <div key={k}><label htmlFor={k} className="text-sm text-mute capitalize">{k}</label>
          <input id={k} className="field" type={k === 'email' ? 'email' : 'text'} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} />{err[k] && <p role="alert" className="text-amber text-sm">{err[k]}</p>}</div>)}
        <div><label htmlFor="message" className="text-sm text-mute">Message</label><textarea id="message" rows={4} className="field resize-none" value={f.message} onChange={set('message')} aria-invalid={!!err.message} />{err.message && <p role="alert" className="text-amber text-sm">{err.message}</p>}</div>
        <button className="btn btn-solid disabled:opacity-60 cursor-pointer" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message'}</button>
        <p role="status" className={`text-sm ${state === 'ok' ? 'text-amber' : 'text-mute'}`}>{msg}</p>
      </form>
    </section>)
}
