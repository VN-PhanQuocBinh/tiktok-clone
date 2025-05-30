import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

import ProfileHeader from "../../components/Profile/ProfileHeader";
import VideoGrid from "../../components/Profile/VideoGrid";

import {
   Icon_Videos,
   Icon_Repost,
   Icon_Favourites,
   Icon_Liked,
} from "../../assets/Icons";

import { getCurrentUser } from "../../services/authService/authService";
import { getUser } from "../../services/userService/userServices";
import { getToken } from "../../utils/token";
import { formatLabel } from "../../utils/formatString";

import styles from "./Profile.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

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

export default function Profile() {
   const { user, isLoggedIn } = useAuth();
   const { nickname } = useParams();

   const [displayUser, setDisplayUser] = useState({});

   const [activeTab, setActiveTab] = useState(TABS.VIDEOS);
   const [sortOption, setSortOption] = useState(SORT_OPTIONS.LATEST);
   const [isMyProfile, setIsMyProfile] = useState(false);

   const DOM_tabs = useRef(null);
   const DOM_tabItems = useRef({
      [TABS.VIDEOS]: null,
      [TABS.REPOSTS]: null,
      [TABS.FAVORITES]: null,
      [TABS.LIKED]: null,
   });
   const DOM_activeLine = useRef(null);

   const [rectActiveLine, setRectActiveLine] = useState({ left: 0, width: 0 });

   // useEffect(() => {
   //    console.log("change location");
      
   //    setIsMyProfile(nickname === user?.nickname);
   //    // console.log(nickname, user.nickname);
      
   // }, [nickname]);

   useEffect(() => {
      setSortOption(SORT_OPTIONS.LATEST)

      let _isMyProfile = nickname === user?.nickname
      setIsMyProfile(_isMyProfile)
      // console.log(nickname, user.nickname);
      

      const fetchAPI = async () => {
         try {
            if (_isMyProfile) {
               setDisplayUser(user);
            } else {
               const response = await getUser(nickname);
               setDisplayUser(response.data);
               // console.log(response);
            }
         } catch (error) {}
      };

      fetchAPI();
   }, [nickname]);

   useEffect(() => {
      const firstTab = DOM_tabs.current?.children[0];
      const rect = firstTab.getBoundingClientRect();

      setRectActiveLine((prev) => ({ ...prev, width: rect.width }));
   }, []);

   const moveActiveLine = (tab) => {
      const tabsRect = DOM_tabs.current?.getBoundingClientRect();
      const rect = DOM_tabItems.current[tab]?.getBoundingClientRect();

      const left = rect?.left - tabsRect?.left;

      setRectActiveLine((prev) => ({
         ...prev,
         left: left,
         width: rect?.width,
      }));
   };

   const handleTabChange = (tab) => {
      setActiveTab(tab);
      moveActiveLine(tab);
   };

   const handleSortChange = (option) => {
      setSortOption(option);
   };

   return (
      <div className={cx("wrapper")}>
         <ProfileHeader
            user={displayUser}
            isOwnProfile={isMyProfile}
         />
         <div className={cx("content")}>
            <div className={cx("content-header")}>
               <div ref={DOM_tabs} className={cx("tabs")}>
                  <button
                     ref={(el) => (DOM_tabItems.current[TABS.VIDEOS] = el)}
                     className={cx("tab", {
                        active: activeTab === TABS.VIDEOS,
                     })}
                     onClick={() => handleTabChange(TABS.VIDEOS)}
                     onPointerEnter={() => moveActiveLine(TABS.VIDEOS)}
                     onPointerLeave={() => moveActiveLine(activeTab)}
                  >
                     <span>
                        <Icon_Videos />
                     </span>
                     Videos
                  </button>
                  <button
                     ref={(el) => (DOM_tabItems.current[TABS.REPOSTS] = el)}
                     className={cx("tab", {
                        active: activeTab === TABS.REPOSTS,
                     })}
                     onClick={() => handleTabChange(TABS.REPOSTS)}
                     onPointerEnter={() => moveActiveLine(TABS.REPOSTS)}
                     onPointerLeave={() => moveActiveLine(activeTab)}
                  >
                     <span>
                        <Icon_Repost />
                     </span>
                     Reposts
                  </button>
                  {isMyProfile && (
                     <button
                        ref={(el) =>
                           (DOM_tabItems.current[TABS.FAVORITES] = el)
                        }
                        className={cx("tab", {
                           active: activeTab === TABS.FAVORITES,
                        })}
                        onClick={() => handleTabChange(TABS.FAVORITES)}
                        onPointerEnter={() => moveActiveLine(TABS.FAVORITES)}
                        onPointerLeave={() => moveActiveLine(activeTab)}
                     >
                        <span>
                           <Icon_Favourites />
                        </span>
                        Favorites
                     </button>
                  )}
                  <button
                     ref={(el) => (DOM_tabItems.current[TABS.LIKED] = el)}
                     className={cx("tab", { active: activeTab === TABS.LIKED })}
                     onClick={() => handleTabChange(TABS.LIKED)}
                     onPointerEnter={() => moveActiveLine(TABS.LIKED)}
                     onPointerLeave={() => moveActiveLine(activeTab)}
                  >
                     <span>
                        <Icon_Liked />
                     </span>
                     Liked
                  </button>

                  <div
                     ref={DOM_activeLine}
                     className={cx("active-line")}
                     style={{
                        left: rectActiveLine?.left || 0,
                        width: rectActiveLine?.width || 0,
                     }}
                  />
               </div>

               {activeTab === TABS.VIDEOS && (
                  <div className={cx("sort-options")}>
                     <button
                        className={cx("sort-btn", {
                           active: sortOption === SORT_OPTIONS.LATEST,
                        })}
                        onClick={() => handleSortChange(SORT_OPTIONS.LATEST)}
                     >
                        Latest
                     </button>
                     <button
                        className={cx("sort-btn", {
                           active: sortOption === SORT_OPTIONS.POPULAR,
                        })}
                        onClick={() => handleSortChange(SORT_OPTIONS.POPULAR)}
                     >
                        Popular
                     </button>
                     <button
                        className={cx("sort-btn", {
                           active: sortOption === SORT_OPTIONS.OLDEST,
                        })}
                        onClick={() => handleSortChange(SORT_OPTIONS.OLDEST)}
                     >
                        Oldest
                     </button>
                  </div>
               )}
            </div>

            <VideoGrid
               userId={displayUser?.id}
               activeTab={activeTab}
               sortOption={sortOption}
            />
         </div>
      </div>
   );
}
