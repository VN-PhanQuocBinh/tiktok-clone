import classNames from "classnames/bind";
import styles from "../../assets/styles/components/VideoPlayer.module.scss";
import {
   useEffect,
   useRef,
   memo,
   forwardRef,
   useImperativeHandle,
} from "react";

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
   const DOM_video = useRef(null);

   useImperativeHandle(
      ref,
      () => {
         return {
            play: () => DOM_video.current?.play(),
            pause: () => DOM_video.current?.pause(),
            setVolume: (value) => (DOM_video.current.volume = value),
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
      DOM_video.current.volume = 0.1;

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
