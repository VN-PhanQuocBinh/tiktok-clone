import { NavLink } from "react-router";

import styles from "../../../assets/styles/components/NavbarItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function NavbarItem({
   label,
   to = "/",
   icon: Icon,
   activeIcon: ActiveIcon = null,
   iconProps = {},
   showLabel = true,
}) {
   const _iconProps = {
      ...iconProps,
      className: cx("icon", { live: iconProps?.className?.includes("live") }),
   };

   return (
      <NavLink to={to} end>
         {({ isActive }) => (
            <li className={cx("nav-item", { active: isActive })}>
               <span className={cx("icon-wrapper")}>
                  {isActive && ActiveIcon !== null ? (
                     <ActiveIcon {..._iconProps} />
                  ) : (
                     <Icon {..._iconProps} />
                  )}
               </span>

               <div className={cx("nav-content", {hidden: !showLabel})}>
                  <span>{label}</span>
               </div>
            </li>
         )}
      </NavLink>
   );
}

export default NavbarItem;
