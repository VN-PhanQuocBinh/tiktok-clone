// src/components/Profile/VideoItem.jsx

import { Icon_PlaySolid } from "../../assets/Icons";

import classNames from "classnames/bind";
import styles from "../../assets/styles/components/Profile/VideoItem.module.scss";

const cx = classNames.bind(styles);

function VideoItem({ video, className, isPlay = false, onPointerEnter }) {

   return (
      <div
         className={cx("wrapper", {[className]: className})}
         onMouseEnter={onPointerEnter}
      >
         {isPlay ? (
            <video
               src={video.file_url}
               className={cx("video")}
               muted
               loop
               playsInline
               autoPlay={isPlay}
            />
         ) : (
            <img
               src={video.thumb_url}
               alt={video.title}
               className={cx("thumbnail")}
            />
         )}
         <div className={cx("overlay")}>
            <span className={cx("icon")}>
               <Icon_PlaySolid />
            </span>
            <span className={cx("views")}>{video.views || "3.5M"}</span>
         </div>
      </div>
   );
}

export default VideoItem;
