import React, { useRef, useEffect, useState } from 'react'
import coverImg from '../assets/starry_night.png'

const ScratchReveal = ({ onComplete }) => {
  const canvasRef = useRef(null)
  const fxCanvasRef = useRef(null) // New canvas for particles
  const containerRef = useRef(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const particles = useRef([]) // Store particles
  const animationFrameId = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const fxCanvas = fxCanvasRef.current
    if (!canvas || !fxCanvas) return

    const ctx = canvas.getContext('2d')
    const fxCtx = fxCanvas.getContext('2d')

    const image = new Image()
    image.src = coverImg

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      fxCanvas.width = window.innerWidth
      fxCanvas.height = window.innerHeight

      // Redraw image to cover (cover fit)
      const ratio = Math.max(
        canvas.width / image.width,
        canvas.height / image.height
      )
      const x = (canvas.width - image.width * ratio) / 2
      const y = (canvas.height - image.height * ratio) / 2

      // Only redraw cover if not revealed mostly (optimization could be added here)
      // For now we assume resize resets or maintains best effort
      ctx.globalCompositeOperation = 'source-over'
      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        x,
        y,
        image.width * ratio,
        image.height * ratio
      )
      ctx.globalCompositeOperation = 'destination-out' // Prepare for scratching
    }

    image.onload = () => {
      handleResize()
      setLoaded(true)
      window.addEventListener('resize', handleResize)
    }

    // Particle Animation Loop
    const renderParticles = () => {
      fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02
        p.alpha -= 0.02

        if (p.life <= 0) {
          particles.current.splice(i, 1)
          i--
          continue
        }

        fxCtx.globalCompositeOperation = 'lighter'
        fxCtx.beginPath()
        fxCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        fxCtx.fillStyle = `rgba(${p.color}, ${p.alpha})`
        fxCtx.fill()
      }

      animationFrameId.current = requestAnimationFrame(renderParticles)
    }
    renderParticles()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId.current)
    }
  }, [])

  const createParticles = (x, y) => {
    // Spawn particles
    const particleCount = 5
    const colors = ['255, 215, 0', '255, 255, 255', '135, 206, 250'] // Gold, White, SkyBlue

    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1.0,
        alpha: 1.0,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
  }

  const handleScratch = (e) => {
    if (isRevealed || !loaded) return // Wait for load
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()

    let clientX, clientY
    if (e.changedTouches) {
      // Mobile
      clientX = e.changedTouches[0].clientX
      clientY = e.changedTouches[0].clientY
      e.preventDefault() // Prevent scrolling while scratching
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const x = clientX - rect.left
    const y = clientY - rect.top

    // 1. Scratch Effect
    const radius = 30
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()

    // 2. Particle Effect
    createParticles(clientX, clientY)

    checkReveal()
  }

  // Debounced check for performance
  const checkReveal = () => {
    if (Math.random() > 0.1) return // Check only 10% of the time

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const data = ctx.getImageData(0, 0, w, h).data
    let transparent = 0

    for (let i = 0; i < data.length; i += 400) {
      if (data[i + 3] === 0) transparent++
    }
    const totalPixelsToCheck = data.length / 400
    const percentage = transparent / totalPixelsToCheck

    if (percentage > 0.6) {
      setIsRevealed(true)
      if (onComplete) onComplete()
    }
  }

  return (
    <div
      ref={containerRef}
      className={`scratch-container ${isRevealed ? 'revealed' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 50,
        pointerEvents: isRevealed ? 'none' : 'auto',
        transition: 'opacity 1s ease'
      }}
    >
      {/* Scratch Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />

      {/* Visual Effects Canvas (Particles) - Layered on top, ignores pointer events to let hits pass to scratch canvas if needed, but here we capture events on container or top canvas. 
          Actually, we can put events on the Top canvas (FX) and pass coords to bottom, OR just put events on the Container. 
          Let's keep events on the Scratch Canvas (bottom) and make FX canvas pointer-events: none.
      */}
      <canvas
        ref={fxCanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      />

      {/* Interaction Layer - We need to capture events somewhere. 
           If FX canvas is on top with pointer-events: none, the scratch canvas gets them.
           This is correct.
       */}

      {/* Invisible Event overlay if needed, but canvasRef works fine */}
      <div
        className='interaction-layer'
        onMouseMove={handleScratch}
        onTouchMove={handleScratch}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          cursor: 'none' // Hide default cursor for immersive effect
        }}
      />

      {!loaded && <div className='loading'>Loading...</div>}

      <style>{`
        .scratch-container.revealed {
          opacity: 0;
        }
        .loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-family: 'Cinzel', serif;
        }
      `}</style>
    </div>
  )
}

export default ScratchReveal
