import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useMediaQuery } from "../../../hooks";
import { useAuth } from "@contexts/AuthContext";
import { useUI } from "@contexts/UIContext/UIContext";

import { Link } from "react-router";
import SidebarSearch from "./SidebarSearch";
import Navbar from "./Navbar";
import UserSuggested from "./UserSuggested";
import Image from "@components/Image";
import { Icon_Search } from "@icons";
import SideMenu from "./SideMenu";
import MoreOption from "./MoreOption";

import { AUTH_TYPE, MODAL_TYPES, ACTION_MODAL_TYPES } from "@types";

import logo from "../../../assets/images/logo.svg";
import logoLess from "../../../assets/images/logo-less.png";
import config from "../../../config";

import styles from "@styles/components/Sidebar.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const keyTabDisplay = {
   KEY_SEARCH: "search",
   KEY_MORE: "more",
};

export default function Sidebar({ className }) {
   const location = useLocation();

   const { isLoggedIn } = useAuth();
   const { state: uiState, dispatch: uiDispatch } = useUI();

   const [showFull, setShowFull] = useState(true);
   const [showBlurArea, setShowBlurArea] = useState(false);
   const isMatchQuery = useMediaQuery("(max-width: 992px)");
   const [tabDisplay, setTabDisplay] = useState({
      [keyTabDisplay.KEY_SEARCH]: false,
      [keyTabDisplay.KEY_MORE]: false,
   });
   const [currentQuery, setCurrentQuery] = useState("");

   const DOM_inputSearchArea = useRef(null);
   const DOM_sideBar = useRef(null);
   const DOM_blurArea = useRef(null);

   useEffect(() => {
      handleCloseSideMenu();
   }, [location]);

   // responsive
   useEffect(() => {
      if (!isMatchQuery) {
         let change = true;

         // Handle when extend width (responsive)
         for (let key in tabDisplay) {
            // console.log(tabDisplay[key]);

            if (tabDisplay[key] == true) change = false;
         }

         if (change) setShowFull(!isMatchQuery);
      } else {
         setShowFull(!isMatchQuery);
      }
   }, [isMatchQuery]);

   // display blur area
   useEffect(() => {
      let value = false;

      Object.keys(tabDisplay).forEach((key) => {
         if (tabDisplay[key]) value = tabDisplay[key];
      });

      setShowBlurArea(value);
   }, [tabDisplay]);

   // blur event
   useEffect(() => {
      const handleClickOutside = (e) => {
         // console.log("click");

         if (!isMatchQuery) setShowFull(true);

         setTabDisplay((pre) => {
            let newState = { ...pre };

            Object.keys(newState).forEach((key) => {
               newState[key] = false;
            });

            return newState;
         });
      };

      DOM_blurArea.current?.addEventListener("pointerdown", handleClickOutside);

      return () => {
         DOM_blurArea.current?.removeEventListener(
            "pointerdown",
            handleClickOutside
         );
      };
   }, [isMatchQuery, showBlurArea]);

   // auto focus input when open sidemenu
   useEffect(() => {
      // console.log(DOM_inputSearchArea.current.focus);

      if (tabDisplay[keyTabDisplay.KEY_SEARCH]) {
         setTimeout(() => {
            DOM_inputSearchArea.current.focus();
         }, 0);
      }
   }, [tabDisplay]);

   const handleCloseSideMenu = useCallback(() => {
      // console.log("close");

      if (!isMatchQuery) setShowFull(true);

      setTabDisplay((pre) => {
         let newState = { ...pre };
         Object.keys(newState).forEach((key) => {
            newState[key] = false;
         });

         return newState;
      });
   }, [isMatchQuery]);

   const handleOpenMoreOption = () => {};

   // binding query to parent component
   const handleSendDataFromChild = useCallback((data) => {
      setCurrentQuery(data.currentQuery);
   }, []);

   const handleOpenSideMenu = useCallback(
      (tabKey) => {
         if (tabDisplay[tabKey]) {
            setTabDisplay((pre) => {
               let newState = { ...pre };

               Object.keys(newState).forEach((key) => {
                  newState[key] = false;
               });

               return newState;
            });

            if (!isMatchQuery) setShowFull(true);
         } else {
            setTabDisplay((pre) => {
               let newState = { ...pre };

               Object.keys(newState).forEach((key) => {
                  newState[key] = key === tabKey;
               });

               return newState;
            });

            setShowFull(false);
         }
      },
      [tabDisplay]
   );

   const handleLogin = useCallback(() => {
      uiDispatch({
         type: ACTION_MODAL_TYPES.OPEN_MODAL,
         modalType: MODAL_TYPES.AUTH_MODALS,
         modalProps: {
            type: AUTH_TYPE.LOGIN_OPTIONS
         },
      });
   }, [uiState]);

   // console.log("sidebar re-render", isMatchQuery);

   return (
      <aside
         ref={DOM_sideBar}
         className={cx("aside", { [className]: className })}
      >
         {showBlurArea && (
            <div ref={DOM_blurArea} className={cx("blur-area")} />
         )}

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
               className={cx("side-menu", "menu-search", {
                  visible: tabDisplay[keyTabDisplay.KEY_SEARCH],
               })}
               onClose={handleCloseSideMenu}
               title="Search"
            >
               <SidebarSearch
                  sendDataToParent={handleSendDataFromChild}
                  ref={DOM_inputSearchArea}
               />
            </SideMenu>

            <MoreOption
               className={cx("side-menu", "menu-more", {
                  visible: tabDisplay[keyTabDisplay.KEY_MORE],
               })}
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

               {isLoggedIn && showFull && <UserSuggested />}
               {!isLoggedIn && showFull && (
                  <button
                     onClick={handleLogin}
                     className={cx("login-btn")}
                  >
                     Log in
                  </button>
               )}
            </div>
         </div>
      </aside>
   );
}
