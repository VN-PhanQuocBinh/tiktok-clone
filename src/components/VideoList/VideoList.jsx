import VideoItem from "./VideoItem";
import * as videoService from "../../services/videoService/videoService.jsx";

import classNames from "classnames/bind";
import styles from "../../assets/styles/components/VideoList.module.scss";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function VideoList() {
   const [videos, setVideos] = useState([]);

   useEffect(() => {
      const fetchAPI = async () => {
         const response = await videoService.getVideo("for-you", 1);
         console.log(response);
         setVideos(response);
      };

      fetchAPI();
   }, []);

   return (
      <div className={cx("wrapper")}>
         <ul className={cx("list")}>
            {videos.map((video) => (
               <VideoItem key={video.id} video={video} />
            ))}
         </ul>
      </div>
   );
}

export default VideoList;
