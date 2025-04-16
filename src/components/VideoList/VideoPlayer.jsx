import classNames from "classnames/bind";
import styles from "../../assets/styles/components/VideoPlayer.module.scss";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

function VideoPlayer({className, src, onDisplayStateBtn, ...props}) {
   const DOM_video = useRef(null)

   useEffect(() => {
      const handleClick = () => {
         if (DOM_video.current?.paused) {
            DOM_video.current?.play()
            onDisplayStateBtn(!DOM_video.current.paused, true)
         } else {
            DOM_video.current?.pause()
            onDisplayStateBtn(!DOM_video.current.paused, true)
         }
      }

      DOM_video.current.addEventListener("click", handleClick)

      return () => {
         DOM_video.current.removeEventListener("click", handleClick)
      }
   }, [])

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               DOM_video.current?.play()
               onDisplayStateBtn(!DOM_video.current.paused, false)
            } else {
               DOM_video.current?.pause()
               onDisplayStateBtn(!DOM_video.current.paused, false)
            }
         },
         {
            threshold: 0.5
         }
      )

      observer.observe(DOM_video.current)

      return () => {
         if (DOM_video.current) {
            observer.unobserve(DOM_video.current)
         }
      }
   }, [])

   return (
      <video
         {...props}
         className={cx("video", {[className]: className})}
         ref={DOM_video}
      >
         <source src={src} type="video/mp4" />
      </video>
   );
}

export default VideoPlayer;
