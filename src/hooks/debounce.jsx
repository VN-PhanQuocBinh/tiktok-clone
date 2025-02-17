import { useState, useEffect } from "react"

const useDebounce = (value, delay) => {
   const [debounceValue, setDebounceValue] = useState(value)

   useEffect(() => {
      let timerId = setTimeout(() => {
         setDebounceValue(value)
      }, delay)

      return () => {
         clearTimeout(timerId)
      }
   }, [value, delay])

   return debounceValue
}

export default useDebounce