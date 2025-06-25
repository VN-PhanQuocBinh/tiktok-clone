import { useEffect, useState, useRef, memo, forwardRef, useImperativeHandle, useCallback } from "react";
import { useUI } from "@contexts/UIContext/UIContext";
import { useVideo } from "@contexts/VideoContext/VideoContext";
import { useAuth } from "@contexts/AuthContext";

import { ACTION_MODAL_TYPES, MODAL_TYPES } from "@types";

import Image from "@components/Image";
import {
   Icon_HeartSolid,
   Icon_HeartRegular,
   Icon_EllipsisVertical,
} from "@icons";

import getTimeAgo from "@utils/getTimeAgo";
import {
   likeComment,
   unlikeComment,
   deleteComment,
} from "@services/commentsService/commentsService";
import { getToken } from "@utils/token";

import styles from "@styles/pages/HomePage/CommentSide/CommentItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function CommentItem({
   className,
   commentData,
   onDelete,
   onToggleLikeComment,
}, ref) {
   const { state: uiState, dispatch: uiDispatch } = useUI();
   const { state: videoState, dispatch: videoDispatch } = useVideo();
   const { user } = useAuth();

   const [isLiked, setIsLiked] = useState(!!commentData?.is_liked);
   const [likeCount, setLikeCount] = useState(commentData?.likes_count || 0);
   const [createdTime, setCreatedTime] = useState("");

   const [moreBtnVisible, setMoreBtnVisible] = useState(false);
   const [moreVisible, setMoreVisible] = useState(false);

   const DOM_wrapper = useRef(null);

   const handleClickOutside = useCallback((e) => {
      if (!DOM_wrapper.current?.contains(e.target)) {
         setMoreVisible(false)
      }
   }, [])

   useImperativeHandle(ref, () => ({
      handleClickOutside
   }), [handleClickOutside])

   useEffect(() => {
      // console.log(commentData);
      setCreatedTime(getTimeAgo(commentData.created_at));
      setIsLiked(commentData?.is_liked);
   }, [commentData]);

   useEffect(() => {
      const handlePointerEnter = (e) => {
         setMoreBtnVisible(true);
      };

      const handlePointerLeave = (e) => {
         if (!moreVisible) {
            setMoreBtnVisible(false);
         }
      };

      DOM_wrapper.current?.addEventListener("pointerenter", handlePointerEnter);
      DOM_wrapper.current?.addEventListener("pointerleave", handlePointerLeave);

      return () => {
         DOM_wrapper.current?.removeEventListener(
            "pointerenter",
            handlePointerEnter
         );
         DOM_wrapper.current?.removeEventListener(
            "pointerleave",
            handlePointerLeave
         );
      };
   }, [moreVisible]);

   const toggleLike = () => {
      setIsLiked(!isLiked);

      (async () => {
         const token = getToken();
         const commentId = commentData.id;
         let response;

         const oldIsLiked = isLiked;
         const oldLikeCount = likeCount;

         setIsLiked(!oldIsLiked);
         setLikeCount(oldLikeCount + (oldIsLiked ? -1 : 1));
         if (!isLiked) {
            response = await likeComment(token, commentId);
         } else {
            response = await unlikeComment(token, commentId);
         }

         // console.log(response);

         if (response.success) {
            onToggleLikeComment(commentData.id);
         } else {
            setIsLiked(oldIsLiked);
            setLikeCount(oldLikeCount);
         }
      })();
   };

   const handleToggleMore = () => {
      setMoreVisible((prev) => !prev);
   };

   const handleDeleteComment = () => {
      const handleDelete = async () => {
         const token = getToken();
         const commentId = commentData.id;

         const response = await deleteComment(token, commentId);

         onDelete && onDelete(commentData.id);

         // console.log(response);
      };

      uiDispatch({
         type: ACTION_MODAL_TYPES.OPEN_MODAL,
         modalType: MODAL_TYPES.CONFIRM_DELETE_COMMENT,
         modalProps: {
            actions: [handleDelete],
         },
      });
   };

   return (
      <div
         ref={DOM_wrapper}
         className={cx("wrapper", { [className]: className })}
      >
         <div className={cx("avt-wrapper")}>
            <Image className={cx("img")} />
         </div>
         <div className={cx("inner")}>
            <div className={cx("inner-header")}>
               <h4 className={cx("username")}>
                  {(
                     commentData?.user?.first_name +
                     " " +
                     commentData?.user?.last_name
                  ).trim() != ""
                     ? commentData?.user?.first_name +
                       " " +
                       commentData?.user?.last_name
                     : "user" + commentData?.user?.id}
               </h4>

               <button className={cx("more-btn", { hide: !moreBtnVisible })}>
                  <span onClick={handleToggleMore}>
                     <Icon_EllipsisVertical />
                  </span>

                  {moreVisible &&
                     (user.id === commentData?.user?.id ? (
                        <div
                           onClick={handleDeleteComment}
                           className={cx("more-dropdown")}
                        >
                           <span>Delete</span>
                        </div>
                     ) : (
                        <div className={cx("more-dropdown")}>
                           <span>Report</span>
                        </div>
                     ))}
               </button>
            </div>

            <div className={cx("content")}>
               <span>{commentData?.comment}</span>
            </div>

            <div className={cx("inner-footer")}>
               <div className={cx("left-part")}>
                  <span className={cx("created-time")}>{createdTime}</span>
                  <button className={cx("reply-btn")}>Reply</button>
               </div>

               <div className={cx("right-part")}>
                  <button
                     onClick={toggleLike}
                     className={cx({ liked: isLiked })}
                  >
                     <span>
                        {isLiked ? <Icon_HeartRegular /> : <Icon_HeartSolid />}
                     </span>
                  </button>
                  <span className={cx("liked-count")}>{likeCount}</span>
               </div>
            </div>
         </div>
      </div>
   );
}

export default memo(forwardRef(CommentItem));
