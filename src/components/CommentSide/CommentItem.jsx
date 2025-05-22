import { useEffect, useState } from "react";

import Image from "../../components/Image";
import {
   Icon_HeartSolid,
   Icon_HeartRegular,
   Icon_EllipsisVertical,
} from "../../assets/Icons";

import getTimeAgo from "../../utils/getTimeAgo";
import { likeComment, unlikeComment } from "../../services/commentsService/commentsService";
import { getToken } from "../../utils/token";

import styles from "../../assets/styles/components/CommentSide/CommentItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function CommentItem({ clasName, commentData }) {
   const [isLiked, setIsLiked] = useState(!!commentData?.is_liked);
   const [likeCount, setLikeCount] = useState(commentData?.likes_count || 0)

   useEffect(() => {
      console.log(commentData);

      setIsLiked(commentData?.is_liked)
   }, []);

   const toggleLike = () => {
      setIsLiked(!isLiked);

      ;(async () => {
         const token = getToken()
         const commentId = commentData.id
         let response

         const oldIsLiked = isLiked
         const oldLikeCount = likeCount

         setIsLiked(!oldIsLiked)
         setLikeCount(oldLikeCount + (oldIsLiked ? -1 : 1))
         if (!isLiked) {
            response = await likeComment(token, commentId)
         } else {
            response = await unlikeComment(token, commentId)
         }
         
         console.log(response);
         
         if (response.success) {
            setLikeCount(response?.data?.likes_count || 0)
         } else {
            setIsLiked(oldIsLiked)
            setLikeCount(oldLikeCount)
         }
      })()
   };

   return (
      <div className={cx("wrapper", { [clasName]: clasName })}>
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

               <button className={cx("more-btn")}>
                  <span>
                     <Icon_EllipsisVertical />
                  </span>
               </button>
            </div>

            <div className={cx("content")}>
               <span>
                  {commentData?.comment}
               </span>
            </div>

            <div className={cx("inner-footer")}>
               <div className={cx("left-part")}>
                  <span className={cx("created-time")}>{getTimeAgo(commentData.created_at)}</span>
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

export default CommentItem;
