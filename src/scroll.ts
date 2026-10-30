import type Lenis from 'lenis'
export const lenisRef: { current: Lenis | null } = { current: null }
export const scrollTo = (t: string | number) => {
  if (lenisRef.current) lenisRef.current.scrollTo(t, { offset: typeof t === 'string' ? -10 : 0 })
  else if (typeof t === 'number') window.scrollTo({ top: t, behavior: 'smooth' })
  else document.querySelector(t)?.scrollIntoView({ behavior: 'smooth' })
}
