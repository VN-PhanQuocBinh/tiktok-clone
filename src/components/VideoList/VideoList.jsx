import { useEffect, useRef, useState } from "react";

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
   
   useEffect(() => {
      const fetchAPI = async () => {
         const response = await videoService.getVideo("for-you", 1);
         console.log(response);
         setVideos(response);
      };

      fetchAPI();
   }, []);


   // useEffect(() => {
   //    if (!DOM_list.current) return

   //    const hanldeScroll = () => {
   //       console.log("scroll ", DOM_list.current.scrollTop);
         
         
   //    }

   //    DOM_list.current.addEventListener("scroll", hanldeScroll)

   //    return () => DOM_list.current.removeEventListener("scroll", hanldeScroll)
   // }, [])

   const scrollByItem = (direction) => {
      if (!DOM_list.current) return

      const itemHeight = DOM_list.current?.firstChild?.offsetHeight
      // console.log(DOM_list.current.scrollTop + direction * itemHeight);
      

      if (DOM_list.current.scrollTop + direction * itemHeight <= 1) 
         setDisabled(true)
      else 
         setDisabled(false)
      
      DOM_list.current.scrollBy({
         top: direction * itemHeight,
         behavior: "smooth"
      })
   }

   return (
      <div className={cx("wrapper")}>
         <ul ref={DOM_list} className={cx("list")}>
            {videos.map((video) => (
               <VideoItem key={video.id} video={video} />
            ))}
         </ul>

         <div className={cx("scroll-buttons")}>
            <button onClick={() => scrollByItem(-1)} className={cx("up-btn")} disabled={disabled}> 
               <Icon_AngleLeft className={cx("icon")} />
            </button>

            <button onClick={() => scrollByItem(1)} className={cx("down-btn")}> 
               <Icon_AngleLeft className={cx("icon")} />
            </button>
         </div>
      </div>
   );
}

export default VideoList;
