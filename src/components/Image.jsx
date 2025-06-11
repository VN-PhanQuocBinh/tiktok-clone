import { useEffect, useState, forwardRef } from "react";
import { fallback } from "../assets/images";

function Image({
   src,
   fallback: errorImg = fallback,
   ...props
}, ref) {
   const [fallback, setFallback] = useState("");
   

   useEffect(() => {
      if (!src) {
         setFallback(errorImg)
      }
   }, [src])

   const HandleError = () => {
      setFallback(errorImg);
   };
   
   console.log(props);
   

   return (
      <img
         ref={ref}
         onError={HandleError}
         src={(src && src !== "https://files.fullstack.edu.vn/f8-tiktok/") ? src : fallback} 
         {...props} 
      />
   )
}


export default forwardRef(Image)

