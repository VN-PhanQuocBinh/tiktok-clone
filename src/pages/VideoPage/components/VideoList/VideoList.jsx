import { useState, useEffect, useRef } from "react";

import SearchComponent from "./SearchComponent";
import VideoItem from "./VideoItem";

import * as videoService from "../../../../services/videoService/videoService";

import {
   Icon_VolumeRegular,
   Icon_VolumeRegularXmark,
   Icon_HeartSolid,
   Icon_Emoji,
   Icon_XMark,
   Icon_EllipsisVertical,
   Icon_AngleLeft,
} from "../../../../assets/Icons";

import styles from "../../../../assets/styles/pages/VideoPage/VideoList/VideoList.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function VideoList() {
   const [videos, setVideos] = useState([]);
   const DOM_list = useRef(null);
   const [disabled, setDisabled] = useState(true);

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
         <ul ref={DOM_list} className={cx("list")}>
            {videos.map((video) => (
               <VideoItem key={video.id} video={video} />
            ))}
         </ul>

         <div className={cx("scroll-buttons")}>
            <button
               onClick={() => scrollByItem(-1)}
               className={cx("up-btn")}
               disabled={disabled}
            >
               <Icon_AngleLeft className={cx("icon")} />
            </button>

            <button onClick={() => scrollByItem(1)} className={cx("down-btn")}>
               <Icon_AngleLeft className={cx("icon")} />
            </button>
         </div>

         <button className={cx("back-btn")}>
            <span className={cx("icon")}>
               <Icon_XMark />
            </span>
         </button>

         <SearchComponent className={cx("search-bar")} />
      </div>
   );
}

export default VideoList;
