import classNames from "classnames/bind";
import styles from "../../assets/styles/components/VideoPlayer.module.scss";
import { useEffect, useRef } from "react";

const cx = classNames.bind(styles);

function VideoPlayer({className, src, ...props}) {
   const DOM_video = useRef(null)

   useEffect(() => {
      DOM_video.current.play()

      const observer = new IntersectionObserver(
         ([entry]) => {

            // console.log(entry);
            // if (entry.isIntersecting) {
            //    DOM_video.current.play()
            // } else {
            //    DOM_video.current.pause()
            // }
         },
         {
            threshold: 0.5
         }
      )

      observer.observe(DOM_video.current)
   }, [])

   return (
      <video
         {...props}
         className={cx("video", {[className]: className})}
         ref={DOM_video}
         controls
      >
         <source src={src} type="video/mp4" />
      </video>
   );
}

export default VideoPlayer;
