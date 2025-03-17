import classNames from "classnames/bind";
import styles from "../../assets/styles/components/VideoPlayer.module.scss";
import { useEffect, useRef } from "react";

const cx = classNames.bind(styles);

function VideoPlayer({className, ...props}) {
   const DOM_video = useRef(null)

   useEffect(() => {
      const observer = new IntersectionObserver(
         (args) => {
            
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
      ></video>
   );
}

export default VideoPlayer;
