import logo from "../../../../assets/images/logo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
   faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons"

import SearchComponent from "../../../SearchComponent"
import DropDown from "../../../Dropdown"
import DropDownItem from "../../../DropDownItem"

import { actionItems } from "../../../../fakeDB"

import styles from "../../../../assets/styles/components/Header.module.scss"
import classNames from "classnames/bind"
import { DROPDOWN_ITEM_TYPE } from "../../../../constants"
import { useState } from "react"
const cx = classNames.bind(styles)

export default function Header() {
   const [isVisible, setIsVisible] = useState(false)

   return (
      <header className={cx("header")}>
         <div className={cx("inner")}>
            <div className={cx("logo")}>
               <img src={logo} alt="" />
            </div>

            <SearchComponent/>
            
            <div className={cx("user-actions")}>
               <button>Log in</button>
               <i
                  onMouseEnter={() => setIsVisible(true)}
                  onMouseLeave={() => setIsVisible(false)}
               >
                  <FontAwesomeIcon 
                     className={cx("actions-icon")} 
                     icon={faEllipsisVertical} 
                  />        
                   
                  <DropDown 
                     isVisible={isVisible} 
                     width={"max-content"}
                     animation={true}
                  >
                     {actionItems.map((item, index) => (
                        <DropDownItem
                           key={index}
                           type={DROPDOWN_ITEM_TYPE.ACTIONS}
                           item={item}
                           itemClick={(item) => console.log("click " + item.label)}
                        />
                     ))}
                  </DropDown>
               </i>
            </div>
         </div>
      </header>
   )
}


