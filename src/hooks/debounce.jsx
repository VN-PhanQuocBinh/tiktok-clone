import { useState, useEffect } from "react"

const useDebounce = (value, delay) => {
   const [debounceValue, setDebounceValue] = useState(value)
   let i = 1

   console.log(i)
   i++
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