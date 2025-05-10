import { useEffect, useState } from "react";
import { fallback } from "../assets/images";

function Image({
   src,
   fallback: errorImg = fallback,
   ...props
}) {
   const [fallback, setFallback] = useState("");
   

   useEffect(() => {
      if (!src) {
         setFallback(errorImg)
      }
   }, [src])

   const HandleError = () => {
      setFallback(errorImg);
   };
   

   return (
      <img
         onError={HandleError}
         src={(src && src !== "https://files.fullstack.edu.vn/f8-tiktok/") ? src : fallback} 
         {...props} 
      />
   )
}


export default Image

