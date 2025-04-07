import { useCallback, useEffect, useRef, useState } from "react";
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

   const setFunc_showFull = (value) => {
      if (value) {
         if (!isMatchQuery) {
            let change = true

            // Handle when extend width (responsive)
            for (let key in tabDisplay) {
               if (tabDisplay[key] == true) 
                  change = false
            }

            if (change)
               setShowFull(value)
         } 
      } else {
         setShowFull(value)
      }
   }

   useEffect(() => {
      setFunc_showFull(!isMatchQuery)
   }, [isMatchQuery])

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (!DOM_sideBar.current?.contains(e.target)) {
            setFunc_showFull(true);
         }
      };

      document.addEventListener("pointerdown", handleClickOutside);

      return () => {
         document.removeEventListener("pointerdown", handleClickOutside);
      };
   }, []);

   useEffect(() => {
      if (tabDisplay[keyTabDisplay.KEY_SEARCH]) {
         DOM_inputSearchArea.current?.focus()
      }
   }, [tabDisplay])

   const handleCloseSideMenu = useCallback(() => {
      setFunc_showFull(true)

      setTabDisplay((pre) => {
         let newState = {...pre}
         Object.keys(newState).forEach((key) => {
            newState[key] = false
         })

         return newState
      })
   }, []);

   const handleOpenMoreOption = () => {
      
   };

   const handleSendDataFromChild = useCallback((data) => {
      setCurrentQuery(data.currentQuery);
   }, []);

   const handleOpenSideMenu = useCallback((tabKey) => {
      if (tabDisplay[tabKey]) {
         setTabDisplay((pre) => {
            let newState = {...pre}
   
            Object.keys(newState).forEach((key) => {
               newState[key] = false;
            });
            
            return newState;
         });

         setFunc_showFull(true);
      } else {
         setTabDisplay((pre) => {
            let newState = {...pre}
   
            Object.keys(newState).forEach((key) => {
               newState[key] = (key === tabKey);
            });
            
            return newState;
         });

         setFunc_showFull(false);
      }

      
   }, [tabDisplay]);

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
               className={cx("side-menu", "menu-search", {visible: tabDisplay[keyTabDisplay.KEY_SEARCH]})}
               onClose={handleCloseSideMenu}
               title="Search"
            >
               <SidebarSearch
                  sendDataToParent={handleSendDataFromChild}
                  ref={DOM_inputSearchArea}
               />
            </SideMenu>

            <MoreOption
               className={cx("side-menu", "menu-more", {visible: tabDisplay[keyTabDisplay.KEY_MORE]})}
               onClose={handleCloseSideMenu}
            />

            <button
               onClick={() => handleOpenSideMenu(keyTabDisplay.KEY_SEARCH)}
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
                  onOpen={handleOpenSideMenu}
                  showLabel={showFull}
                  className={cx("navbar")}
               />

               {showFull && <UserSuggested/>}
            </div>
         </div>
      </aside>
   );
}
