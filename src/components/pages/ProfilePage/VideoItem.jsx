import { Icon_PlaySolid } from "@icons";

import classNames from "classnames/bind";
import styles from "@styles/pages/ProfilePage/VideoItem.module.scss";

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
            <span className={cx("views")}>{video.views_count}</span>
         </div>
      </div>
   );
}

export default VideoItem;
