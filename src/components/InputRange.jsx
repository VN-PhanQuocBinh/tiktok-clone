import { useEffect, useRef, useState } from "react";

import styles from "../assets/styles/components/InputRange.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function InputRange({
   className,
   onChange,
   ...props
}) {
   const DOM_wrapper = useRef(null);
   const DOM_track = useRef(null);
   const DOM_thumb = useRef(null);

   const trackRect = useRef(null)
   const thumbRect = useRef(null)

   const [leftThumb, setLeftThumb] = useState(0);

   useEffect(() => {
      trackRect.current = DOM_track.current?.getBoundingClientRect()
      thumbRect.current = DOM_thumb.current?.getBoundingClientRect()
   }, [])

   useEffect(() => {
      setLeftThumb(-(thumbRect.current.width)/2)

      const handlePointerMove = (e) => {
         const trachWidth = trackRect.current?.width
         const thumbWidth = thumbRect.current?.width
         const min = -(thumbRect.current.width)/2
         const max = trachWidth - (thumbWidth)/2

         let value = (e.clientX - trackRect.current.left)
         value = Math.min(Math.max(value, 0), trachWidth)

         let newLeft = value - thumbWidth/2
         newLeft = Math.min(Math.max(newLeft, min), max)
         
         onChange?.(Math.floor(value/trachWidth * 100))
         setLeftThumb(newLeft)
      };

      const handlePointerUp = (e) => {
         console.log("up");
         document.removeEventListener("pointermove", handlePointerMove)
      };

      const handlePointerDown = (e) => {
         e.preventDefault()
         // remove prohibition sign

         document.addEventListener("pointermove", handlePointerMove)
      };
      
      DOM_track.current.addEventListener("pointerdown", handlePointerDown)
      document.addEventListener("pointerup", handlePointerUp)

      return () => {
         DOM_track.current?.removeEventListener("pointerdown", handlePointerDown)
         document.removeEventListener("pointerup", handlePointerUp)
      };
   }, []);


   return (
      <div
         {...props}
         ref={DOM_wrapper}
         className={cx("wrapper") + " " + className}
         draggable="false"
      >
         <div ref={DOM_track} className={cx("slider-track")}>
            <div
               style={{ width: `${leftThumb}px`}}
               className={cx("slider-fill")}
            />
            <div
               ref={DOM_thumb}
               style={{
                  left: `${leftThumb}px`
               }}
               className={cx("slider-thumb")}
            />
         </div>
      </div>
   );
}

export default InputRange;
