import { useEffect, useRef, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";

import VideoItem from "./VideoItem";
import { Icon_AngleLeft } from "../../assets/Icons/index.jsx";
import * as videoService from "../../services/videoService/videoService.jsx";

import classNames from "classnames/bind";
import styles from "../../assets/styles/components/VideoList.module.scss";

const cx = classNames.bind(styles);

function VideoList() {
   const [videos, setVideos] = useState([]);
   const [disabled, setDisabled] = useState(true)
   const DOM_list = useRef(null)
   const isMatchQuery = useMediaQuery("(max-width: 768px)");
   
   useEffect(() => {
      const fetchAPI = async () => {
         const response = await videoService.getVideo("for-you", 1);
         // console.log(response);
         setVideos(response);
      };

      fetchAPI();
   }, []);

   const scrollByItem = (direction) => {
      if (!DOM_list.current) return

      const itemHeight = DOM_list.current?.firstChild?.offsetHeight
      
      DOM_list.current.scrollBy({
         top: direction * itemHeight,
         behavior: "smooth"
      })
   }

   useEffect(() => {
      let timerId

      const hanldeScroll = () => {
         clearTimeout(timerId)
         // console.log("time out...");
         
         timerId = setTimeout(() => {
            // console.log("completed");

            if (DOM_list.current.scrollTop <= 0) 
               setDisabled(true)
            else 
               setDisabled(false)
         }, 250)
      }

      DOM_list.current?.addEventListener("scroll", hanldeScroll)

      return () => {
         DOM_list.current?.removeEventListener("scroll", hanldeScroll)
      }
   }, [])

   return (
      <div className={cx("wrapper")}>
         <ul ref={DOM_list} className={cx("list")}>
            {videos.map((video) => (
               <VideoItem key={video.id} video={video} />
            ))}
         </ul>

         {
            !isMatchQuery &&
            <div className={cx("scroll-buttons")}>
               <button onClick={() => scrollByItem(-1)} className={cx("up-btn")} disabled={disabled}> 
                  <Icon_AngleLeft className={cx("icon")} />
               </button>

               <button onClick={() => scrollByItem(1)} className={cx("down-btn")}> 
                  <Icon_AngleLeft className={cx("icon")} />
               </button>
            </div>
         }
      </div>
   );
}

export default VideoList;
