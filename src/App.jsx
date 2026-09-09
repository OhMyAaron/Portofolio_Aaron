import { useCallback, useState } from 'react'
import About from './components/About'
import Background from './components/Background'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import Projects from './components/Projects'
import ScrollProgress from './components/ScrollProgress'
import Stack from './components/Stack'
import ToTop from './components/ToTop'

export default function App() {
  // animasi hero baru dijalankan setelah tirai preloader terangkat
  const [ready, setReady] = useState(false)
  const handleReady = useCallback(() => setReady(true), [])

  return (
    <>
      <Preloader onDone={handleReady} />
      <Background />
      <Cursor />

      <ScrollProgress />

      <Navbar />

      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Stack />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
      <ToTop />
    </>
  )
}
