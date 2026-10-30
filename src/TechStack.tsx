import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { stack } from './data'
gsap.registerPlugin(ScrollTrigger)

export default function TechStack() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width:1024px) and (prefers-reduced-motion:no-preference)', () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-tech]')
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: '+=2200', pin: true, scrub: 1, anticipatePin: 1 } })
      items.forEach((el, i) => {
        const near = i % 3 === 0, d = gsap.utils.random(0, 1.2)
        // wind: items start far off to one side, swirl through varied depth, then settle in their group
        tl.fromTo(el, { x: gsap.utils.random(-1100, 1400), y: gsap.utils.random(-500, 500), rotation: gsap.utils.random(-70, 70), rotationY: gsap.utils.random(-90, 90),
          scale: near ? gsap.utils.random(2, 3.2) : gsap.utils.random(0.3, 0.7), opacity: 0, filter: near ? 'blur(10px)' : 'blur(3px)' },
          { x: 0, y: 0, rotation: 0, rotationY: 0, scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 2.4 }, d)
      })
      tl.from('[data-group]', { opacity: 0, y: 20, stagger: 0.3, duration: 1 }, 1.8)
    })
    return () => mm.revert()
  }, { scope: root })
  return (
    <section id="stack" ref={root} className="min-h-screen px-6 md:px-14 py-24 flex flex-col justify-center overflow-hidden" style={{ perspective: 900 }}>
      <h2 className="h text-5xl md:text-7xl mb-14" data-split>Tools I build with</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
        {stack.map(g => <div key={g.title}><h3 data-group className="text-bronze border-b border-white/10 pb-3 mb-5 text-sm">{g.title}</h3>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">{g.items.map(t => <li key={t} data-tech className="font-display text-2xl md:text-3xl font-light will-change-transform">{t}</li>)}</ul></div>)}
      </div>
    </section>)
}
