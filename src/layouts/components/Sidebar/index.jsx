import { Link } from "react-router";

import SidebarSearch from "./SidebarSearch";
import Navbar from "./Navbar";
import Image from "../../../components/Image";
import { Icon_Search } from "../../../assets/Icons";

import logo from "../../../assets/images/logo.svg";
import config from "../../../config";

import styles from "../../../assets/styles/components/Sidebar.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

let cx = classNames.bind(styles);

export default function Sidebar() {
   const [showFull, setShowFull] = useState(true);

   const handleClick = () => {
      setShowFull(pre => !pre);
   };

   return (
      <aside className={cx("wrapper", {collapsed: !showFull})}>
         <Link to={config.routes.home} className={cx("logo")}>
            <Image src={logo} />
         </Link>

         <button onClick={handleClick} style={{ backgroundColor: "red" }}>
            Show
         </button>

         <SidebarSearch className={cx("search-area")} />

         <button className={cx("search-btn")}>
            <span>
               <Icon_Search className={cx("search-icon")} />
            </span>
            <span className={cx("placeholder")}>Search</span>
         </button>

         <Navbar showLabel={showFull} className={cx("navbar")} />
      </aside>
   );
}
