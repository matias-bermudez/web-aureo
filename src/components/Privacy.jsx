import { useRevealSection } from '../hooks/useRevealSection'

const points = [
  { label: '100% local', desc: 'Ningún dato sale de tu dispositivo. Nunca.' },
  { label: 'Sin login', desc: 'No hay cuentas de usuario. No hay emails.' },
  { label: 'Sin analytics', desc: 'Cero SDKs de terceros. Cero telemetría.' },
  { label: 'Backup propio', desc: 'Vos controlás dónde guardás tus datos.' },
]

export default function Privacy() {
  const ref = useRevealSection()

  return (
    <section className="privacy" ref={ref}>
      <div className="privacy-glow" />

      <div className="container">
        <div className="privacy-statement">
          <p className="eyebrow" data-reveal data-delay="0">Privacidad</p>
          <h2 className="privacy-title" data-reveal data-delay="0.1">
            Sin login.<br />
            Sin nube.<br />
            <span className="privacy-highlight">Sin terceros.</span>
          </h2>
          <p className="privacy-sub" data-reveal data-delay="0.25">
            Solo vos sabés cuánto tenés. Áureo no tiene servidores porque no los necesita.
          </p>
        </div>

        <div className="privacy-grid" data-reveal data-delay="0.35">
          {points.map((p, i) => (
            <div key={i} className="privacy-point">
              <div className="privacy-point-dot" />
              <div>
                <p className="privacy-point-label">{p.label}</p>
                <p className="privacy-point-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
