export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-logo">
          <img src={import.meta.env.BASE_URL + 'logo.png'} alt="Áureo" />
          <span className="footer-logo-text">ÁUREO</span>
        </div>

        <p className="footer-copy">
          Finanzas personales para iOS &nbsp;·&nbsp; {year}
        </p>

      </div>
    </footer>
  )
}
