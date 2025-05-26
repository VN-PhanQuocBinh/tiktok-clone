import {
   useCallback,
   useEffect,
   useLayoutEffect,
   useRef,
   useState,
} from "react";
import { useVideo } from "../../contexts/VideoContext/VideoContext";
import { useUI } from "../../contexts/UIContext/UIContext";

import CommentItem from "./CommentItem";
import CommentSideSkeleton from "./CommentItemSkeleton";

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
const initCommentPage = { page: 1, limit: 1, total: 0 };

function CommentSide({ className }) {
   const { state: videoState, dispatch: videoDispatch } = useVideo();
   const { dispatch: uiDispatch } = useUI();

   const [visible, setVisible] = useState(videoState.isCommentVisible);

   const [comments, setComments] = useState([]);
   const [commentPage, setCommentPage] = useState(initCommentPage);

   const [commentValue, setCommentValue] = useState("");
   const [originalHeight, setOriginalHeight] = useState(0);

   const [animation, setAnimation] = useState(false);
   const [hidePlaceholder, setHidePlaceholder] = useState(false);
   const [hideCount, setHideCount] = useState(true);

   const [skeletonLoading, setSkeletonLoading] = useState({
      initLoading: true,
      moreLoading: false,
   });

   const DOM_comments = useRef([]);
   const DOM_loader = useRef(null);
   const DOM_list = useRef(null);
   const DOM_input = useRef(null);

   const currentVideoId = useRef(-1);

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
            totalComments: meta?.pagination?.total || 0,
         };
      },
      [commentPage, videoState]
   );

   useEffect(() => {
      const handleClickOutside = (e) => {
         DOM_comments.current?.forEach((comment) => {
            comment?.handleClickOutside(e);
         });
      };

      document.addEventListener("click", handleClickOutside);
      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [visible, comments]);

   // Caching comments when the component unmounts
   useEffect(() => {
      if (
         comments.length > 0 &&
         !_.isEqual(videoState.commentsCache[videoState.videoId], comments)
      ) {
         videoDispatch({
            type: ACTION_VIDEOS_TYPE.CACHING_COMMENTS,
            payload: {
               videoId: videoState.videoId,
               comments: comments,
            },
         });
      }
   }, [comments, videoState]);

   // Initial fetch comments when the new video is visible
   useLayoutEffect(() => {
      const { videoId, commentsCache, isCommentVisible } = videoState;

      // Get comments when the videoId changes
      if (videoId && currentVideoId.current != videoId && visible) {
         // Scroll to top when render new video's comments
         DOM_list.current?.scrollTo({
            top: 0,
            behavior: "instant",
         });

         // Get new video's comments
         setSkeletonLoading((prev) => {
            console.log("a");
            return {
               ...prev,
               initLoading: true,
            };
         });
         if (!commentsCache[videoId]) {
            (async () => {
               const { success, commentData, maxPage, totalComments } =
                  await fetchComments(1);

               setCommentPage((prev) => ({
                  ...prev,
                  limit: maxPage,
                  total: totalComments,
               }));

               if (commentData.length > 0) setComments(commentData);
               if (success)
                  setSkeletonLoading((prev) => {
                     console.log("b");
                     return {
                        ...prev,
                        initLoading: false,
                     };
                  });
            })();
         } else if (commentsCache[videoId]) {
            setComments(commentsCache[videoId]);

            setCommentPage((prev) => ({
               ...prev,
               total: commentsCache[videoId].length,
            }));
         }

         // Update currentVideoId and reset states
         if (currentVideoId.current != videoId) {
            currentVideoId.current = videoId;
            // setCommentPage(initCommentPage);
         }
      }

      // Handle Animation
      if (isCommentVisible) {
         setVisible(true);
         setAnimation(true);
      } else {
         setAnimation(false);
         setTimeout(() => {
            setVisible(false);
         }, 200); // delay 300ms to allow the animation to finish
      }
   }, [videoState, visible]);

   const handleLoadMoreComments = useCallback(
      async ([entries]) => {
         const { isIntersecting } = entries;

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

      if (visible && DOM_loader.current) {
         observer = new IntersectionObserver(handleLoadMoreComments, {
            root: DOM_list.current,
            rootMargin: "300px",
            threshold: 0.1,
         });

         observer.observe(DOM_loader.current);
      }

      return () =>
         DOM_loader.current && observer?.unobserve(DOM_loader.current);
   }, [visible, handleLoadMoreComments]);

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

   const handleToggleLikeComment = useCallback(
      (commentId) => {
         const newComments = comments.map((comment) => {
            if (comment.id === commentId) {
               return {
                  ...comment,
                  is_liked: !comment.is_liked,
                  likes_count:
                     comment.likes_count + (comment.is_liked ? -1 : 1),
               };
            }
            return comment;
         });

         setComments(newComments);
      },
      [comments]
   );

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
                  <h4>Comments ({commentPage.total})</h4>
                  <button onClick={handleClose} className={cx("close-btn")}>
                     <span className={cx("icon")}>
                        <Icon_XMark />
                     </span>
                  </button>
               </div>

               <div className={cx("inner")}>
                  <ul ref={DOM_list} className="list">
                     {!skeletonLoading.initLoading &&
                        comments.map((comment, index) => (
                           <li className={cx("comment-item")} key={comment.id}>
                              <CommentItem
                                 ref={(ref) =>
                                    (DOM_comments.current[index] = ref)
                                 }
                                 onToggleLikeComment={handleToggleLikeComment}
                                 onDelete={handleDeleteComment}
                                 commentData={comment}
                              />
                           </li>
                        ))}

                     {skeletonLoading.initLoading &&
                        [1, 2, 3, 4, 5, 6].map((item) => (
                           <li key={item}>
                              <CommentSideSkeleton />
                           </li>
                        ))}

                     {skeletonLoading.moreLoading && (
                        <li>
                           <CommentSideSkeleton key={item} />
                        </li>
                     )}

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
