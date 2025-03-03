import { navListData } from "../../../fakeDB";

import NavbarItem from "./NavbarItem";
import Image from "../../../components/Image";


import classNames from "classnames/bind";
import styles from "../../../assets/styles/components/Navbar.module.scss";

const cx = classNames.bind(styles);

function Navbar({className, showLabel}) {
   return (
      <nav className={className}>
         <ul className={cx("list")}>
            {navListData.map((nav, index) => (
               <NavbarItem showLabel={showLabel} key={index} {...nav} />
            ))}

            <NavbarItem
               label={"LIVE"}
               icon={Image}
               to={"/live"}
               iconProps={{
                  src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHORVLY3-9bljdur2Lmf-bFufXufDUrwF92g&s",
                  className: "live"
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
         </ul>
      </nav>
   );
}

export default Navbar;
