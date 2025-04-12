import { useEffect, useRef, useState } from "react";

import VideoPlayer from "./VideoPlayer";
import VolumeControl from "./VolumeControl";
import DropDown from "../DropDown";
import DropDownItem from "../DropDownItem";

import { DROPDOWN_ITEM_TYPE as TYPE } from "../../constants";

import {
   Icon_Volume,
   Icon_VolumeXmark,
   Icon_EllipsisVertical,
   Icon_Play,
   Icon_Pause,
} from "../../assets/Icons";

import classNames from "classnames/bind";
import styles from "../../assets/styles/components/VideoItem.module.scss";
import { matchPath } from "react-router";

const cx = classNames.bind(styles);

function VideoItem({ className, video }) {
   const DOM_videoItem = useRef(null);
   const DOM_moreMenu = useRef(null);
   const [inViewport, setInViewport] = useState(false);
   const [leftMoreMenu, setLeftMoreMenu] = useState(0);

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
            const rect = DOM_moreMenu.current.getBoundingClientRect()
            let newLeft = window.innerWidth - rect.right - 12
            setLeftMoreMenu((preLeft) => Math.min(0, preLeft + newLeft))
         }
      };

      window.addEventListener("resize", handleResize);

      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, [inViewport]);

   return (
      <li
         ref={DOM_videoItem}
         className={cx("video-item", { [className]: className })}
      >
         <div className={cx("videoPlayer-wrapper")}>
            <VideoPlayer
               className={cx("video-element")}
               src={video.file_url}
            ></VideoPlayer>

            <div className={cx("overlay-control")}>
               <span className={cx("volume-icons")}>
                  <Icon_Volume />
                  {/* <Icon_VolumeXmark /> */}

                  <VolumeControl className={cx("volume-control")} />
               </span>

               <span className={cx("more-icon-wrapper")}>
                  <Icon_EllipsisVertical className={cx("more-icon")} />

                  <DropDown
                     style={{
                        left: leftMoreMenu
                     }}
                     ref={DOM_moreMenu}
                     className={cx("more-menu")}
                     isVisible={true}
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
               <Icon_Play />
               <Icon_Pause />
            </div>

            <div className={cx("video-info")}>
               <h3 className={cx("user-id")}>{video?.user?.nickname}</h3>
               <p className={cx("description")}>{video?.description}</p>
            </div>
         </div>
      </li>
   );
}

export default VideoItem;
