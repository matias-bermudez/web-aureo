export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      <img src="/logo.png" alt="Áureo" className="hero-logo" />

      <h1 className="hero-title">ÁUREO</h1>

      <p className="hero-tagline">El valor exacto de lo que tenés.</p>

      <p className="hero-sub">
        App de finanzas personales &nbsp;·&nbsp; iOS &nbsp;·&nbsp;
        Sin servidores &nbsp;·&nbsp; Sin suscripciones
      </p>

      <a href="#features" className="hero-cta">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v8M8 12l4 4 4-4"/>
        </svg>
        Descubrí la app
      </a>

      <div className="hero-scroll-indicator">
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
