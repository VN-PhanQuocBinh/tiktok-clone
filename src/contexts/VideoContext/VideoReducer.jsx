import {
   ACTION_VIDEOS_TYPE as ACTION_TYPES,
   ACTION_VIDEOS_TYPE,
} from "../../constants";

const initVideoCache = {
   isLiked: false,
   commentsCache: {
      page: null,
      limit: null,
      total: null,
      comments: [],
   },
};

const initState = {
   videoId: null,
   userId: null,
   commentsCache: {},
   videosCache: {},
   isCommentVisible: false,
   volumeValue: {
      previous: 0.3,
      current: 0.3,
   },
};

const videoReducer = (state, action) => {
   switch (action.type) {
      // case ACTION_TYPES.INIT_VIDEOS_CACHE:
      //    const initVideoCache = {}

      //    return {
      //       ...state,
      //    }
      case ACTION_TYPES.UPDATE_VIDEOID:
         return {
            ...state,
            videoId: action.payload.uuid,
            userId: action.payload.userId,
         };
      case ACTION_TYPES.CLOSE_COMMENT:
         return {
            ...state,
            isCommentVisible: false,
         };
      case ACTION_TYPES.OPEN_COMMENT:
         return {
            ...state,
            isCommentVisible: true,
         };
      case ACTION_TYPES.CACHING_VIDEOS: {
         console.log("cache videos", action.payload);
         const newVideosCache = {};
         const list = action.payload;
         list.forEach((video) => {
            newVideosCache[video.uuid] = initVideoCache;
         });

         return {
            ...state,
            videosCache: { ...state.videosCache, ...newVideosCache },
         };
      }
      case ACTION_TYPES.TOGGLE_LIKE_VIDEO:
         const { videoId, value } = action.payload

         const newVideosCache = {
            ...state.videosCache,
            [videoId]: {
               ...state.videosCache[videoId],
               isLiked: value
            }
         }

         return {
            ...state,
            videosCache: newVideosCache
         };
      case ACTION_TYPES.CACHING_COMMENTS:
         const payload = action.payload;

         return {
            ...state,
            commentsCache: {
               ...state.commentsCache,
               [action.payload.videoId]: {
                  page: payload.page,
                  limit: payload.limit,
                  total: payload.total,
                  comments: payload.comments,
               },
            },
         };
      case ACTION_TYPES.TOGGLE_LIKE_COMMENT:
         const newCommentsCache = state.commentsCache[
            action.payload.videoId
         ].comments.map((comment) => {
            if (comment.id === action.payload.commentId) {
               return {
                  ...comment,
                  is_liked: !comment.is_liked,
                  likes_count:
                     comment.likes_count + (comment.likes_count ? 1 : -1),
               };
            }
            return comment;
         });

         return {
            ...state,
            commentsCache: newCommentsCache,
         };
      case ACTION_VIDEOS_TYPE.SET_VOLUME:
         return {
            ...state,
            volumeValue: {
               previous: state.volumeValue.current || 0,
               current: action.payload || 0,
            },
         };
      default:
         return state;
   }
};

export { ACTION_TYPES, initState, videoReducer };
