import { useState } from 'react'
import confetti from 'canvas-confetti'

// Use the cover image as the card back
import cardBackPattern from '../assets/starry_night.png'
import sunflowersPattern from '../assets/vangogh_sunflowers.png'
import cafePattern from '../assets/vangogh_cafe.png'
import almondPattern from '../assets/vangogh_almond.png'
import wheatPattern from '../assets/vangogh_wheat.png'
import irisesPattern from '../assets/vangogh_irises.png'

const patterns = [
  cardBackPattern,
  sunflowersPattern,
  cafePattern,
  almondPattern,
  wheatPattern,
  irisesPattern
]

// Duplicate for filler
const images = [
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/14754E1F-4691-4986-8518-B798E5D05D18.JPG',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/4E77AA31-3D13-4176-B0C9-BE1BD5975ADA.JPG',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/9e0465a2620dc904cc612aabbedfe2e1.JPEG',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/AC188FC0-1992-404C-8840-6AD1E8C1D9FE.JPG',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/att.Xsk9DQM5ke6kbCEcd-6abc8MbWWyIunzgTTzVAYjfm8.JPG',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/att.YCLRtb_FZ0XIWu8qHedx2YIbChaKWqcSZWZmYupZEv0.JPG',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/IMG_0294.png',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/IMG_0305.png',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/IMG_0325.png',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/IMG_0345.png',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/IMG_0391.png',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/IMG_0680.png',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/IMG_2492.JPG',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/IMG_2706.JPG',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/IMG_2708.JPG',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/IMG_4227.JPG',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/IMG_4229.JPG',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/IMG_4943.JPG',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/IMG_9544.png',
  'https://6-months-anniversary.s3.ap-southeast-2.amazonaws.com/IMG_9545.png'
]

const Gallery = () => {
  const [flippedIndices, setFlippedIndices] = useState(new Set())

  // Stable random patterns for each card
  const [cardPatterns] = useState(() => {
    return images.map(
      () => patterns[Math.floor(Math.random() * patterns.length)]
    )
  })

  // Use state initializer for stable random values matching lint requirements
  const [particles] = useState(() => {
    return [...Array(25)].map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 100 + 50}px`,
        height: `${Math.random() * 100 + 50}px`,
        animationDelay: `-${Math.random() * 20}s`,
        animationDuration: `${Math.random() * 20 + 20}s`
      }
    }))
  })

  const handleCardClick = (index) => {
    setFlippedIndices((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)

        // Celebration trigger
        if (newSet.size === images.length) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          })
        }
      }
      return newSet
    })
  }

  return (
    <div className='gallery-container'>
      <div className='bg-effects'>
        {particles.map((p) => (
          <span key={p.id} style={p.style} />
        ))}
      </div>
      <h2 className='gallery-title'>Vợ iu thiệc là xinh đẹp 🥰</h2>

      <div className='masonry-grid'>
        {images.map((src, index) => {
          const isFlipped = flippedIndices.has(index)
          return (
            <div
              key={index}
              className={`flip-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className='flip-card-inner'>
                {/* Front (Cover - Absolute) */}
                <div className='flip-card-front'>
                  <div
                    className='card-pattern'
                    style={{ backgroundImage: `url(${cardPatterns[index]})` }}
                  ></div>
                  <span className='click-hint'>Bấm dô để xiêm</span>
                </div>
                {/* Back (Image - Relative/Flow) */}
                <div className='flip-card-back'>
                  <img src={src} alt={`Memory ${index + 1}`} loading='lazy' />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        .gallery-container {
          padding: 4rem 2rem;
          background: linear-gradient(-45deg, #fffaf0, #f0f8ff, #fff0f5, #f5f5dc);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
          min-height: 100vh;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .bg-effects {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        .bg-effects span {
          position: absolute;
          display: block;
          background: rgba(255, 255, 255, 0.7); 
          border-radius: 50%;
          bottom: -200px;
          animation: floatUp linear infinite;
          filter: blur(10px);
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.9; } 
          80% { opacity: 0.9; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
        .gallery-title {
          position: relative;
          z-index: 1;
          font-family: 'Great Vibes', cursive;
          font-size: 4rem;
          color: #4a4a4a;
          margin-bottom: 2rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        .masonry-grid {
          column-count: 4; 
          column-gap: 1.5rem;
          position: relative;
          z-index: 1;
        }
        
        /* Flip Card Styles */
        .flip-card {
          break-inside: avoid;
          margin-bottom: 1.5rem;
          background-color: transparent;
          perspective: 1000px; /* Enable 3D effect */
          cursor: pointer;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          border-radius: 12px;
        }
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          width: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          overflow: hidden;
        }
        .flip-card-front {
          background-color: #242424;
          display: flex;
          align-items: center;
          justify-content: center;
          
          /* Absolute position to cover the Back (which dictates flow height) */
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          z-index: 2;
          transform: rotateY(0deg);
        }
        .flip-card-back {
          /* Relative position so the Image drives the height of the card */
          position: relative;
          transform: rotateY(180deg);
          background: white;
          padding: 8px;
        }
        .card-pattern {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-size: cover;
          background-position: center;
          filter: brightness(0.7);
        }
        .click-hint {
          position: relative;
          z-index: 2;
          color: rgba(255,255,255,0.8);
          font-family: 'Great Vibes', serif;
          font-size: 1.2rem;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 5px 10px;
          border-radius: 20px;
          background: rgba(0,0,0,0.3);
        }
        
        .flip-card-back img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
        }

        @media (max-width: 1100px) {
          .masonry-grid {
            column-count: 3;
          }
        }
        @media (max-width: 900px) {
          .masonry-grid {
            column-count: 2;
          }
        }
        @media (max-width: 600px) {
          .masonry-grid {
            column-count: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default Gallery
