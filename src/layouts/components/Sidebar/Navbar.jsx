import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import { useAuthModal } from "../../../contexts/AuthModalContext";

import { navListData } from "../../../fakeDB";
import { AUTH_TYPE } from "../../../constants";

import NavbarItem from "./NavbarItem";
import Image from "../../../components/Image";
import { Icon_EllipsisVertical, Icon_TelevisionRegular, Icon_TelevisionSolid, Icon_UserSolid } from "../../../assets/Icons";

import classNames from "classnames/bind";
import styles from "../../../assets/styles/components/Navbar.module.scss";

const cx = classNames.bind(styles);

function Navbar({className, showLabel, onOpen}) {
   const { isLoggedIn, user } = useAuth();
   const { openAuthModal } = useAuthModal()

   const handleClickProfile = (e) => {
      if (!isLoggedIn) {
         e.preventDefault()
         openAuthModal(AUTH_TYPE.LOGIN_OPTIONS)
      }
   }

   return (
      <nav className={className}>
         <ul className={cx("list")}>
            {navListData.map((nav, index) => (
               !nav.loggedIn ? <NavbarItem showLabel={showLabel} key={index} {...nav} /> : 
               (isLoggedIn && <NavbarItem showLabel={showLabel} key={index} {...nav} />)
            ))}

            <NavbarItem
               label={"LIVE"}
               icon={isLoggedIn ? Image : Icon_TelevisionSolid}
               activeIcon={Icon_TelevisionRegular}
               to={"/live"}
               iconProps={{
                  src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHORVLY3-9bljdur2Lmf-bFufXufDUrwF92g&s",
                  className: isLoggedIn ? "live" : ""
               }}
               showLabel={showLabel}
            />
            <NavbarItem
               label={"Profile"}
               icon={isLoggedIn ? Image : Icon_UserSolid}
               activeIcon={ isLoggedIn ? Image : Icon_UserSolid}
               to={`/profile/${user?.nickname}`}
               iconProps={{
                  src: user?.avatar,
                  className: "avt"
               }}
               showLabel={showLabel}
               onClick={handleClickProfile}
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
