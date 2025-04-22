import {
   Icon_Heart,
   Icon_Comment,
   Icon_Flag,
   Icon_Share,
   Icon_Plus,
   Icon_Check,
} from "../../assets/Icons";
import Image from "../Image";

import styles from "../../assets/styles/components/VideoActions.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function VideoActions({ className, video, landscape, portrait, ...props }) {
   const [isLiked, setIsLiked] = useState(false);
   const [isFavorite, setIsFavorite] = useState(false);
   const [followed, setFollowed] = useState(false);

   useEffect(() => {
      if (video) {
         setIsLiked(video.is_liked);
         setFollowed(video?.user?.is_followed);
      }
   }, [video]);

   const handleLike = () => {
      setIsLiked((prev) => !prev);
   };

   const handleFavorite = () => {
      setIsFavorite((prev) => !prev);
   };

   const handleFollow = () => {
      setFollowed((prev) => !prev);
   };

   return (
      <div
         className={
            cx("wrapper", { landscape: landscape, portrait: portrait }) +
            " " + className
         }
         {...props}
      >
         <button className={cx("avatar-btn")}>
            <Image className={cx("avt-img")} src="" />
            <span
               onClick={handleFollow}
               className={cx("follow-icon", { followed: followed })}
            >
               {followed ? (
                  <Icon_Check className={cx("icon")} />
               ) : (
                  <Icon_Plus className={cx("icon")} />
               )}
            </span>
         </button>

         <button
            onClick={handleLike}
            className={cx("action-btn", "like-btn", { active: isLiked })}
         >
            <span className={cx("like-icon")}>
               <Icon_Heart className={cx("icon")} />
            </span>
            <span className={cx("count")}>264.5K</span>
         </button>

         <button className={cx("action-btn", "comment-btn")}>
            <span className={cx("comment-icon")}>
               <Icon_Comment className={cx("icon")} />
            </span>
            <span className={cx("count")}>50.1K</span>
         </button>

         <button
            onClick={handleFavorite}
            className={cx("action-btn", "favorite-btn", { active: isFavorite })}
         >
            <span className={cx("favorite-icon")}>
               <Icon_Flag className={cx("icon")} />
            </span>
            <span className={cx("count")}>2.5K</span>
         </button>

         <button className={cx("action-btn", "share-btn")}>
            <span className={cx("share-icon")}>
               <Icon_Share className={cx("icon")} />
            </span>
            <span className={cx("count")}>1.8K</span>
         </button>

         <button className={cx("music-btn")}>
            <Image className={cx("music-img")} src="" />
         </button>
      </div>
   );
}

export default VideoActions;
