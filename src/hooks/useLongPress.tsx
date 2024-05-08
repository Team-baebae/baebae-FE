import { useCallback, useRef, useState } from 'react'

// useLongPress hook
function useLongPress(onLongPress: () => void, delay = 300) {
  const [longPressTriggered, setLongPressTriggered] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const start = useCallback(
    (event: React.MouseEvent) => {
      console.log('하이')
      event.preventDefault() // 오른쪽 클릭 메뉴가 나타나지 않도록 방지
      setLongPressTriggered(false)
      timeoutRef.current = setTimeout(() => {
        onLongPress()
        setLongPressTriggered(true)
      }, delay)
    },
    [onLongPress, delay],
  )

  const stop = useCallback(
    (event: React.MouseEvent) => {
      console.log('바이')

      event.preventDefault()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (!longPressTriggered) {
        // 실행하고 싶은 짧은 클릭 관련 로직을 여기에 추가할 수 있습니다.
      }
    },
    [longPressTriggered],
  )

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onContextMenu: (event: React.MouseEvent) => event.preventDefault(),
  }
}

export default useLongPress
