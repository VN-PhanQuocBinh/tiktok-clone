import { Icon_Search } from "./Icons";
import Navbar from "./Navbar";
import AudioControl from "./AudioControl";

import styles from "./Phone.module.scss";
import classNames from "classnames/bind";
import { useCallback, useRef, useState } from "react";

const cx = classNames.bind(styles);

const imgSong = {
   link: "data:image/jpeg;base64,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"
};
const categoryTabs = ["Recent", "Top 50", "Chill", "R&B", "Festival"];

const songList = [
   {
      name: "Bye Bye",
      singer: "Marshmello, Juice WRLD",
      duration: "2:09",
   },
   {
      name: "I Like You",
      singer: "Post Malone, Doja Cat",
      duration: "2:09",
   },
   {
      name: "Blinding Lights",
      singer: "The Weeknd",
      duration: "3:20",
   },
   {
      name: "Levitating",
      singer: "Dua Lipa",
      duration: "3:23",
   },
   {
      name: "Heat Waves",
      singer: "Glass Animals",
      duration: "3:58",
   },
   {
      name: "Bad Habits",
      singer: "Ed Sheeran",
      duration: "3:51",
   },
   {
      name: "Good 4 U",
      singer: "Olivia Rodrigo",
      duration: "2:58",
   },
   {
      name: "Peaches",
      singer: "Justin Bieber ft. Daniel Caesar, Giveon",
      duration: "3:18",
   },
   {
      name: "Stay",
      singer: "The Kid LAROI, Justin Bieber",
      duration: "2:21",
   },
   {
      name: "Montero (Call Me By Your Name)",
      singer: "Lil Nas X",
      duration: "2:17",
   },
   {
      name: "Drivers License",
      singer: "Olivia Rodrigo",
      duration: "4:02",
   },
];

function Phone({className, isZoom}) {
   const [isCollapsed, setIsCollapsed] = useState(false);
   const DOM_list = useRef(null);

   const handleScroll = useCallback((e) => {
      setIsCollapsed(DOM_list.current.scrollTop > 20);
   }, []);

   return (
      <div className={cx("container", {[className]: className})}>
         <div className={cx("gradient-circle")}></div>

         <div className={cx("inner")} ref={DOM_list} onScroll={handleScroll}>
            <div className={cx("header")}>
               <h3>Welcome back!</h3>
               <span>What do you feel like today?</span>
            </div>

            <div className={cx("category-section")}>
               <ul className={cx("tab")}>
                  {categoryTabs.map((title, key) => (
                     <li key={key}>{title}</li>
                  ))}
               </ul>

               <ul className={cx("categories")}>
                  <li>
                     <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsG7FJwdF1gnsCDvAHBZ6RXCrwbPFN_YfpgA&s"
                        alt=""
                     />
                     <span className={cx("name")}>R&B Playlist</span>
                     <span className={cx("description")}>Chill your mind</span>
                  </li>
                  <li>
                     <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwJilRJXGMW2mST8NGa6ob1MKW6B73FZu0sw&s"
                        alt=""
                     />
                     <span className={cx("name")}>Daily Mix 2</span>
                     <span className={cx("description")}>Made for you</span>
                  </li>
               </ul>
            </div>

            <div className={cx("favorite")}>
               <span className={cx("title")}>Your favourites</span>

               <ul>
                  {songList.map((song, key) => (
                     <li key={key}>
                        <img src={imgSong.link} alt="" />
                        <div className={cx("content")}>
                           <span>{song.name}</span>
                           <span>{song.singer}</span>
                        </div>
                        <span>{song.duration}</span>
                     </li>
                  ))}
               </ul>
            </div>
         </div>

         <div className={cx("overlay-control", { collapsed: isCollapsed })}>
            <Navbar isZoom={isZoom} collapsed={isCollapsed} className={cx("navbar")} />

            <AudioControl
               collapsed={isCollapsed}
               className={cx("audio-control")}
            />

            <button className={cx("search-btn")}>
               <div className={cx("border")}>
                  <div className={cx("blur")}>
                     <Icon_Search className={cx("icon")} />
                  </div>
               </div>
            </button>
         </div>
      </div>
   );
}

export default Phone;
