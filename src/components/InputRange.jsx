import { useEffect, useRef, useState } from "react";

import styles from "../assets/styles/components/InputRange.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function InputRange({ className, onChange, ...props }) {
   const DOM_wrapper = useRef(null);
   const DOM_track = useRef(null);
   const DOM_thumb = useRef(null);

   const trackRect = useRef(null);
   const thumbRect = useRef(null);

   const [leftThumb, setLeftThumb] = useState(0);

   useEffect(() => {
      trackRect.current = DOM_track.current?.getBoundingClientRect();
      thumbRect.current = DOM_thumb.current?.getBoundingClientRect();
   }, []);

   useEffect(() => {
      setLeftThumb(-thumbRect.current.width / 2);

      const handlePointerMove = (e) => {
         const {
            width: trackWidth,
            x: trackX,
         } = trackRect.current;
         const thumbWidth = thumbRect.current?.width;
         const min = -thumbRect.current.width / 2;
         const max = trackWidth - thumbWidth / 2;

         let value = e.clientX - trackX
         value = Math.min(Math.max(value, 0), trackWidth);

         let newLeft = value - thumbWidth / 2;
         newLeft = Math.min(Math.max(newLeft, min), max);

         onChange?.(Math.floor((value / trackWidth) * 100));
         setLeftThumb(newLeft);
      };

      const handlePointerUp = (e) => {
         document.removeEventListener("pointermove", handlePointerMove);
         document.removeEventListener("pointerup", handlePointerUp);
      };

      const handlePointerDown = (e) => {
         e.preventDefault();
         // remove prohibition sign

         document.addEventListener("pointermove", handlePointerMove);
         document.addEventListener("pointerup", handlePointerUp);
      };

      DOM_track.current.addEventListener("pointerdown", handlePointerDown);

      return () => {
         DOM_track.current?.removeEventListener(
            "pointerdown",
            handlePointerDown
         );
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
               style={{ width: `${leftThumb}px` }}
               className={cx("slider-fill")}
            />
            <div
               ref={DOM_thumb}
               style={{
                  left: `${leftThumb}px`,
               }}
               className={cx("slider-thumb")}
            />
         </div>
      </div>
   );
}

export default InputRange;
