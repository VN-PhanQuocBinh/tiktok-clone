import { useCallback, useEffect, useRef } from "react";
import { useMediaQuery } from "../../../hooks";

import { Link } from "react-router";
import SidebarSearch from "./SidebarSearch";
import Navbar from "./Navbar";
import UserSuggested from "./UserSuggested";
import Image from "../../../components/Image";
import { Icon_Search } from "../../../assets/Icons";

import logo from "../../../assets/images/logo.svg";
import logoLess from "../../../assets/images/logo-less.png";
import config from "../../../config";

import styles from "../../../assets/styles/components/Sidebar.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import SideMenu from "./SideMenu";
import MoreOption from "./MoreOption";

let cx = classNames.bind(styles);

const keyTabDisplay = {
   KEY_SEARCH: "search",
   KEY_MORE: "more",
};

export default function Sidebar({className}) {
   const [showFull, setShowFull] = useState(true);
   const isMatchQuery = useMediaQuery("(max-width: 992px)")

   const DOM_inputSearchArea = useRef(null);
   const DOM_sideBar = useRef(null);
   const [tabDisplay, setTabDisplay] = useState({
      [keyTabDisplay.KEY_SEARCH]: false,
      [keyTabDisplay.KEY_MORE]: false,
   });

   const [currentQuery, setCurrentQuery] = useState("");


   useEffect(() => {
      setShowFull(!isMatchQuery)
   }, [isMatchQuery])

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (!DOM_sideBar.current?.contains(e.target)) {
            setShowFull(true);
         }
      };

      document.addEventListener("pointerdown", handleClickOutside);

      return () => {
         document.removeEventListener("pointerdown", handleClickOutside);
      };
   }, []);

   useEffect(() => {
      if (showFull) {
         setTabDisplay((pre) => {
            Object.keys(pre).forEach((key) => {
               pre[key] = false;
            });
   
            return pre;
         });
      }
   }, [showFull])

   useEffect(() => {
      if (tabDisplay[keyTabDisplay.KEY_SEARCH])
         DOM_inputSearchArea.current?.focus()
   }, [tabDisplay])

   const handleCloseSideMenu = useCallback(() => {
      setShowFull(true);
   }, []);

   const handleOpenMoreOption = () => {
      setShowFull(false);
   };

   const handleSendDataFromChild = useCallback((data) => {
      setCurrentQuery(data.currentQuery);
   }, []);

   const handleOpenTab = useCallback((tabKey) => {
      if (tabDisplay[tabKey]) {
         setTabDisplay((pre) => {
            pre[tabKey] = false
            console.log(pre);
            
            return pre
         });
         setShowFull(true);
      } else {
         setShowFull(false);
         setTabDisplay((pre) => {
            let newState = {...pre}

            Object.keys(newState).forEach((key) => {
               newState[key] = (key === tabKey);
            });
            
            return newState;
         });
      }
   }, []);

   // console.log("sidebar re-render");
   
   return (
      <aside ref={DOM_sideBar} className={cx("aside", {[className]: className})}>
         <div
            className={cx("wrapper", {
               collapsed: !showFull,
               [keyTabDisplay.KEY_SEARCH]: tabDisplay[keyTabDisplay.KEY_SEARCH],
               [keyTabDisplay.KEY_MORE]: tabDisplay[keyTabDisplay.KEY_MORE],
            })}
         >
            <div className={cx("animation-bg")} />

            <Link to={config.routes.home} className={cx("logo")}>
               <Image
                  className={cx("logo-img")}
                  src={showFull ? logo : logoLess}
               />
            </Link>

            <SideMenu
               className={cx("side-menu", "menu-search")}
               onClose={handleCloseSideMenu}
               title="Search"
            >
               <SidebarSearch
                  sendDataToParent={handleSendDataFromChild}
                  ref={DOM_inputSearchArea}
               />
            </SideMenu>

            <MoreOption
               className={cx("side-menu", "menu-more")}
               onClose={handleCloseSideMenu}
            />

            <button
               onClick={() => handleOpenTab(keyTabDisplay.KEY_SEARCH)}
               className={cx("search-btn")}
            >
               <span>
                  <Icon_Search className={cx("search-icon")} />
               </span>
               <span className={cx("placeholder")}>
                  {currentQuery != "" ? currentQuery : "Search"}
               </span>
            </button>

            <div className={cx("sections")}>
               <Navbar
                  onClose={handleOpenMoreOption}
                  onOpen={handleOpenTab}
                  showLabel={showFull}
                  className={cx("navbar")}
               />

               {showFull && <UserSuggested/>}
            </div>
         </div>
      </aside>
   );
}
