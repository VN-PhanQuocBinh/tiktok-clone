import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router";

import SidebarSearch from "./SidebarSearch";
import Navbar from "./Navbar";
import Image from "../../../components/Image";
import { Icon_Search, Icon_EllipsisVertical } from "../../../assets/Icons";

import logo from "../../../assets/images/logo.svg";
import logoLess from "../../../assets/images/logo-less.png";
import config from "../../../config";

import styles from "../../../assets/styles/components/Sidebar.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import SideMenu from "./SideMenu";
import MoreOption from "./MoreOption";

let cx = classNames.bind(styles);

export default function Sidebar() {
   const [showFull, setShowFull] = useState(true);
   const DOM_inputSearchArea = useRef(null);
   const DOM_sideBar = useRef(null);
   // const ref_clickedItem = useRef(null)

   const [currentQuery, setCurrentQuery] = useState("");

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (!DOM_sideBar.current?.contains(e.target)) {
            setShowFull(true);
         }
      };

      document.addEventListener("click", handleClickOutside);

      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, []);

   const handleClick = () => {
      setShowFull((pre) => !pre);
      DOM_inputSearchArea.current?.focus();
   };

   const handleCloseSearch = useCallback(() => {
      setShowFull(true);
   }, []);

   const handleOpenMoreOption = () => {
      setShowFull(false);
   };

   const handleSendDataFromChild = useCallback((data) => {
      setCurrentQuery(data.currentQuery);
   }, []);

   // console.log("sidebar re-render");

   return (
      <aside ref={DOM_sideBar} className={cx("aside")}>
         <div className={cx("wrapper", { collapsed: !showFull })}>
            <div className={cx("animation-bg")} />

            <Link to={config.routes.home} className={cx("logo")}>
               <Image
                  className={cx("logo-img")}
                  src={showFull ? logo : logoLess}
               />
            </Link>

            <SideMenu
               className={cx("side-menu")}
               onClose={handleCloseSearch}
               title={"More"}
            >
               {/* <SidebarSearch
                  sendDataToParent={handleSendDataFromChild}
                  ref={DOM_inputSearchArea}
               /> */}
               <MoreOption className={cx("more-wrapper")}/>
            </SideMenu>

            <button onClick={handleClick} className={cx("search-btn")}>
               <span>
                  <Icon_Search className={cx("search-icon")} />
               </span>
               <span className={cx("placeholder")}>
                  {currentQuery != "" ? currentQuery : "Search"}
               </span>
            </button>

            <Navbar
               onClose={handleOpenMoreOption}
               showLabel={showFull}
               className={cx("navbar")}
            />
         </div>
      </aside>
   );
}
