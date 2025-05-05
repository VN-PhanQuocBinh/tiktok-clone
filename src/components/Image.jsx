import { useEffect, useState } from "react";
import { fallback } from "../assets/images";

export default function Image({
   src,
   fallback: errorImg = fallback,
   ...props
}) {
   const [fallback, setFallback] = useState("");

   useEffect(() => {
      if (!src) {
         setFallback(errorImg)
      }
   }, [])

   const HandleError = () => {
      setFallback(errorImg);
   };

   return (
      <img
         onError={HandleError}
         src={fallback || src} 
         {...props} 
      />
   )
}
