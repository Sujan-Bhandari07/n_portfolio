import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import { About, Engineering, Footer, Hero, Nav, Projects } from './sections'
import TechStack from './TechStack'
import Contact from './Contact'
import { lenisRef } from './scroll'
gsap.registerPlugin(ScrollTrigger, useGSAP)

const split = (el: HTMLElement) => {
  if (el.dataset.done) return; el.dataset.done = '1'
  const t = el.textContent ?? ''; el.setAttribute('aria-label', t)
  el.innerHTML = t.split(' ').map(w => `<span class="w" aria-hidden="true"><span>${w}</span></span>`).join(' ')
}
export default function App() {
  const root = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion:no-preference)', () => {
      // single smooth-scroll engine: Lenis driven by the GSAP ticker
      const lenis = new Lenis({ lerp: 0.1 }); lenisRef.current = lenis
      lenis.on('scroll', ScrollTrigger.update)
      const tick = (t: number) => lenis.raf(t * 1000); gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0)
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('[data-nav]', { yPercent: -100, duration: 1 })
        .from('[data-hero-line]>span', { yPercent: 110, duration: 1.4, stagger: 0.12 }, 0.2)
        .from('[data-hero]', { opacity: 0, y: 24, duration: 1, stagger: 0.12 }, 0.8)
      gsap.to('[data-hero-scene]', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.utils.toArray<HTMLElement>('[data-split]').forEach(el => { split(el)
        gsap.from(el.querySelectorAll('.w>span'), { yPercent: 110, duration: 1.1, stagger: 0.04, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }) })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => gsap.from(el, { opacity: 0, y: 30, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }))
      gsap.utils.toArray<HTMLElement>('[data-clip]').forEach(el => {
        gsap.from(el, { clipPath: 'inset(0 0 100% 0)', duration: 1.4, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
        gsap.from(el.firstElementChild, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: el, scrub: true } }) })
      return () => { gsap.ticker.remove(tick); lenis.destroy(); lenisRef.current = null }
    })
    return () => mm.revert()
  }, { scope: root })
  return (<div ref={root}><a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:z-[70] focus:p-3 focus:bg-amber focus:text-ink">Skip to content</a><Nav /><main><Hero /><About /><Projects /><TechStack /><Engineering /><Contact /></main><Footer /></div>)
}
