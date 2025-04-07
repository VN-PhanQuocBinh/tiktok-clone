import { useState, useEffect } from "react"

const useMediaQuery = (query) => {
   const [matches, setMatches] = useState(window.matchMedia(query).matches)
   
   useEffect(() => {
      const media = window.matchMedia(query)

      const handleChange = () => {
         setMatches(media.matches)
         console.log(media.matches);
      }
      media.addEventListener("change", handleChange)

      return () => media.removeEventListener("change", handleChange)
   }, [query])

   return matches
}

export default useMediaQuery