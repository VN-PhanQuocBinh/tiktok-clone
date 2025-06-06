import { createContext, useCallback, useContext, useReducer } from "react";
import { initState, videoReducer } from "./VideoReducer";

import {
   likeVideo,
   unlikeVideo,
} from "../../services/videoService/videoService";
import { getToken } from "../../utils/token";
import { ACTION_VIDEOS_TYPE } from "../../constants";

const VideoContext = createContext(null);

function VideoProvider({ children }) {
   const [state, dispatch] = useReducer(videoReducer, initState);

   const handleToggleLikeVideo = useCallback(
      async (videoId) => {
         const currentState = state.videosCache[videoId].isLiked;

         dispatch({
            type: ACTION_VIDEOS_TYPE.TOGGLE_LIKE_VIDEO,
            payload: {
               videoId,
               value: !currentState,
            },
         });

         const token = getToken();
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
