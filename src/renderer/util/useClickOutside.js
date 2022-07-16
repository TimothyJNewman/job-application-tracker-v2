// from https://www.30secondsofcode.org/react/s/use-click-outside

import { useEffect } from 'react'

const useClickOutside = (ref, outsideId, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }
  useEffect(() => {
    const nodeRef = document.getElementById(outsideId)
    nodeRef.addEventListener('click', handleClick)
    return () => {
      nodeRef.removeEventListener('click', handleClick)
    }
  })
}

export default useClickOutside
