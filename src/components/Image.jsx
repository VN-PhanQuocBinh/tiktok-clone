import { useState } from "react";
import { fallback } from "../assets/images";

export default function Image({
   src,
   fallback: errorImg = fallback,
   ...props
}) {
   const [fallback, setFallback] = useState("");

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
