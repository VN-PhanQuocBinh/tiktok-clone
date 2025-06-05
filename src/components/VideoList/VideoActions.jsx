import { useEffect, useState, useLayoutEffect, useMemo, useCallback } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useVideo } from "../../contexts/VideoContext/VideoContext";
import { useAuth } from "../../contexts/AuthContext";

import { follow, unfollow } from "../../services/userService/followingService";
import { getToken } from "../../utils/token";

import { ACTION_VIDEOS_TYPE } from "../../constants";

import {
   Icon_HeartRegular,
   Icon_Comment,
   Icon_Flag,
   Icon_Share,
   Icon_Plus,
   Icon_Check,
} from "../../assets/Icons";
import Image from "../Image";

import styles from "../../assets/styles/components/VideoActions.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function VideoActions({
   className,
   video,
   landscape,
   portrait,
   isFollowed,
   ...props
}) {
   const {
      state: videoState,
      dispatch: videoDispatch,
      actions: { toggleLikeVideo },
   } = useVideo();
   const { user, updateFollowingList } = useAuth();

   const [isLiked, setIsLiked] = useState(false);
   const [isFavorite, setIsFavorite] = useState(false);
   const [followed, setFollowed] = useState(isFollowed);

   const isMatchQuery = useMediaQuery("(max-width: 768px)");

   useEffect(() => {
      setFollowed(isFollowed);
   }, [isFollowed]);

   useEffect(() => {
      // console.log(video);
      if (video) {
         setIsLiked(video.is_liked);
      }
   }, [video]);

   useEffect(() => {
      setIsLiked(videoState.videosCache[video.uuid]?.isLiked)
   }, [videoState])

   const handleLike = () => {
      console.log("like");
      // setIsLiked((prev) => !prev);
      toggleLikeVideo(video?.uuid)
   };

   const handleFavorite = useCallback(() => {
      setIsFavorite((prev) => !prev);
      
   }, [])

   const handleFollow = () => {
      const { userId } = videoState;

      if (user.id !== userId) {
         (async () => {
            const token = getToken();
            const prevFollowed = followed;

            setFollowed(!prevFollowed);
            const response = await (prevFollowed
               ? unfollow(token, userId)
               : follow(token, userId));

            // console.log(response);

            if (!response.success) {
               setFollowed(prevFollowed);
            } else {
               updateFollowingList(video?.user, !prevFollowed);
            }
         })();
      }
   };

   const handleComment = () => {
      if (videoState.isCommentVisible) {
         videoDispatch({ type: ACTION_VIDEOS_TYPE.CLOSE_COMMENT });
      } else {
         videoDispatch({ type: ACTION_VIDEOS_TYPE.OPEN_COMMENT });
      }
   };

   return (
      <div
         className={
            cx("wrapper", {
               landscape: landscape,
               portrait: portrait,
               small: isMatchQuery,
            }) +
            " " +
            className
         }
         {...props}
      >
         <button className={cx("avatar-btn")}>
            <Image className={cx("avt-img")} src={video.user.avatar} />
            {video?.user?.id !== user?.id && (
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
            )}
         </button>

         <button
            onClick={handleLike}
            className={cx("action-btn", "like-btn", { active: isLiked })}
         >
            <span className={cx("like-icon")}>
               <Icon_HeartRegular className={cx("icon")} />
            </span>
            <span className={cx("count")}>{video.likes_count}</span>
         </button>

         <button
            onClick={handleComment}
            className={cx("action-btn", "comment-btn")}
         >
            <span className={cx("comment-icon")}>
               <Icon_Comment className={cx("icon")} />
            </span>
            <span className={cx("count")}>{video.comments_count}</span>
         </button>

         <button
            onClick={handleFavorite}
            className={cx("action-btn", "favorite-btn", { active: isFavorite })}
         >
            <span className={cx("favorite-icon")}>
               <Icon_Flag className={cx("icon")} />
            </span>
            <span className={cx("count")}>264</span>
         </button>

         <button className={cx("action-btn", "share-btn")}>
            <span className={cx("share-icon")}>
               <Icon_Share className={cx("icon")} />
            </span>
            <span className={cx("count")}>{video.shares_count}</span>
         </button>

         <button className={cx("music-btn")}>
            <Image className={cx("music-img")} src="" />
         </button>
      </div>
   );
}

export default VideoActions;
