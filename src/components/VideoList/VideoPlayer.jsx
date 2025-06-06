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
         };
      },
      []
   );

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               onDisplayStateBtn(true, false);
            } else {
               onDisplayStateBtn(false, false);
            }
         },
         {
            threshold: 0.6,
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
         loop
      >
         <source src={src} type="video/mp4" />
      </video>
   );
}

export default memo(forwardRef(VideoPlayer));
