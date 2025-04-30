import { useAuth } from "../../../contexts/AuthContext";
import { navListData } from "../../../fakeDB";

import NavbarItem from "./NavbarItem";
import Image from "../../../components/Image";
import { Icon_EllipsisVertical, Icon_Television } from "../../../assets/Icons";

import classNames from "classnames/bind";
import styles from "../../../assets/styles/components/Navbar.module.scss";

const cx = classNames.bind(styles);

function Navbar({className, showLabel, onOpen}) {
   const { isLoggedIn } = useAuth();
   // console.log("navbar re-render");

   return (
      <nav className={className}>
         <ul className={cx("list")}>
            {navListData.map((nav, index) => (
               !nav.loggedIn ? <NavbarItem showLabel={showLabel} key={index} {...nav} /> : 
               (isLoggedIn && <NavbarItem showLabel={showLabel} key={index} {...nav} />)
            ))}

            <NavbarItem
               label={"LIVE"}
               icon={isLoggedIn ? Image : Icon_Television}
               to={"/live"}
               iconProps={{
                  src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHORVLY3-9bljdur2Lmf-bFufXufDUrwF92g&s",
                  className: isLoggedIn ? "live" : ""
               }}
               showLabel={showLabel}
            />
            <NavbarItem
               label={"Profile"}
               icon={Image}
               to={"/profile"}
               iconProps={{
                  src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHORVLY3-9bljdur2Lmf-bFufXufDUrwF92g&s",
                  className: "avt"
               }}
               showLabel={showLabel}
            />

            <li>
               <button onClick={() => onOpen("more")} className={cx("nav-item")}>
                  <span className={cx("icon-wrapper")}>
                     <Icon_EllipsisVertical className={cx("icon")}/>
                  </span>

                  <div className={cx("nav-content")}>
                     <span>More</span>
                  </div>
               </button>
            </li>
         </ul>
      </nav>
   );
}

export default Navbar;
