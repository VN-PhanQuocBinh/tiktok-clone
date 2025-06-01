import {
   useEffect,
   useRef,
   memo,
   forwardRef,
   useImperativeHandle,
} from "react";
import { useVideo } from "../../contexts/VideoContext/VideoContext";

import classNames from "classnames/bind";
import styles from "../../assets/styles/components/VideoPlayer.module.scss";
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

   useEffect(() => {
      // console.log(DOM_video.current, videoState);

      if (DOM_video.current) {
         DOM_video.current.volume = videoState.volumeValue.current;
      }
   }, [videoState]);

   useImperativeHandle(
      ref,
      () => {
         return {
            play: () => DOM_video.current?.play(),
            pause: () => DOM_video.current?.pause(),
            // setVolume: (value) => (DOM_video.current.volume = value),
            seekTo: (time) => {
               // console.log("seek: ", time);

               if (DOM_video.current) {
                  DOM_video.current.currentTime = time;
               }
            },
         };
      },
      []
   );

   useEffect(() => {
      const handleClick = () => {
         if (DOM_video.current?.paused) {
            // DOM_video.current?.play();
            onDisplayStateBtn(DOM_video.current.paused, true);
         } else {
            // DOM_video.current?.pause();
            onDisplayStateBtn(DOM_video.current.paused, true);
         }
      };

      DOM_video.current?.addEventListener("click", handleClick);

      return () => {
         DOM_video.current?.removeEventListener("click", handleClick);
      };
   }, []);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               DOM_video.current?.play();
               onDisplayStateBtn(!DOM_video.current?.paused, false);
            } else {
               DOM_video.current?.pause();
               onDisplayStateBtn(!DOM_video.current?.paused, false);
            }
         },
         {
            threshold: 1,
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
         // console.dir(video);

         onDurationChange?.(video?.duration);
         onLoadedMetaData(video?.clientWidth, video?.clientHeight);
      };

      video?.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
         video?.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
   }, [onLoadedMetaData]);

   useEffect(() => {
      const handlePlay = () => {
         console.log("play");
      };

      const handlePause = () => {
         debugger
         console.log("pause");
      };

      DOM_video.current.addEventListener("play", handlePlay);
      DOM_video.current.addEventListener("pause", handlePause);

      return () => {
         DOM_video.current.removeEventListener("play", handlePlay);
         DOM_video.current.removeEventListener("pause", handlePause);
      };
   }, []);

   console.log("video player re-render");
   

   return (
      <video
         {...props}
         className={cx("video", { [className]: className })}
         ref={DOM_video}
         loop
      >
         <source src={src} type="video/mp4" />
      </video>
   );
}

export default memo(forwardRef(VideoPlayer));
