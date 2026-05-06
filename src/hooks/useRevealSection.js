import { useEffect, useRef } from 'react'

export function useRevealSection() {
  const ref = useRef(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const items = section.querySelectorAll('[data-reveal]')

    items.forEach((el, i) => {
      const baseDelay = parseFloat(el.dataset.delay ?? i * 0.09)
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${baseDelay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${baseDelay}s`
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach(el => {
            el.style.opacity = '1'
            el.style.transform = 'none'
          })
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return ref
}
