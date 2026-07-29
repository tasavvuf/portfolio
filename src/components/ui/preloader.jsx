import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const words = ['Hello', 'Bonjour', 'Ciao', 'Ola', 'Yaa', 'Hallo', 'Guten tag', 'Namaste']

const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 },
  },
}

const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: '-100vh',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
}

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const updateDimension = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight })
    }

    updateDimension()
    window.addEventListener('resize', updateDimension)
    return () => window.removeEventListener('resize', updateDimension)
  }, [])

  useEffect(() => {
    let wordTimer
    let exitTimer
    let completeTimer

    if (index === words.length - 1) {
      exitTimer = window.setTimeout(() => {
        setIsExiting(true)
        completeTimer = window.setTimeout(() => {
          onComplete?.()
        }, 1000)
      }, 1000)
    } else {
      wordTimer = window.setTimeout(
        () => {
          setIndex((currentIndex) => currentIndex + 1)
        },
        index === 0 ? 1000 : 150,
      )
    }

    return () => {
      window.clearTimeout(wordTimer)
      window.clearTimeout(exitTimer)
      window.clearTimeout(completeTimer)
    }
  }, [index, onComplete])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? 'exit' : 'initial'}
      className="preloader-screen"
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            className="preloader-word"
          >
            <span className="preloader-dot" />
            {words[index]}
          </motion.p>
          <svg className="preloader-curve">
            <motion.path
              variants={curve}
              initial="initial"
              animate={isExiting ? 'exit' : 'initial'}
              fill="#101010"
            />
          </svg>
        </>
      )}
    </motion.div>
  )
}
