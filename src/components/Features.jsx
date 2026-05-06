import { useRevealSection } from '../hooks/useRevealSection'

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
    name: 'Privacidad total',
    desc: 'Tus datos nunca salen de tu celular. Sin login, sin nube, sin terceros que vean cuánto ganás o en qué gastás.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 6v1.5m0 9V18m3.5-9.5A3.5 3.5 0 0 0 8.5 10c0 1.93 1.57 3.5 3.5 3.5s3.5 1.57 3.5 3.5A3.5 3.5 0 0 1 8.5 18"/>
      </svg>
    ),
    name: 'Multi-moneda',
    desc: 'Pesos argentinos, dólares, dólar blue, MEP y 17 monedas más. Tipo de cambio en tiempo real desde dolarapi.com.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
      </svg>
    ),
    name: 'Gastos fijos',
    desc: 'Se registran solos el día del cobro. Notificaciones dos días antes y el día del vencimiento, sin abrir la app.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
        <path d="M9.5 10.5l1.5 1.5"/>
      </svg>
    ),
    name: 'Scanner con IA',
    desc: 'Fotografiá el ticket y Áureo lo categoriza. Con Apple Intelligence (iOS 26+) corre 100% en tu dispositivo.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.5 5.5L21 9l-4.5 4.5 1 6.5L12 17l-5.5 3 1-6.5L3 9l6.5-1.5L12 2z"/>
      </svg>
    ),
    name: 'Fondos de ahorro',
    desc: 'Creá metas con objetivo de monto y fecha. Visualizá el progreso, depositá desde tus cuentas y recibí notificación al alcanzar la meta.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6"/>
        <path d="M3 20h18"/>
      </svg>
    ),
    name: 'Estadísticas nativas',
    desc: 'Gráficos de barras y donut con Swift Charts. Comparativa con el período anterior, variación porcentual, gasto diario promedio.',
  },
]

export default function Features() {
  const ref = useRevealSection()

  return (
    <section className="features" id="features" ref={ref}>
      <div className="container">
        <div className="section-header">
          <p className="eyebrow" data-reveal data-delay="0">Lo esencial</p>
          <h2 className="section-title" data-reveal data-delay="0.1">
            Todo lo que necesitás.<br />
            <em>Nada que no uses.</em>
          </h2>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card"
              data-reveal
              data-delay={0.05 * i + 0.2}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-name">{f.name}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
