import Router from './Router'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const baseWidth = 390 // 기준 너비
    const baseFontSize = 16 // 기준 폰트 크기

    function handleResize() {
      const scaleFactor = window.innerWidth / baseWidth
      const newFontSize = baseFontSize * scaleFactor
      document.documentElement.style.fontSize = `${newFontSize}px`
    }

    window.addEventListener('resize', handleResize)

    // 컴포넌트 마운트 시 초기 폰트 크기 설정
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <Router />
}

export default App
