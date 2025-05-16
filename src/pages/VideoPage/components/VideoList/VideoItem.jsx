import { useCallback, useEffect, useRef, useState } from "react";

import VideoPlayer from "../../../../components/VideoList/VideoPlayer";
import VolumeControl from "../../../../components/VideoList/VolumeControl";
import TimeLine from "../../../../components/VideoList/TimeLine";
import DropDown from "../../../../components/DropDown";
import DropDownItem from "../../../../components/DropDownItem";
import Image from "../../../../components/Image";

import { DROPDOWN_ITEM_TYPE as TYPE } from "../../../../constants";

import {
   Icon_VolumeSolid,
   Icon_VolumeSolidXmark,
   Icon_EllipsisVertical,
   Icon_Play,
   Icon_Pause,
   Icon_BlueTick,
} from "../../../../assets/Icons";

import classNames from "classnames/bind";
import styles from "../../../../assets/styles/pages/VideoPage/VideoList/VideoItem.module.scss";

const cx = classNames.bind(styles);

function VideoItem({ className, video }) {
   const DOM_videoItem = useRef(null);
   const DOM_moreMenu = useRef(null);
   const DOM_video = useRef(null);

   const [inViewport, setInViewport] = useState(false);
   const [leftMoreMenu, setLeftMoreMenu] = useState(0);
   const [isPlay, setIsPlay] = useState(false);
   const [displayStateBtn, setDisplayStateBtn] = useState(false);
   const [isMuted, setIsMuted] = useState(false);

   const [duration, setDuration] = useState(0);

   const [showMoreMenu, setShowMoreMenu] = useState(false);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            setInViewport(entry.isIntersecting);
         },
         {
            threshold: 0.5,
         }
      );

      if (DOM_videoItem.current) {
         observer.observe(DOM_videoItem.current);
      }

      return () => {
         if (DOM_videoItem.current) observer.unobserve(DOM_videoItem.current);
      };
   }, []);

   useEffect(() => {
      const handleResize = () => {
         if (inViewport) {
            const rect = DOM_moreMenu.current?.getBoundingClientRect();
            let newLeft = window.innerWidth - rect?.right - 12;
            setLeftMoreMenu((preLeft) => Math.min(0, preLeft + newLeft));
         }
      };

      window.addEventListener("resize", handleResize);

      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, [inViewport]);

   useEffect(() => {
      const observer = new MutationObserver(() => {
         if (DOM_moreMenu.current) {
            const rect = DOM_moreMenu.current.getBoundingClientRect();
            let newLeft = window.innerWidth - rect.right - 12;
            setLeftMoreMenu((preLeft) => Math.min(0, preLeft + newLeft));
         }
      });

      if (DOM_videoItem.current) {
         observer.observe(DOM_videoItem.current, {
            childList: true,
            subtree: true,
         });
      }

      return () => observer.disconnect();
   }, []);

   const onDisplayStateBtn = useCallback((played, displayed) => {
      setIsPlay(played);

      if (played) {
         DOM_video.current?.play();
      } else {
         DOM_video.current?.pause();
      }

      setDisplayStateBtn(displayed);
   }, []);

   const onDurationChange = useCallback((duration) => {
      setDuration(duration);
   }, []);

   const handleSeek = useCallback((time) => {
      DOM_video.current?.seekTo(time);
   }, []);

   // console.log("videoItem re-render");

   const handlePlay = useCallback((e) => {
      console.log("play");

      onDisplayStateBtn(true, false);
   }, []);

   const handlePause = useCallback((e) => {
      console.log("pause");

      onDisplayStateBtn(false, false);
   }, []);

   const handleChangeVolume = useCallback((value) => {
      DOM_video.current?.setVolume(value);
      setIsMuted(value == 0);
   }, []);

   return (
      <li
         ref={DOM_videoItem}
         className={cx("video-item", {
            [className]: className,
         })}
      >
         <div className={cx("blur-background")}>
            <Image className={cx("img")} src={video?.thumb_url} />
         </div>

         <div className={cx("overlay-control")}>
            <span
               onClick={() => setShowMoreMenu(!showMoreMenu)}
               className={cx("more-icon-wrapper")}
            >
               <Icon_EllipsisVertical className={cx("more-icon")} />

               <DropDown
                  style={{
                     left: leftMoreMenu,
                  }}
                  ref={DOM_moreMenu}
                  className={cx("more-menu")}
                  isVisible={showMoreMenu}
               >
                  <DropDownItem
                     type={TYPE.ACTIONS}
                     item={{
                        label: "No interested",
                        icon: Icon_Play,
                     }}
                     className={cx("more-item")}
                  />

                  <DropDownItem
                     type={TYPE.ACTIONS}
                     item={{
                        label: "No interested",
                        icon: Icon_Play,
                     }}
                     className={cx("more-item")}
                  />

                  <DropDownItem
                     type={TYPE.ACTIONS}
                     item={{
                        label: "No interested",
                        icon: Icon_Play,
                     }}
                     className={cx("more-item")}
                  />
               </DropDown>
            </span>
         </div>

         <div className={cx("videoPlayer-wrapper")}>
            <VideoPlayer
               className={cx("video-element")}
               src={video.file_url}
               onDisplayStateBtn={onDisplayStateBtn}
               onDurationChange={onDurationChange}
               onPlay={handlePlay}
               onPause={handlePause}
               ref={DOM_video}
            ></VideoPlayer>

            <div className={cx("play-pause-btn")}>
               {displayStateBtn && isPlay && (
                  <span>
                     <Icon_Play className={cx("icon", "play")} />
                  </span>
               )}

               {displayStateBtn && !isPlay && (
                  <span>
                     <Icon_Pause className={cx("icon")} />
                  </span>
               )}
            </div>

            <div className={cx("bot-overlay-control")}>
               <TimeLine
                  onSeek={handleSeek}
                  onPlay={DOM_video.current?.play}
                  onPause={DOM_video.current?.pause}
                  onDisplayStateBtn={onDisplayStateBtn}
                  counting={isPlay}
                  duration={duration}
                  className={cx("time-line")}
               />

               <span className={cx("volume-icons")}>
                  {isMuted ? <Icon_VolumeSolidXmark /> : <Icon_VolumeSolid />}

                  <VolumeControl
                     className={cx("volume-control")}
                     onChangeVolume={handleChangeVolume}
                  />
               </span>
            </div>
         </div>
      </li>
   );
}

export default VideoItem;
