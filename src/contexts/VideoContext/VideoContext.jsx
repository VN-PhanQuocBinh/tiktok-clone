import { createContext, useContext, useReducer } from "react";
import { initState, videoReducer } from "./VideoReducer";

const VideoContext = createContext(null)

function VideoProvider({ children }) {
   const [state, dispatch] = useReducer(videoReducer, initState)

   return (
      <VideoContext.Provider value={{state, dispatch}}>
         {children}
      </VideoContext.Provider>
   )
}

const useVideo = () => useContext(VideoContext)

export { useVideo, VideoProvider }