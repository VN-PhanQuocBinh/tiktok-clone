import { useEffect, useRef, useState } from "react";
import { useVideo } from "../../contexts/VideoContext/VideoContext";

import {
   getComments,
   createComment,
} from "../../services/commentsService/commentsService";
import { getToken } from "../../utils/token";

import CommentItem from "./CommentItem";

import { Icon_XMark, Icon_Tag, Icon_Emoji } from "../../assets/Icons";

import styles from "../../assets/styles/components/CommentSide/CommentSide.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MAX_LENGTH = 150;

function CommentSide({ className }) {
   const { state: videoState, dispatch } = useVideo();
   const [commentValue, setCommentValue] = useState("");
   const [originalHeight, setOriginalHeight] = useState(0);
   const [comments, setComments] = useState([]);

   const [animation, setAnimation] = useState(false);
   const [hidePlaceholder, setHidePlaceholder] = useState(false);
   const [hideCount, setHideCount] = useState(true);

   const DOM_input = useRef(null);

   useEffect(() => {
      if (videoState.videoId) {
         (async () => {
            const response = await getComments(getToken(), videoState?.videoId);
            console.log(response);
            setComments(response?.data);
         })();
      }
   }, [videoState]);

   useEffect(() => {
      setTimeout(() => {
         setAnimation(videoState.isCommentVisible);
      }, 100);
   }, [videoState]);

   useEffect(() => {
      if (commentValue) {
         setHidePlaceholder(true);
      } else {
         setHidePlaceholder(false);
      }

      if (DOM_input.current) {
         if (DOM_input.current.clientHeight !== originalHeight) {
            setHideCount(false);
         } else {
            setHideCount(true);
         }
      }
   }, [commentValue]);

   useEffect(() => {
      if (DOM_input.current) {
         setOriginalHeight(DOM_input.current.clientHeight);
      }
   }, [videoState.isCommentVisible]);

   const handleChangeValue = (e) => {
      const value = e.target.textContent;
      setCommentValue(value);
   };

   const handleBeforeInput = (e) => {
      const text = DOM_input.current.textContent;
      const newTextLength = text.length + e.data?.length || 0;

      if (newTextLength > MAX_LENGTH) e.preventDefault();
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      const token = getToken();
      const videoId = videoState?.videoId;

      (async () => {
         const response = await createComment(token, videoId, commentValue);
         console.log(response);

         // reset input value
         DOM_input.current.textContent = "";
         setCommentValue("");

         // update comments list
         if (response.success) {
            setComments((prev) => [response.data, ...prev]);
         }
      })();
   };

   const handleDeleteComment = (commentId) => {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
   };

   return (
      <div className={cx("animation-wrapper", { animation: animation })}>
         {videoState.isCommentVisible && (
            <div className={cx("wrapper", { [className]: className })}>
               <div className={cx("header")}>
                  <h4>Comments (24)</h4>
                  <button className={cx("close-btn")}>
                     <span className={cx("icon")}>
                        <Icon_XMark />
                     </span>
                  </button>
               </div>

               <div className={cx("inner")}>
                  <ul>
                     {comments.map((comment) => (
                        <li className={cx("comment-item")} key={comment.id}>
                           <CommentItem
                              onDelete={handleDeleteComment}
                              commentData={comment}
                           />
                        </li>
                     ))}
                  </ul>
               </div>

               <form className={cx("footer")}>
                  <div className={cx("input-box")}>
                     <div className={cx("input-wrapper")}>
                        <div className={cx("input")}>
                           <div
                              onInput={handleChangeValue}
                              onBeforeInput={handleBeforeInput}
                              contentEditable={true}
                              className={cx("content")}
                              ref={DOM_input}
                           ></div>
                           {!hidePlaceholder && (
                              <span className={cx("placeholder")}>
                                 Add comment...
                              </span>
                           )}
                        </div>
                        {!hideCount && (
                           <span
                              className={cx("character-count", {
                                 active: commentValue.length === 150,
                              })}
                           >
                              {commentValue.length}/150
                           </span>
                        )}
                     </div>

                     <button className={cx("tag-btn")}>
                        <span>
                           <Icon_Tag />
                        </span>
                     </button>

                     <button className={cx("emoji-btn")}>
                        <span>
                           <Icon_Emoji />
                        </span>
                     </button>
                  </div>

                  <button
                     onClick={handleSubmit}
                     className={cx("submit-btn")}
                     disabled={!hidePlaceholder}
                  >
                     Post
                  </button>
               </form>
            </div>
         )}
      </div>
   );
}

export default CommentSide;
