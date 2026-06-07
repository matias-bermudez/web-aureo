import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Philosophy from './components/Philosophy.jsx'
import Features from './components/Features.jsx'
import Privacy from './components/Privacy.jsx'
import Cta from './components/Cta.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function GrainOverlay() {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    const img = ctx.createImageData(256, 256)
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255
      img.data[i] = v
      img.data[i + 1] = v
      img.data[i + 2] = v
      img.data[i + 3] = 18
    }
    ctx.putImageData(img, 0, 0)
    document.documentElement.style.setProperty('--grain', `url(${canvas.toDataURL()})`)
  }, [])
  return null
}

export default function App() {
  return (
    <>
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Features />
        <Privacy />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
