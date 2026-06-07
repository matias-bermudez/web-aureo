import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#" className="nav-logo">
          <img src={import.meta.env.BASE_URL + 'logo.png'} alt="Áureo" />
          <span className="nav-logo-text">ÁUREO</span>
        </a>
        <span className="nav-badge">iOS · iPhone</span>
      </div>
    </nav>
  )
}
