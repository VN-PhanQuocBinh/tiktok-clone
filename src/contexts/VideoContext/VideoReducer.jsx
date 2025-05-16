const ACTION_TYPE = {
   UPDATE_VIDEOID: "update_videoid",
   CLOSE_COMMENT: "close_comment",
   OPEN_COMMENT: "open_comment"
}

const initState = {
   videoId: null,
   isCommentVisible: false
}

const videoReducer = (state, action) => {
   switch (action.type) {
      case ACTION_TYPE.UPDATE_VIDEOID:
         return {

         }
      case ACTION_TYPE.CLOSE_COMMENT:
         return {

         }
      case ACTION_TYPE.OPEN_COMMENT:
         return {
            ...state,
            isCommentVisible: true
         }
      default:   
         return state
   }
} 

export {
   ACTION_TYPE,
   initState,
   videoReducer
}