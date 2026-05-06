import { useRevealSection } from '../hooks/useRevealSection'

export default function Philosophy() {
  const ref = useRevealSection()

  return (
    <section className="philosophy" ref={ref}>
      <div className="philosophy-watermark" aria-hidden="true">φ</div>

      <div className="container">
        <div className="philosophy-inner">
          <p className="eyebrow" data-reveal data-delay="0">
            Del latín <em>aureus</em> &nbsp;·&nbsp; De <em>aurum</em>: oro
          </p>

          <div className="gold-line-v" data-reveal data-delay="0.1" />

          <blockquote className="philosophy-quote" data-reveal data-delay="0.2">
            "La medida justa de<br />lo que verdaderamente<br />
            <span className="quote-highlight">vale.</span>"
          </blockquote>

          <p className="philosophy-body" data-reveal data-delay="0.35">
            Los romanos llamaban <em>aureus</em> a su moneda de oro —el estándar de todo valor real.
            Horacio celebraba la <em>aurea mediocritas</em>: ni demasiado, ni muy poco.
            La proporción áurea φ ≈ 1,618 es la medida perfecta con la que la naturaleza crece
            en armonía. Áureo es eso.
          </p>

          <div className="gold-line-h" data-reveal data-delay="0.45" />

          <div className="pillars" data-reveal data-delay="0.5">
            <div className="pillar">
              <p className="pillar-label">Aureus</p>
              <p className="pillar-title">La moneda de oro</p>
              <p className="pillar-text">
                El estándar de valor real del Imperio Romano. Símbolo de lo que verdaderamente vale.
              </p>
            </div>

            <div className="pillar-sep" />

            <div className="pillar">
              <p className="pillar-label">φ = 1,618</p>
              <p className="pillar-title">La proporción áurea</p>
              <p className="pillar-text">
                La medida perfecta que la naturaleza usa para crecer con armonía y equilibrio.
              </p>
            </div>

            <div className="pillar-sep" />

            <div className="pillar">
              <p className="pillar-label">Aurea Mediocritas</p>
              <p className="pillar-title">El justo medio</p>
              <p className="pillar-text">
                La virtud de Horacio: ni derrochador, ni avaro. La medida exacta de cada cosa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
