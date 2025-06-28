import {
   ACTION_VIDEOS_TYPE as ACTION_TYPES,
   ACTION_VIDEOS_TYPE,
} from "../../types";

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
         const { videoId, value } = action.payload;

         const newVideosCache = {
            ...state.videosCache,
            [videoId]: {
               ...state.videosCache[videoId],
               isLiked: value,
            },
         };

         return {
            ...state,
            videosCache: newVideosCache,
         };
      case ACTION_TYPES.CACHING_COMMENTS: {
         const { videoId, commentsCache } = action.payload;
         const newVideosCache = {...state.videosCache}
         newVideosCache[videoId] = {...newVideosCache[videoId], commentsCache} 

         return {
            ...state,
            videosCache: {...newVideosCache},
         };
      }
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
