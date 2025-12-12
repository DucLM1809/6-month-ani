import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import envelopeImg from '../assets/envelope.png'

const Letter = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className='letter-container'>
        <motion.div
          className='envelope-wrapper'
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, type: 'spring' }}
        >
          <img src={envelopeImg} alt='Open Letter' className='envelope-img' />
          <span className='open-hint'>Bức thư của anh</span>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='letter-overlay'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className='letter-content'
              initial={{ scale: 0.5, y: 100, rotateX: 90 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.5, y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className='close-btn' onClick={() => setIsOpen(false)}>
                ×
              </button>
              <h3 className='letter-title'>Gửi vợ iu,</h3>
              <div className='letter-text'>
                <p>
                  Nhìn lại 6 tháng đã qua, anh biết thời gian này anh đã làm cho
                  vợ phải phiền lòng nhiều. 6 tháng với anh chưa phải là thời
                  gian quá dài, nhưng anh đã không hiểu được rằng vợ ỉu đã trân
                  trọng quãng đường này đến nhường nào.
                </p>
                <p>
                  Anh luôn nghĩ rằng hành trình của chúng mình sẽ không phải
                  đong đếm bằng thời gian, và đến bây giờ anh vẫn luôn như vậy.
                  Cám ơn vợ ỉu đã chấp nhận những thiếu sót, những điều chưa tốt
                  ở anh.
                </p>
                <p>
                  Tuy nhiên, đây vẫn là một cột mốc vô cùng quý giá. 6 tháng chỉ
                  là thời gian mình bắt đầu yêu nhau, nhưng đây đã là 1 năm kể
                  từ ngày đầu tiên anh bắt đầu ngỏ lời với vợ ỉu. Chúng mình đã
                  cùng nhau dì bộ qua những đoạn đường dài không kể ngày lẫn
                  đêm, và anh vẫn mãi luôn đồng hành với bé suốt chặng đường còn
                  lại nữa. Giống như Van Gogh tìm thấy vẻ đẹp trong đêm đầy sao,
                  anh tìm thấy sự diệu kỳ trong từng khoảnh khắc bên em.
                </p>
                <p>
                  Cám ơn vợ ỉu đã yêu anh nhiều đến như vậy. Anh cũng yêu vợ
                  nhiều lắm. Vợ đi chơi thật dui dẻ, rồi tối nay lại về với anh
                  nhé!.
                </p>
                <p className='signature'>Mãi yêu vợ iu,</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .letter-container {
          padding: 4rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .envelope-wrapper {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .envelope-img {
          width: 120px;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
        }
        .open-hint {
          font-family: 'Great Vibes', serif;
          color: #4a4a4a;
          font-size: 2rem;
          font-weight: 600;
        }
        .letter-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.7);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .letter-content {
          background: #fffdf0;
          padding: 3rem;
          max-width: 600px;
          width: 100%;
          border-radius: 4px;
          position: relative;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          font-family: 'Great Vibes', cursive;
          color: #2c1a0b;
          background-image: linear-gradient(#e0d8c0 1px, transparent 1px);
          background-size: 100% 2rem;
          line-height: 2rem;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 20px;
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #8a6a4b;
          font-family: sans-serif;
        }
        .letter-title {
          font-size: 3rem;
          margin-bottom: 2rem;
          text-align: center;
        }
        .letter-text p {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
        }
        .signature {
          text-align: right;
          margin-top: 3rem;
          font-weight: bold;
        }
        @media (max-width: 600px) {
           .letter-content {
             padding: 2rem;
             font-size: 20px;
           }
           .letter-text p {
             font-size: 1.4rem;
           }
        }
      `}</style>
    </>
  )
}

export default Letter
