import { useRevealSection } from '../hooks/useRevealSection'

export default function Contact() {
  const ref = useRevealSection()

  return (
    <section className="contact" id="contacto" ref={ref}>
      <div className="contact-inner">
        <p className="eyebrow" data-reveal data-delay="0">Contacto</p>
        <h2 className="contact-title" data-reveal data-delay="0.1">
          Nos interesa escucharte.
        </h2>
        <p className="contact-body" data-reveal data-delay="0.2">
          Sugerencias de funcionalidades, consejos y reportes de comportamientos
          inesperados son bienvenidos. Tu experiencia nos ayuda a construir
          la mejor versión posible de Áureo.
        </p>
        <a
          href="mailto:aureofinanzas@gmail.com"
          className="contact-email"
          data-reveal
          data-delay="0.3"
        >
          aureofinanzas@gmail.com
        </a>
      </div>
    </section>
  )
}
