import { Icon_XMark } from "../../../assets/Icons"

import classNames from "classnames/bind"
import styles from "../../../assets/styles/components/SideMenu.module.scss"

const cx = classNames.bind(styles)

function SideMenu({className, title, children, onClose}) {
   
   return (
      <div className={cx("wrapper", { [className]: className })}>
         <div className={cx("header")}>
            <strong className={cx("title")}>{title}</strong>

            <span onClick={onClose} className={cx("icon-wrapper")}>
               <Icon_XMark className={cx("icon")} />
            </span>
         </div>

         {children}
      </div>
   )
}

export default SideMenu