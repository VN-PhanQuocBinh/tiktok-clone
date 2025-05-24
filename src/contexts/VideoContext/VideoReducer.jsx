import { ACTION_VIDEOS_TYPE as ACTION_TYPES } from "../../constants";

const initState = {
   videoId: null,
   commentsCache: {},
   isCommentVisible: false,
};

const videoReducer = (state, action) => {
   switch (action.type) {
      case ACTION_TYPES.UPDATE_VIDEOID:
         return {
            ...state,
            videoId: action.payload,
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
      case ACTION_TYPES.CACHING_COMMENTS:
         return {
            ...state,
            commentsCache: {
               ...state.commentsCache,
               [action.payload.videoId]: action.payload.comments,
            },
         }
      default:
         return state;
   }
};

export { ACTION_TYPES, initState, videoReducer };
