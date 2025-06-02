import { useCallback, useEffect, useRef, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";

import VideoItem from "./VideoItem";
import { Icon_AngleLeft } from "../../assets/Icons/index.jsx";
import * as videoService from "../../services/videoService/videoService.jsx";

import classNames from "classnames/bind";
import styles from "../../assets/styles/components/VideoList.module.scss";

const cx = classNames.bind(styles);

const initVideoPage = { page: 1, limit: 1 };

function VideoList() {
   const [videos, setVideos] = useState([]);
   const [videoPage, setVideoPage] = useState(initVideoPage);
   const [disabled, setDisabled] = useState(true);
   const DOM_list = useRef(null);
   const DOM_loader = useRef(null);
   const isMatchQuery = useMediaQuery("(max-width: 768px)");

   const fetchVideos = useCallback(async (page = 1) => {
      const response = await videoService.getVideo("for-you", page);
      const { success, data, message, meta } = response;

      return {
         success,
         data: data || [],
         message: !success ? "Error fetching videos" : message,
         meta: meta || {},
      };
   }, []);

   useEffect(() => {
      (async () => {
         const { data, meta } = await fetchVideos(videoPage.page);
         setVideos(data);
         setVideoPage((prev) => ({
            ...prev,
            limit: meta?.pagination?.total_pages,
         }));
      })();
   }, []);

   useEffect(() => {
      const handleLoadMoreVideo = async ([entries]) => {
         if (entries.isIntersecting) {
            const newPage = videoPage.page + 1;

            if (newPage <= videoPage.limit) {
               // console.log("loading successfully!");

               const { success, data } = await fetchVideos(newPage);

               if (success) {
                  setVideoPage((prev) => ({
                     ...prev,
                     page: newPage,
                  }));
                  setVideos((prev) => [...prev, ...data]);
               }
            }
         }
      };

      let observer;
      if (DOM_loader.current) {
         observer = new IntersectionObserver(handleLoadMoreVideo, {
            root: DOM_list.current,
            rootMargin: "300px",
            threshold: 0.1,
         });

         observer.observe(DOM_loader.current);
      }

      return () => DOM_loader.current && observer.unobserve(DOM_loader.current);
   }, [videos, videoPage]);

   const scrollByItem = (direction) => {
      if (!DOM_list.current) return;

      const itemHeight = DOM_list.current?.firstChild?.offsetHeight;

      DOM_list.current.scrollBy({
         top: direction * itemHeight,
         behavior: "smooth",
      });
   };


   // Lazyload disabled state of scroll button
   useEffect(() => {
      let timerId;

      const hanldeScroll = () => {
         clearTimeout(timerId);
         // console.log("time out...");

         timerId = setTimeout(() => {
            // console.log("completed");

            if (DOM_list.current.scrollTop <= 0) setDisabled(true);
            else setDisabled(false);
         }, 250);
      };

      DOM_list.current?.addEventListener("scroll", hanldeScroll);

      return () => {
         DOM_list.current?.removeEventListener("scroll", hanldeScroll);
      };
   }, []);

   return (
      <div className={cx("wrapper")}>
         <ul ref={DOM_list} className={cx("list")}>
            {videos?.map((video) => (
               <VideoItem key={video.id} video={video} />
            ))}

            <li
               key={"-1"}
               ref={DOM_loader}
               style={{ display: "block", height: "1px", width: "100%" }}
            ></li>
         </ul>

         {!isMatchQuery && (
            <div className={cx("scroll-buttons")}>
               <button
                  onClick={() => scrollByItem(-1)}
                  className={cx("up-btn")}
                  disabled={disabled}
               >
                  <Icon_AngleLeft className={cx("icon")} />
               </button>

               <button
                  onClick={() => scrollByItem(1)}
                  className={cx("down-btn")}
               >
                  <Icon_AngleLeft className={cx("icon")} />
               </button>
            </div>
         )}
      </div>
   );
}

export default VideoList;
