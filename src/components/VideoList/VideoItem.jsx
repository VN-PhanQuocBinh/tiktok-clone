import { useEffect, useRef, useState } from "react";

import VideoPlayer from "./VideoPlayer";
import VolumeControl from "./VolumeControl";
import TimeLine from "./TimeLine";
import DropDown from "../DropDown";
import DropDownItem from "../DropDownItem";

import { DROPDOWN_ITEM_TYPE as TYPE } from "../../constants";

import {
   Icon_Volume,
   Icon_VolumeXmark,
   Icon_EllipsisVertical,
   Icon_Play,
   Icon_Pause,
   Icon_BlueTick
} from "../../assets/Icons";

import classNames from "classnames/bind";
import styles from "../../assets/styles/components/VideoItem.module.scss";

const cx = classNames.bind(styles);

function VideoItem({ className, video }) {
   const DOM_videoItem = useRef(null);
   const DOM_moreMenu = useRef(null);
   const [inViewport, setInViewport] = useState(false);
   const [leftMoreMenu, setLeftMoreMenu] = useState(0);
   const [isPlay, setIsPlay] = useState(true);
   const [displayStateBtn, setDisplayStateBtn] = useState(false)

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
            const rect = DOM_moreMenu.current.getBoundingClientRect();
            let newLeft = window.innerWidth - rect.right - 12;
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


   const onDisplayStateBtn = (played, displayed) => {
      setIsPlay(played)
      setDisplayStateBtn(displayed)
   }

   return (
      <li
         ref={DOM_videoItem}
         className={cx("video-item", { [className]: className })}
      >
         <div className={cx("videoPlayer-wrapper")}>
            <VideoPlayer
               className={cx("video-element")}
               src={video.file_url}
               onDisplayStateBtn={onDisplayStateBtn}
            ></VideoPlayer>

            <div className={cx("overlay-control")}>
               <span className={cx("volume-icons")}>
                  <Icon_Volume />
                  {/* <Icon_VolumeXmark /> */}

                  <VolumeControl className={cx("volume-control")} />
               </span>

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
                  {!video?.user?.tick && <Icon_BlueTick className={cx("tick")}/>}
               </h3>
               <p className={cx("description")}>{video?.description}</p>
            </div>

            <TimeLine className={cx("time-line")}/>
         </div>
      </li>
   );
}

export default VideoItem;
