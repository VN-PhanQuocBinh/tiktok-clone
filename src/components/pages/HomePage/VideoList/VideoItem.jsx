import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import { useVideo } from "@contexts/VideoContext/VideoContext";
import { useAuth } from "@contexts/AuthContext";

import VideoPlayer from "./VideoPlayer";
import VolumeControl from "./VolumeControl";
import TimeLine from "./TimeLine";
import VideoActions from "./VideoActions";
import DropDown from "@components/DropDown";
import DropDownItem from "@components/DropDownItem";

import { DROPDOWN_ITEM_TYPE as TYPE, ACTION_VIDEOS_TYPE } from "@types";

import {
   Icon_VolumeSolid,
   Icon_VolumeSolidXmark,
   Icon_EllipsisVertical,
   Icon_Play,
   Icon_Pause,
   Icon_BlueTick,
} from "@icons";

import classNames from "classnames/bind";
import styles from "@styles/pages/HomePage/VideoList/VideoItem.module.scss";

const cx = classNames.bind(styles);

function VideoItem({ className, video }) {
   const { state: videoState, dispatch: videoDispatch } = useVideo();
   const { followingList } = useAuth();
   const followedSet = useMemo(
      () =>
         new Set(
            followingList?.map((user) => {
               return user.id;
            })
         ),
      [followingList]
   );

   const DOM_videoItem = useRef(null);
   const DOM_clickListener = useRef(null);
   const DOM_moreMenu = useRef(null);
   const DOM_video = useRef(null);

   const [inViewport, setInViewport] = useState(false);

   const [leftMoreMenu, setLeftMoreMenu] = useState(0);
   const [isPlay, setIsPlay] = useState(false);
   const [displayStateBtn, setDisplayStateBtn] = useState(false);
   const [showMoreMenu, setShowMoreMenu] = useState(false);
   const [duration, setDuration] = useState(0);
   const [orientation, setOrientation] = useState(true);

   const isFollowed = useMemo(
      () => followedSet.has(video?.user?.id),
      [followedSet, video]
   );
   const [isMuted, setIsMuted] = useState(false);
   // true: landscape, false: portrait

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
      if (inViewport) {
         // update video uuid
         videoDispatch({
            type: ACTION_VIDEOS_TYPE.UPDATE_VIDEOID,
            payload: {
               uuid: video?.uuid,
               userId: video?.user?.id,
            },
         });
      }

      // Move more menu (responsive)
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
   }, [inViewport, followedSet]);

   // Example for reason that I used MutationObserver,
   // useLayoutEffect(() => {
   //    console.log("mounted", !!DOM_moreMenu.current); //mouted {previous DOM ~ null}
   //    if (DOM_moreMenu.current) {

   //       const rect = DOM_moreMenu.current.getBoundingClientRect();
   //       let newLeft = window.innerWidth - rect.right - 12; //padding-right: 12px
   //       setLeftMoreMenu((preLeft) => Math.min(0, preLeft + newLeft));
   //    }
   // }, [showMoreMenu]);

   useEffect(() => {
      const observer = new MutationObserver(() => {
         if (DOM_moreMenu.current) {
            const rect = DOM_moreMenu.current.getBoundingClientRect();
            let newLeft = window.innerWidth - rect.right - 12; //padding-right: 12px
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

   const handlePlay = useCallback((e) => {
      console.log("play");

      onDisplayStateBtn(true, false);
   }, []);

   const handlePause = useCallback((e) => {
      console.log("pause");

      onDisplayStateBtn(false, false);
   }, []);

   const handleChangeVolume = useCallback((value) => {
      videoDispatch({ type: ACTION_VIDEOS_TYPE.SET_VOLUME, payload: value });
      setIsMuted(value == 0);
   }, []);

   const handleLoadedMetadata = useCallback((w, h) => {
      if (w > h) {
         setOrientation(true);
      } else {
         setOrientation(false);
      }
   }, []);

   const handleMuted = useCallback(
      (e) => {
         e.stopPropagation();
         setIsMuted((prev) => !prev);

         let newVolumeValue = 0;
         if (isMuted) {
            newVolumeValue = videoState.volumeValue.previous;
         }
         videoDispatch({
            type: ACTION_VIDEOS_TYPE.SET_VOLUME,
            payload: newVolumeValue,
         });
      },
      [isMuted, videoState]
   );

   const handleToggleMore = useCallback((e) => {
      e.stopPropagation();
      setShowMoreMenu((prev) => !prev);
   }, []);

   const handleClickToControl = useCallback(
      (e) => {
         if (DOM_video.current.contains(e.target)) {
            onDisplayStateBtn(!isPlay, true);
         }
      },
      [isPlay]
   );

   return (
      <li
         ref={DOM_videoItem}
         className={cx("video-item", {
            [className]: className,
         })}
      >
         <div className={cx("videoPlayer-wrapper")}>
            <div
               ref={DOM_clickListener}
               onClick={handleClickToControl}
               className={cx("click-listener")}
            >
               <VideoPlayer
                  className={cx("video-element")}
                  src={video.file_url}
                  onDisplayStateBtn={onDisplayStateBtn}
                  onDurationChange={onDurationChange}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onLoadedMetaData={handleLoadedMetadata}
                  ref={DOM_video}
               ></VideoPlayer>

               <div className={cx("overlay-control")}>
                  <span className={cx("volume-icons")}>
                     {isMuted ? (
                        <Icon_VolumeSolidXmark onClick={handleMuted} />
                     ) : (
                        <Icon_VolumeSolid onClick={handleMuted} />
                     )}

                     <VolumeControl
                        className={cx("volume-control")}
                        onChangeVolume={handleChangeVolume}
                     />
                  </span>

                  <span
                     onClick={handleToggleMore}
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

               <div className={cx("video-info")}>
                  <h3 className={cx("user-id")}>
                     {video?.user?.nickname}
                     {video?.user?.tick && (
                        <Icon_BlueTick className={cx("tick")} />
                     )}
                  </h3>
                  <p className={cx("description")}>{video?.description}</p>
               </div>
            </div>

            <TimeLine
               onSeek={handleSeek}
               onDisplayStateBtn={onDisplayStateBtn}
               counting={isPlay}
               duration={duration}
               className={cx("time-line")}
            />
         </div>

         <VideoActions
            video={video}
            landscape={orientation}
            portrait={!orientation}
            isFollowed={isFollowed}
            className={cx("video-actions", {
               "comment-visible": videoState.isCommentVisible,
            })}
         />
      </li>
   );
}

export default memo(VideoItem);
