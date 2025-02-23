import { Link } from "react-router";
 
import Navbar from "./Navbar";
import Image from "../../../components/Image"

import logo from "../../../assets/images/logo.svg"
import config from "../../../config"

import styles from "../../../assets/styles/components/Sidebar.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

export default function Sidebar() {
   return (
      <aside className={cx("wrapper")}>
         <Link to={config.routes.home} className={cx("logo")}>
            <Image src={logo}/>
         </Link>

         <Navbar/>
      </aside>
   );
}
