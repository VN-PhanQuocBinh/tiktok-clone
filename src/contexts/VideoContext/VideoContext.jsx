import { createContext, useCallback, useContext, useReducer } from "react";
import { useUI } from "../UIContext/UIContext";

import { ACTION_MODAL_TYPES, AUTH_TYPE } from "../../types";

import { initState, videoReducer } from "./VideoReducer";

import {
   likeVideo,
   unlikeVideo,
} from "../../services/videoService/videoService";
import { getToken } from "../../utils/token";
import { ACTION_VIDEOS_TYPE } from "../../types";

const VideoContext = createContext(null);

function VideoProvider({ children }) {
   const [state, dispatch] = useReducer(videoReducer, initState);
   const { dispatch: uiDispatch } = useUI();

   const handleToggleLikeVideo = useCallback(
      async (videoId) => {
         const token = getToken();

         if (token?.length > 0) {
            const currentState = state.videosCache[videoId].isLiked;
            dispatch({
               type: ACTION_VIDEOS_TYPE.TOGGLE_LIKE_VIDEO,
               payload: {
                  videoId,
                  value: !currentState,
               },
            });

            const { success } = await (currentState
               ? unlikeVideo(token, videoId)
               : likeVideo(token, videoId));

            if (!success) {
               dispatch({
                  type: ACTION_VIDEOS_TYPE.TOGGLE_LIKE_VIDEO,
                  payload: {
                     videoId,
                     value: currentState,
                  },
               });
            }
         } else {
            uiDispatch({
               type: ACTION_MODAL_TYPES.OPEN_AUTH_MODALS,
               modalProps: { type: AUTH_TYPE.LOGIN_OPTIONS },
            });
         }
      },
      [state]
   );

   return (
      <VideoContext.Provider
         value={{
            state,
            dispatch,
            actions: { toggleLikeVideo: handleToggleLikeVideo },
         }}
      >
         {children}
      </VideoContext.Provider>
   );
}

const useVideo = () => useContext(VideoContext);

export { useVideo, VideoProvider };
