import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUp, GitBranch, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import { areas, GITHUB, LINKEDIN, nav, projects, type Project } from './data'
import { scrollTo } from './scroll'

const Hero3D = lazy(() => import('./Hero3D'))
class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { bad: boolean }> {
  state = { bad: false }
  static getDerivedStateFromError() { return { bad: true } }
  render() { return this.state.bad ? this.props.fallback : this.props.children }
}
const hasGL = () => { try { return !!document.createElement('canvas').getContext('webgl2') } catch { return false } }
const fallbackBg = <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 50% at 70% 55%,#3a2a1a,#101010)' }} />

export function Magnetic({ children, className = '', ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const r = useRef<HTMLAnchorElement>(null)
  const move = (e: React.MouseEvent) => { const b = r.current!.getBoundingClientRect(); gsap.to(r.current, { x: (e.clientX - b.x - b.width / 2) * 0.25, y: (e.clientY - b.y - b.height / 2) * 0.25, duration: 0.4 }) }
  return <a ref={r} className={className} onMouseMove={move} onMouseLeave={() => gsap.to(r.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,.4)' })} {...p}>{children}</a>
}

export function Nav() {
  const [active, setActive] = useState('#home'); const [open, setOpen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive('#' + e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    nav.forEach(([, h]) => { const el = document.querySelector(h); el && io.observe(el) }); return () => io.disconnect()
  }, [])
  const go = (h: string) => (e: React.MouseEvent) => { e.preventDefault(); setOpen(false); scrollTo(h) }
  return (
    <header data-nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-14 py-5 mix-blend-normal bg-gradient-to-b from-ink/90 to-transparent">
      <a href="#home" onClick={go('#home')} className="font-display text-2xl" aria-label="Sujan Bhandari, home">SB</a>
      <nav aria-label="Primary" className={`${open ? 'flex' : 'hidden'} md:flex absolute md:static top-full inset-x-0 flex-col md:flex-row gap-5 md:gap-8 bg-ink md:bg-transparent p-6 md:p-0`}>
        {nav.map(([l, h]) => <a key={h} href={h} onClick={go(h)} aria-current={active === h ? 'true' : undefined} className={`text-sm transition-colors hover:text-amber ${active === h ? 'text-amber' : 'text-mute'} md:relative`}>{l}</a>)}
      </nav>
      <div className="flex items-center gap-4"><span className="hidden sm:flex items-center gap-2 text-xs text-mute"><i className="size-2 rounded-full bg-amber animate-pulse" />Open to work</span>
        <button className="md:hidden text-sm" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button></div>
    </header>)
}

export function Hero() {
  const gl = typeof window !== 'undefined' && window.innerWidth >= 768 && hasGL()
  return (
    <section id="home" className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0" data-hero-scene>{gl ? <Boundary fallback={fallbackBg}><Suspense fallback={fallbackBg}><Hero3D /></Suspense></Boundary> : fallbackBg}</div>
      <div className="relative z-10 px-6 md:px-14 pb-14 md:pb-20 w-full pointer-events-none">
        <p data-hero className="text-mute mb-4">Software Developer · AI Enthusiast · Creative Engineer — {'Nepal'}</p>
        <h1 className="h text-[17vw] md:text-[10.5vw]" aria-label="Sujan Bhandari"><span data-hero-line className="block overflow-hidden"><span className="block">Sujan</span></span><span data-hero-line className="block overflow-hidden"><span className="block text-amber">Bhandari</span></span></h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <p data-hero className="max-w-md text-lg text-paper/80 font-display font-light">“I'm passionate about building scalable applications, intelligent systems, and meaningful digital experiences.”</p>
          <div data-hero className="flex gap-3 pointer-events-auto">
            <Magnetic href="#projects" className="btn btn-solid" onClick={e => { e.preventDefault(); scrollTo('#projects') }}>Explore my work</Magnetic>
            <Magnetic href="#contact" className="btn" onClick={e => { e.preventDefault(); scrollTo('#contact') }}>Get in touch</Magnetic></div>
        </div>
        <div data-hero className="absolute right-6 md:right-14 top-[-5rem] hidden md:flex flex-col items-center gap-3 text-xs text-mute"><span className="[writing-mode:vertical-rl]">Scroll</span><i className="w-px h-14 bg-gradient-to-b from-amber to-transparent" /></div>
      </div>
    </section>)
}

export function About() {
  return (
    <section id="about" className="px-6 md:px-14 py-32 grid lg:grid-cols-12 gap-12">
      <h2 className="h text-5xl md:text-7xl lg:col-span-5" data-split>I like knowing how systems work under the hood.</h2>
      <div className="lg:col-span-6 lg:col-start-7 space-y-6 text-lg text-paper/80 leading-relaxed" data-reveal>
        <p>I'm Sujan Bhandari, a BCA student and software developer from Nepal. I enjoy engineering modern web applications, designing scalable backend architectures, and exploring the intersection of artificial intelligence and software engineering.</p>
        <p>My work focuses on full-stack applications, real-time systems, microservices, and AI-powered solutions. I turn complex technical ideas into practical products.</p>
        <dl className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 text-base">
          {[['Interests', 'Backend architecture, AI agents, creative frontend'], ['Approach', 'Understand the system first, then build it simply'], ['Learning', 'Continuous — every project teaches a new layer']].map(([t, d]) => <div key={t}><dt className="text-bronze text-sm">{t}</dt><dd className="mt-1 text-mute">{d}</dd></div>)}
        </dl>
      </div>
    </section>)
}

function Preview({ p }: { p: Project }) {
  const r = useRef<HTMLDivElement>(null)
  const tilt = (e: React.MouseEvent) => { const b = r.current!.getBoundingClientRect(); gsap.to(r.current, { rotateY: ((e.clientX - b.x) / b.width - 0.5) * 8, rotateX: -((e.clientY - b.y) / b.height - 0.5) * 8, duration: 0.5 }) }
  return (
    <div data-clip className="[perspective:1000px]"><div ref={r} onMouseMove={tilt} onMouseLeave={() => gsap.to(r.current, { rotateX: 0, rotateY: 0, duration: 0.8 })} className="aspect-[4/3] relative overflow-hidden border border-white/10" style={{ background: `radial-gradient(90% 80% at 20% 10%,${p.hue}55,#181818 70%)` }}>
      <span className="h absolute -left-4 -bottom-6 text-[22vw] lg:text-[11vw] opacity-90 whitespace-nowrap" style={{ color: p.hue }} aria-hidden>{p.name.split(' ')[0]}</span>
      <div className="absolute top-5 right-5 left-[38%] space-y-2" aria-hidden>{p.tech.slice(0, 6).map((t, i) => <div key={t} className="h-2 rounded-full bg-paper/20" style={{ width: `${90 - i * 11}%` }} />)}</div></div></div>)
}
export function Projects() {
  return (
    <section id="projects" className="px-6 md:px-14 py-32">
      <h2 className="h text-6xl md:text-9xl mb-24" data-split>Selected projects</h2>
      <div className="space-y-40">
        {projects.map((p, i) => (
          <article key={p.name} className="grid lg:grid-cols-12 gap-10 items-center">
            <div className={`lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}><Preview p={p} /></div>
            <div className="lg:col-span-5" data-reveal>
              <p className="text-bronze text-sm">{p.category}</p>
              <h3 className="h text-4xl md:text-6xl mt-2">{p.name}</h3>
              <p className="mt-5 text-paper/80">{p.description}</p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-mute">{p.features.map(f => <li key={f}>{f}</li>)}</ul>
              <p className="mt-5 text-sm text-amber">{p.tech.join(' · ')}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a className="btn" href={p.repo ?? GITHUB} target="_blank" rel="noopener noreferrer"><GitBranch size={16} />{p.repo ? 'Source code' : 'GitHub profile'}</a>
                {p.demo && <a className="btn btn-solid" href={p.demo} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} />Live demo</a>}</div>
            </div>
          </article>))}
      </div>
    </section>)
}

export function Engineering() {
  return (
    <section className="px-6 md:px-14 py-32" aria-labelledby="eng">
      <h2 id="eng" className="h text-5xl md:text-7xl mb-16" data-split>What I build</h2>
      {areas.map(a => (
        <div key={a.title} data-reveal className="group grid md:grid-cols-12 gap-6 py-10 border-t border-white/10 transition-colors hover:border-amber">
          <h3 className="h text-3xl md:text-5xl md:col-span-6 transition-transform duration-500 group-hover:translate-x-3">{a.title}</h3>
          <ul className="md:col-span-5 md:col-start-8 space-y-1 text-mute transition-colors group-hover:text-paper">{a.points.map(x => <li key={x}>{x}</li>)}</ul>
        </div>))}
    </section>)
}

export function Footer() {
  return (
    <footer className="px-6 md:px-14 py-10 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 text-sm text-mute">
      <div className="flex items-center gap-4"><span className="font-display text-2xl text-paper">SB</span><span>Sujan Bhandari · Software Developer</span></div>
      <div className="flex gap-5"><a className="hover:text-amber" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>{LINKEDIN && <a className="hover:text-amber" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>}</div>
      <span>© {new Date().getFullYear()} Sujan Bhandari</span>
      <button className="btn cursor-pointer" onClick={() => scrollTo(0)} aria-label="Back to top"><ArrowUp size={16} />Top</button>
    </footer>)
}
