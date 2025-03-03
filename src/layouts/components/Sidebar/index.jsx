import { useCallback, useRef } from "react";
import { Link } from "react-router";

import SidebarSearch from "./SidebarSearch";
import Navbar from "./Navbar";
import Image from "../../../components/Image";
import { Icon_Search } from "../../../assets/Icons";

import logo from "../../../assets/images/logo.svg";
import logoLess from "../../../assets/images/logo-less.png";
import config from "../../../config";

import styles from "../../../assets/styles/components/Sidebar.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

let cx = classNames.bind(styles);

export default function Sidebar() {
   const [showFull, setShowFull] = useState(true);
   const DOM_inputSearchArea = useRef(null)

   const handleClick = () => {
      setShowFull((pre) => !pre);
      DOM_inputSearchArea.current.focus()
   };

   const handleCloseSearch = useCallback(() => {
      setShowFull(true)
   }, [])

   return (
      <aside className={cx("aside")}>
         <div className={cx("wrapper", { collapsed: !showFull })}>
            <div className={cx("animation-bg")} />

            <Link to={config.routes.home} className={cx("logo")}>
               <Image
                  className={cx("logo-img")}
                  src={showFull ? logo : logoLess}
               />
            </Link>

            <SidebarSearch ref={DOM_inputSearchArea} onClose={handleCloseSearch} className={cx("search-area")} />

            <button onClick={handleClick} className={cx("search-btn")}>
               <span>
                  <Icon_Search className={cx("search-icon")} />
               </span>
               <span className={cx("placeholder")}>Search</span>
            </button>

            <Navbar showLabel={showFull} className={cx("navbar")} />
         </div>
      </aside>
   );
}
