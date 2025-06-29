import {
   useEffect,
   useRef,
   memo,
   forwardRef,
   useImperativeHandle,
   useState,
} from "react";
import { useVideo } from "@contexts/VideoContext/VideoContext";

import classNames from "classnames/bind";
import styles from "@styles/pages/HomePage/VideoList/VideoPlayer.module.scss";
const cx = classNames.bind(styles);

function VideoPlayer(
   {
      className,
      src,
      onDisplayStateBtn,
      onDurationChange,
      onPlay,
      onPause,
      onLoadedMetaData,
      ...props
   },
   ref
) {
   const { state: videoState } = useVideo();
   const DOM_video = useRef(null);
   const [playing, setPlaying] = useState(false);
   const [inViewport, setInViewport] = useState(false);

   useEffect(() => {
      if (DOM_video.current) {
         DOM_video.current.volume = videoState.volumeValue.current;
      }
   }, [videoState]);

   useImperativeHandle(
      ref,
      () => {
         return {
            play: () => DOM_video.current.play(),
            pause: () => DOM_video.current.pause(),
            seekTo: (time) => {
               if (DOM_video.current) {
                  DOM_video.current.currentTime = time;
               }
            },
            contains: (element) => DOM_video.current?.contains(element),
         };
      },
      []
   );

   useEffect(() => {
      onDisplayStateBtn(playing, false);
   }, [playing, onDisplayStateBtn]);

   useEffect(() => {
      const handleWaiting = (e) => {
         if (e.target?.paused) setPlaying(false);
      };

      const handlePlaying = (e) => {
         console.dir(e.target);
         
         setPlaying(true);
      };

      const handleEnd = () => {
         // replay video
         setTimeout(() => {
            onDisplayStateBtn(true, false)
         }, 1000) // delay allow timeline transition to finish
      }
      
      if (inViewport) {
         DOM_video.current.addEventListener("waiting", handleWaiting);
         DOM_video.current.addEventListener("playing", handlePlaying);
         DOM_video.current.addEventListener("ended", handleEnd);
      }

      return () => {
         DOM_video.current?.removeEventListener("waiting", handleWaiting);
         DOM_video.current?.removeEventListener("playing", handlePlaying);
         DOM_video.current?.removeEventListener("ended", handleEnd);
      };
   }, [inViewport]);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setInViewport(true);
               setPlaying(true);
            } else {
               setInViewport(false);
               setPlaying(false);
            }
         },
         {
            threshold: 0.8,
         }
      );

      observer.observe(DOM_video.current);

      return () => {
         if (DOM_video.current) {
            observer.unobserve(DOM_video.current);
         }
      };
   }, []);

   useEffect(() => {
      const video = DOM_video.current;

      const handleLoadedMetadata = () => {
         onDurationChange?.(video?.duration);
         onLoadedMetaData(video?.clientWidth, video?.clientHeight);
      };

      video?.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
         video?.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
   }, [onLoadedMetaData]);

   return (
      <video
         {...props}
         className={cx("video", { [className]: className })}
         ref={DOM_video}
         // loop
      >
         <source src={src} type="video/mp4" />
      </video>
   );
}

export default memo(forwardRef(VideoPlayer));
