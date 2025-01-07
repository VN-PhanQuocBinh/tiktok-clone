import logo from "../../../../assets/images/logo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
   faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons"

import SearchComponent from "../../../SearchComponent"
import DropDown from "../../../Dropdown"

import { actionItems } from "../../../../fakeDB"

import styles from "../../../../assets/styles/components/Header.module.scss"
import classNames from "classnames/bind"
const cx = classNames.bind(styles)

export default function Header() {
   return (
      <header className={cx("header")}>
         <div className={cx("inner")}>
            <div className={cx("logo")}>
               <img src={logo} alt="" />
            </div>

            <SearchComponent/>
            
            <div className={cx("user-actions")}>
               <button>Log in</button>
               <i>
                  <FontAwesomeIcon className={cx("actions-icon")} icon={faEllipsisVertical} />
                  <DropDown items={actionItems} itemClick={(label) => console.log(label)} isVisible={true} />
               </i>
            </div>
         </div>
      </header>
   )
}