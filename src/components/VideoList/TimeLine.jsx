import { useEffect, useRef, useState } from "react";
import styles from "../../assets/styles/components/TimeLine.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function TimeLine({
   className,
   duration = 0,
   counting = false,
   onSeek,
   onPlay,
   onPause,
   onDisplayStateBtn,
   ...props
}) {
   const DOM_wrapper = useRef(null);
   const DOM_track = useRef(null);
   const DOM_thumb = useRef(null);

   const [leftThumb, setLeftThumb] = useState(0);
   const [currentTime, setCurrentTime] = useState(0);
   const [grabbing, setGrabbing] = useState(false);
   const [notTransition, setNotTransition] = useState(false)

   useEffect(() => {
      // const trackWidth = DOM_track.current?.offsetWidth;
      // const thumbWith = DOM_thumb.current?.offsetWidth;
      const trackWidth = DOM_track.current?.offsetWidth;
      const thumbWith = DOM_thumb.current?.offsetWidth;

      setLeftThumb(1/duration * trackWidth)

      const clearEvents = () => {
         // console.log("clear events");

         setGrabbing(false);
         setNotTransition(false)

         window.removeEventListener("pointermove", handlePointerMove);
         window.removeEventListener("pointerup", handlePointerUp);
      };

      const handlePointerMove = (e) => {
         let trackWidth = DOM_track.current?.offsetWidth;
         let thumbWith = DOM_thumb.current?.offsetWidth;

         const rect = DOM_track.current?.getBoundingClientRect();

         let left = Math.min(
            Math.max(e.clientX - rect.left, 0),
            trackWidth
         );

         // console.dir(trackWidth);
         setLeftThumb(left);
      };

      const handlePointerUp = (e) => {
         // console.log("pointer up");

         let trackWidth = DOM_track.current?.offsetWidth;
         let thumbWith = DOM_thumb.current?.offsetWidth;

         // onPlay()
         onDisplayStateBtn(true, false)
         setLeftThumb(prev => {
            const percent = prev / trackWidth
            let newTime = percent * duration
            
            onSeek(newTime)
            setCurrentTime(newTime)

            return prev
         })

         clearEvents();
      };

      const handlePointerDown = (e) => {
         // console.log("pointer down");
         
         setGrabbing(true);
         setNotTransition(true)
         onDisplayStateBtn(false, false)
         // onPause()

         window.addEventListener("pointermove", handlePointerMove);
         window.addEventListener("pointerup", handlePointerUp);
      };


      DOM_thumb.current?.addEventListener("pointerdown", handlePointerDown);
      DOM_wrapper.current?.addEventListener("pointerdown", (e) => {
         e.preventDefault();
      });

      return () => {
         DOM_thumb.current?.removeEventListener(
            "pointerdown",
            handlePointerDown
         );
         DOM_wrapper.current?.removeEventListener("poinerdown", () => {
            e.preventDefault();
         });
      };
   }, [duration]);

   useEffect(() => {
      let timerId;

      if (counting) {
         timerId = setInterval(() => {
            setNotTransition(false)

            setCurrentTime((prev) => {
               let newValue = prev + 1

               if (newValue > duration) {
                  setNotTransition(true)
                  newValue = 0
               }

               return newValue
            });
         }, 1000);
      }

      return () => clearInterval(timerId);
   }, [counting]);

   useEffect(() => {
      const trackWidth = DOM_track.current?.offsetWidth;
      const thumbWith = DOM_thumb.current?.offsetWidth;

      let percent = 0
      if (duration !== 0) {
         percent = currentTime/duration
         // setLeftThumb(percent * (trackWidth - thumbWith))
         setLeftThumb(percent * trackWidth)
         // onSeek(percent * duration)
         // console.log(percent);
         
      }

   }, [currentTime])

   return (
      <div
         {...props}
         ref={DOM_wrapper}
         className={cx("wrapper") + " " + className}
      >
         <div ref={DOM_track} className={cx("slider-track")}>
            <div
               style={{ width: `${leftThumb}px`, transition: notTransition && "none" }}
               className={cx("slider-fill")}
            />
            <div
               ref={DOM_thumb}
               style={{
                  left: `${leftThumb - 6}px`,
                  cursor: grabbing ? "grabbing" : "grab",
                  transition: notTransition && "none"
               }}
               className={cx("slider-thumb")}
            />
         </div>
      </div>
   );
}

export default TimeLine;
