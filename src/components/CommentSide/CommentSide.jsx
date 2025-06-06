import {
   useCallback,
   useEffect,
   useLayoutEffect,
   useMemo,
   useReducer,
   useRef,
   useState,
} from "react";
import { useVideo } from "../../contexts/VideoContext/VideoContext";
import { useUI } from "../../contexts/UIContext/UIContext";
import { useAuth } from "../../contexts/AuthContext";

import CommentItem from "./CommentItem";
import CommentSideSkeleton from "./CommentItemSkeleton";
import { Icon_XMark, Icon_Tag, Icon_Emoji } from "../../assets/Icons";
import _ from "lodash";
import { ACTION_MODAL_TYPES, ACTION_VIDEOS_TYPE } from "../../constants";

import {
   getComments,
   createComment,
} from "../../services/commentsService/commentsService";
import { getToken } from "../../utils/token";

import styles from "../../assets/styles/components/CommentSide/CommentSide.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MAX_LENGTH = 150;
const initCommentPage = { page: 1, limit: 1, total: 0 };

const initialSkeletonState = {
   initLoading: true,
   moreLoading: false,
};

const ACTION_SKELETON_TYPE = {
   RESET_SKELETON: "reset_skeleton",
   SET_INIT_LOADING: "set_init_loading",
   SET_MORE_LOADING: "set_more_loading",
};

const skeletonReducer = (state, action) => {
   switch (action.type) {
      case ACTION_SKELETON_TYPE.SET_INIT_LOADING:
         return {
            ...state,
            initLoading: action.payload,
         };
      case ACTION_SKELETON_TYPE.SET_MORE_LOADING:
         return {
            ...state,
            moreLoading: action.payload,
         };
      case ACTION_SKELETON_TYPE.RESET_SKELETON:
         return {
            ...state,
            moreLoading: false,
            initLoading: false,
         };
      default:
         return state;
   }
};

function CommentSide({ className }) {
   const { state: videoState, dispatch: videoDispatch } = useVideo();
   const { dispatch: uiDispatch } = useUI();
   const { isLoggedIn } = useAuth()

   const currentVideoId = useMemo(() => videoState.videoId, [videoState]);
   const [commentValue, setCommentValue] = useState("");
   const [comments, setComments] = useState([]);
   const [commentPage, setCommentPage] = useState(initCommentPage);

   const [visible, setVisible] = useState(videoState.isCommentVisible);
   const [originalHeight, setOriginalHeight] = useState(0);
   const [animation, setAnimation] = useState(false);
   const [hidePlaceholder, setHidePlaceholder] = useState(false);
   const [hideCount, setHideCount] = useState(true);
   const [skeletonLoading, dispatchSkeleton] = useReducer(
      skeletonReducer,
      initialSkeletonState
   );

   const DOM_comments = useRef([]);
   const DOM_loader = useRef(null);
   const DOM_list = useRef(null);
   const DOM_input = useRef(null);

   const currentVideoIdRef = useRef(-1);
   const commentListRef = useRef(comments);
   const commentPageRef = useRef(commentPage);

   // Update ref for caching
   useEffect(() => {
      commentListRef.current = comments;
   }, [comments]);

   useEffect(() => {
      commentPageRef.current = commentPage;
   }, [commentPage]);

   // Handle Animation open/close
   useEffect(() => {
      if (videoState.isCommentVisible && isLoggedIn) {
         setVisible(true);
         setAnimation(true);
      } else {
         setAnimation(false);
         setTimeout(() => {
            setVisible(false);
         }, 200); // delay 300ms to allow the animation to finish
      }
   }, [videoState, isLoggedIn]);

   const getCommentsByPage = useCallback(
      async (page = 1) => {
         const response = await getComments(getToken(), currentVideoId, page);

         const { success, data } = response;
         const { data: commentData, meta } = data || {};

         return {
            success,
            commentData: success ? commentData : [],
            maxPage: meta?.pagination?.total_pages || 1,
            totalComments: meta?.pagination?.total || 0,
         };
      },
      [currentVideoId]
   );

   const handleLoadMoreComments = useCallback(
      async ([entries]) => {
         const { isIntersecting } = entries;

         const nextPage = commentPage.page + 1;
         if (isIntersecting && nextPage <= commentPage.limit) {
            dispatchSkeleton({
               type: ACTION_SKELETON_TYPE.SET_MORE_LOADING,
               payload: true,
            });

            const { success, commentData: newComments } =
               await getCommentsByPage(nextPage);

            if (success) {
               setCommentPage((prev) => ({ ...prev, page: nextPage }));
               setComments((prev) => [...prev, ...newComments]);
            }

            dispatchSkeleton({
               type: ACTION_SKELETON_TYPE.SET_MORE_LOADING,
               payload: false,
            });
         }
      },
      [commentPage, getCommentsByPage]
   );

   // Hanlde blur every comment
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

   // Handle placeholder and counter visibility
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

   // store input box's original height
   useEffect(() => {
      if (DOM_input.current) {
         setOriginalHeight(DOM_input.current.clientHeight);
      }
   }, [visible]);

   // Caching comments when the component is unmounted
   useEffect(() => {
      return () => {
         if (visible) {
            const comments = commentListRef.current;
            const { page, limit, total } = commentPageRef.current;

            videoDispatch({
               type: ACTION_VIDEOS_TYPE.CACHING_COMMENTS,
               payload: {
                  videoId: videoState.videoId,
                  commentsCache: {
                     page,
                     limit,
                     total,
                     comments,
                  },
               },
            });
         }
      };
   }, [visible, currentVideoId]);

   // Initial fetch comments when a new video is visible
   useEffect(() => {
      if (visible && currentVideoId !== currentVideoIdRef.current) {
         const {
            comments: commentsCacheData,
            page,
            limit,
            total,
         } = videoState?.videosCache[currentVideoId]?.commentsCache;

         // FOR ANIMATION
         DOM_list.current?.scrollTo({
            top: 0,
            behavior: "instant",
         });

         // visible skeleton loading when get new video's comments
         dispatchSkeleton({
            type: ACTION_SKELETON_TYPE.SET_INIT_LOADING,
            payload: true,
         });

         // FOR INIT DATA
         if (commentsCacheData.length == 0) {
            (async () => {
               const { success, commentData, maxPage, totalComments } =
                  await getCommentsByPage(1);

               if (success) {
                  // Set comments and pagination
                  setComments(commentData);
                  setCommentPage((prev) => ({
                     ...prev,
                     page: 1,
                     limit: maxPage,
                     total: totalComments,
                  }));
               } else {
                  // Reset comments and pagnination if fetch failed
                  setComments([]);
                  setCommentPage(initCommentPage);
               }

               // Hide skeleton loading
               dispatchSkeleton({
                  type: ACTION_SKELETON_TYPE.SET_INIT_LOADING,
                  payload: false,
               });
            })();
         } else {
            // Set comments and pagination
            setComments(commentsCacheData);
            setCommentPage((prev) => ({
               ...prev,
               page,
               limit,
               total,
            }));
            // Hide skeleton loading
            dispatchSkeleton({
               type: ACTION_SKELETON_TYPE.SET_INIT_LOADING,
               payload: false,
            });
         }

         // Update currentVideoIdRef and reset states
         if (currentVideoIdRef.current != currentVideoId) {
            currentVideoIdRef.current = currentVideoId;
         }
      }
   }, [videoState, visible]);

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
         const {success, data} = await createComment(token, videoId, commentValue);

         // reset input value
         DOM_input.current.textContent = "";
         setCommentValue("");

         if (success) {
            // update comments list
            setComments((prev) => [data, ...prev]);
            setCommentPage((prev) => ({
               ...prev,
               total: prev.total + 1,
            }));

            // declare handle close notify function
            const handleCloseAlert = () => {
               setTimeout(() => {
                  uiDispatch({
                     type: ACTION_MODAL_TYPES.CLOSE_MODAL,
                  });
               }, 300); // delay 300ms to allow the animation to finish
            };

            // notify create comment successfully
            uiDispatch({
               type: ACTION_MODAL_TYPES.OPEN_ALERT,
               modalProps: {
                  message: "Comment created successfully!",
                  openClassName: "slide-down",
                  closeClassName: "slide-up",
                  duration: 3000,
                  onClose: handleCloseAlert,
               },
            });
         }
      })();
   };

   const handleDeleteComment = (commentId) => {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      setCommentPage((prev) => ({
         ...prev,
         total: prev.total - 1,
      }));
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
                        <li key={7}>
                           <CommentSideSkeleton />
                        </li>
                     )}

                     {!(
                        skeletonLoading.initLoading ||
                        skeletonLoading.moreLoading
                     ) && <li ref={DOM_loader} className={cx("loader")}></li>}
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
                                 active: commentValue.length === MAX_LENGTH,
                              })}
                           >
                              {commentValue.length}/{MAX_LENGTH}
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
