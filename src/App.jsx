import { useState, useRef } from 'react'
import Gallery from './components/Gallery'
import ScratchReveal from './components/ScratchReveal'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const audioRef = useRef(null)
  const [showButton, setShowButton] = useState(true)

  const startExperience = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log('Playback failed', e))
      setShowButton(false)
    }
  }

  return (
    <div className='app-container'>
      <audio
        ref={audioRef}
        src='https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/uplifting-wedding-theme-with-piano-arpeggios-free-music-397372.mp3'
        loop
      />

      <Gallery />
      <ScratchReveal />

      <AnimatePresence>
        {showButton && (
          <motion.div
            className='start-overlay'
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className='content'>
              <h1>
                Chúc mừng vợ iu trong ngày kỷ niệm tình iu 6 tháng của chúng
                mềnh 🐳
              </h1>
              <p>Vợ iu cào màn hình để nhận quà nho 🎁</p>
              <button onClick={startExperience}>Bắt đầu thui</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .app-container {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          overflow-x: hidden;
          background-color: #000;
        }
        .start-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
        }
        .start-overlay .content h1 {
          font-family: 'Great Vibes', cursive;
          font-size: 4rem;
          color: #ffd700;
          margin-bottom: 1rem;
        }
        .start-overlay .content p {
          font-family: 'Great Vibes', serif;
          font-size: 2rem;
          margin-bottom: 2rem;
        }
        .start-overlay button {
          padding: 1rem 2rem;
          font-size: 2rem;
          font-family: 'Great Vibes', serif;
          background: transparent;
          border: 2px solid #ffd700;
          color: #ffd700;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .start-overlay button:hover {
          background: #ffd700;
          color: #000;
        }
      `}</style>
    </div>
  )
}

export default App
