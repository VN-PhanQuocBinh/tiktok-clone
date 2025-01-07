import DropDown from './Dropdown'
import DropDownItem from './DropDownItem'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
   faMagnifyingGlass,
   faCircleXmark, 
   faCircleNotch 
} from "@fortawesome/free-solid-svg-icons"

import { searchItems, userDefaultSugItems } from '../fakeDB'
import { HEADER_ITEM_TYPE as TYPE } from '../constants'

import styles from "../assets/styles/components/SearchComponent.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

export default function SearchComponent() {

   return (
      <div className={cx("search-wrapper")}>
         <div className={cx("search-box")}>
            <input placeholder="Search" type="text" name="" id="" />
            <FontAwesomeIcon 
               className={cx("clear-icon")} 
               icon={faCircleXmark} 
            />

            {/* <FontAwesomeIcon 
            className={cx("loading-icon")}
               icon={faCircleNotch} 
            /> */}
            <button>
               <FontAwesomeIcon className={cx("search-btn")} icon={faMagnifyingGlass} />
            </button>
         </div>  

         <DropDown 
            isVisible={true}
         >
            <p className={cx("title")}>
               You may like
            </p>

            {searchItems.map((item, index) => (
               <DropDownItem
                  key={index}
                  type={TYPE.DEFAULT}
                  item={item}
                  itemClick={(label) => console.log("click " + label)}
               />
            ))}

            <p className={cx("title")}>
               Accounts
            </p>

            {userDefaultSugItems.map((item, index) => (
               <DropDownItem
                  key={index}
                  type={TYPE.USER_SUGGEST}
                  item={item}
                  itemClick={(label) => console.log("click " + label)}
               />
            ))}
         </DropDown>
      </div>
   )  
}