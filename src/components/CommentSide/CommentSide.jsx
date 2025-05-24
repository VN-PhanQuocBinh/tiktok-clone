import { useCallback, useEffect, useRef, useState } from "react";
import { useVideo } from "../../contexts/VideoContext/VideoContext";
import { useUI } from "../../contexts/UIContext/UIContext";

import CommentItem from "./CommentItem";

import {
   getComments,
   createComment,
} from "../../services/commentsService/commentsService";
import { getToken } from "../../utils/token";

import _ from "lodash";

import { ACTION_MODAL_TYPES, ACTION_VIDEOS_TYPE } from "../../constants";

import { Icon_XMark, Icon_Tag, Icon_Emoji } from "../../assets/Icons";

import styles from "../../assets/styles/components/CommentSide/CommentSide.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MAX_LENGTH = 150;

function CommentSide({ className }) {
   const { state: videoState, dispatch: videoDispatch } = useVideo();
   const { dispatch: uiDispatch } = useUI();

   const [visible, setVisible] = useState(videoState.isCommentVisible);

   const [comments, setComments] = useState([]);
   const [commentPage, setCommentPage] = useState({ page: 1, limit: 1 });

   const [commentValue, setCommentValue] = useState("");
   const [originalHeight, setOriginalHeight] = useState(0);

   const [animation, setAnimation] = useState(false);
   const [hidePlaceholder, setHidePlaceholder] = useState(false);
   const [hideCount, setHideCount] = useState(true);

   const DOM_loader = useRef(null);
   const DOM_list = useRef(null);
   const DOM_input = useRef(null);

   const fetchComments = useCallback(
      async (page = 1) => {
         const response = await getComments(
            getToken(),
            videoState?.videoId,
            page
         );

         const { success, data } = response;
         const { data: commentData, meta } = data || {};

         return {
            success,
            commentData: success ? commentData : [],
            maxPage: meta?.pagination?.total_pages || 1,
         };
      },
      [commentPage, videoState]
   );

   // Caching comments when the component unmounts
   // useEffect(() => {
   //    // console.log(videoState.videoId);

   //    return () => {
   //       // console.log(videoState.videoId, comments);

   //       if (
   //          comments.length > 0 &&
   //          !_.isEqual(videoState.commentsCache[videoState.videoId], comments)
   //       ) {
   //          console.warn("cleanup", videoState.commentsCache[videoState.videoId], comments);
            
   //          videoDispatch({
   //             type: ACTION_VIDEOS_TYPE.CACHING_COMMENTS,
   //             payload: {
   //                videoId: videoState.videoId,
   //                comments: comments,
   //             },
   //          });
   //       }
   //    };
   // }, [comments, videoState]);

   useEffect(() => {
      console.log("init", !videoState.commentsCache[videoState.videoId]);

      // Get comments when the videoId changes
      if (videoState.videoId && !videoState.commentsCache[videoState.videoId]) {
         console.log("load more");

         (async () => {
            const { commentData, maxPage } = await fetchComments(
               commentPage?.page
            );

            setCommentPage((prev) => ({ ...prev, limit: maxPage }));
            if (commentData.length > 0) setComments(commentData);
         })();
      } else if (videoState.commentsCache[videoState.videoId]) {
         console.log("pre: ", videoState.commentsCache[videoState.videoId]);

         setComments(videoState.commentsCache[videoState.videoId]);
      }

      // Handle Animation
      if (videoState.isCommentVisible) {
         setVisible(true);
         setAnimation(true);
      } else {
         setAnimation(false);
         setTimeout(() => {
            setVisible(false);
         }, 200); // delay 300ms to allow the animation to finish
      }
   }, [videoState]);

   const handleLoadMoreComments = useCallback(
      async ([entries]) => {
         const { isIntersecting } = entries;
         console.log("entry");

         const nextPage = commentPage.page + 1;
         if (isIntersecting && nextPage <= commentPage.limit) {
            const { success, commentData: newComments } = await fetchComments(
               nextPage
            );

            if (success) {
               setCommentPage((prev) => ({ ...prev, page: nextPage }));
               setComments((prev) => [...prev, ...newComments]);
            }
         }
      },
      [commentPage, fetchComments]
   );

   // Intersection Observer to load more comments when the loader is visible
   useEffect(() => {
      let observer;

      if (videoState.isCommentVisible && DOM_loader.current) {
         observer = new IntersectionObserver(handleLoadMoreComments, {
            root: DOM_list.current,
            rootMargin: "300px",
            threshold: 0.1,
         });

         observer.observe(DOM_loader.current);
      }

      return () => observer?.unobserve(DOM_loader.current);
   }, [videoState, handleLoadMoreComments]);

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

         if (response.success) {
            // update comments list
            setComments((prev) => [response.data, ...prev]);

            // notify comment created successfully
            const handleClose = () => {
               setTimeout(() => {
                  uiDispatch({
                     type: ACTION_MODAL_TYPES.CLOSE_MODAL,
                  });
               }, 300); // delay 300ms to allow the animation to finish
            };

            uiDispatch({
               type: ACTION_MODAL_TYPES.OPEN_ALERT,
               modalProps: {
                  message: "Comment created successfully!",
                  openClassName: "slide-down",
                  closeClassName: "slide-up",
                  duration: 3000,
                  onClose: handleClose,
               },
            });
         }
      })();
   };

   const handleDeleteComment = (commentId) => {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
   };

   const handleClose = () => {
      setAnimation(false);
      videoDispatch({
         type: ACTION_VIDEOS_TYPE.CLOSE_COMMENT,
      });
   };

   return (
      <div
         className={cx("animation-wrapper", {
            open: animation,
            close: !animation,
         })}
      >
         {visible && (
            <div className={cx("wrapper", { [className]: className })}>
               <div className={cx("header")}>
                  <h4>Comments (24)</h4>
                  <button onClick={handleClose} className={cx("close-btn")}>
                     <span className={cx("icon")}>
                        <Icon_XMark />
                     </span>
                  </button>
               </div>

               <div className={cx("inner")}>
                  <ul ref={DOM_list}>
                     {comments.map((comment) => (
                        <li className={cx("comment-item")} key={comment.id}>
                           <CommentItem
                              onDelete={handleDeleteComment}
                              commentData={comment}
                           />
                        </li>
                     ))}

                     <li ref={DOM_loader} className={cx("loader")}></li>
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
