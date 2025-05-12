// src/components/Profile/VideoGrid.jsx
import { useState, useEffect, useLayoutEffect, memo } from "react";
import VideoItem from "./VideoItem";

import { useAuth } from "../../contexts/AuthContext";
import { getUserVideo } from "../../services/videoService/userVideo";
import sortVideosMethods from "../../utils/sortVideo";

import styles from "../../assets/styles/components/Profile/VideoGrid.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const TABS = {
   VIDEOS: "videos",
   REPOSTS: "reposts",
   FAVORITES: "favorites",
   LIKED: "liked",
};

const SORT_OPTIONS = {
   LATEST: "latest",
   POPULAR: "popular",
   OLDEST: "oldest",
};

function VideoGrid({ userId, activeTab, sortOption }) {
   const [videos, setVideos] = useState([]);
   const [loading, setLoading] = useState(true);

   const [playingVideo, setPlayingVideo] = useState(-1);

   useEffect(() => {
      const fetchVideo = async () => {
         try {
            setLoading(true);
            const response = await getUserVideo(userId);
            // console.log(response);
            setVideos(sortVideosMethods[sortOption](response));
            setLoading(false);
         } catch (error) {
            console.log("Video Grid: ", error);
         }
      };

      if (userId) fetchVideo();
   }, [userId]);

   useEffect(() => {
      setPlayingVideo(-1)
   }, [userId, activeTab, sortOption])

   useEffect(() => {
      // console.log(sortOption);
      
      setVideos(prev => {
         let newVideos = [...prev]
         return sortVideosMethods[sortOption](newVideos)
      })
   }, [sortOption])

   const handlePointerEnter = (id) => {
      // console.log(id);
      setPlayingVideo(id)
   };

   // console.log("re-render");
   

   return (
      <div className={cx("wrapper")}>
         {loading ? (
            <p>Loading...</p>
         ) : activeTab !== TABS.LIKED ? (
            videos.length > 0 ? (
               <div className={cx("video-grid")}>
                  {videos.map((video) => (
                     <VideoItem
                        onPointerEnter={() => handlePointerEnter(video.id)}
                        isPlay={playingVideo === video.id}
                        className={cx("video-item")}
                        key={video.id}
                        video={video}
                     />
                  ))}
                  {/* <VideoItem className={cx("video-item")} key={videos[2].id + 1} video={videos[2]} /> */}
               </div>
            ) : (
               <p className={cx("not-found")}>No {activeTab} found.</p>
            )
         ) : (
            <div className={cx("locked")}>
               <p>This user's liked videos are private.</p>
            </div>
         )}
      </div>
   );
}

export default memo(VideoGrid);
