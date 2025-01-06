import styles from "../../../../assets/styles/components/Header.module.scss"
import classNames from "classnames/bind"

import logo from "../../../../assets/images/logo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

let cx = classNames.bind(styles)

export default function Header() {
   return (
      <header className={cx("header")}>
         <div className={cx("inner")}>
            <div className={cx("logo")}>
               <img src={logo} alt="" />
            </div>

            <div className={cx("search-wrapper")}>
               <div className={cx("search-box")}>
                  <input placeholder="Search" type="text" name="" id="" />
                  <button>
                     <FontAwesomeIcon className={cx("search-btn")} icon={faMagnifyingGlass} />
                  </button>
               </div>
            </div>
            

            <div className={cx("user-actions")}>
               <button>Log in</button>
               <FontAwesomeIcon className={cx("actions-icon")} icon={faEllipsisVertical} />
            </div>
         </div>
      </header>
   )
}