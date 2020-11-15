import React, { useRef, useEffect } from 'react'

export function useSetInterval(callback, delay = 1000) {
  const savedCallback = useRef()
  // 保存新回调
  useEffect(() => {
    savedCallback.current = callback
  });

  useEffect(() => {
    const cb = () => {
      savedCallback.current()
    }
    const timer = setInterval(cb, delay)
    return () => clearInterval(timer)
  }, [delay])
}
