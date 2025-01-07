import { HEADER_ITEM_TYPE as TYPE } from '../constants'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
   faCircle
} from "@fortawesome/free-solid-svg-icons"

import styles from "../assets/styles/components/DropDownItem.module.scss"
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default function DropDownItem({ type, item, itemClick }) {
   let template

   switch (type) {
      case TYPE.DEFAULT:
         template = (
            <li 
               className={cx("drop-item")}
               onClick={() => itemClick(item.label)}
            >
               <FontAwesomeIcon className={cx("icon")} icon={faCircle} />
               <h4 className={cx("text")}>{item.label}</h4>
            </li>
         )
         break
      case TYPE.USER_SUGGEST:
         template = (
            <li 
               className={cx("drop-item", "user-suggest")}
               onClick={() => itemClick(item.userId)}
            >
               <img className={cx("avt")} />
               <div className={cx("user-info")} >
                  <h4 className={cx("text")}>{item.userId}</h4>
                  <p>{item.caption}</p>
               </div>
            </li>
         )
         break
      case TYPE.ACTIONS:
         template = (
            <li 
               className={cx("drop-item")}
               onClick={() => itemClick(item.label)}
            >
               <FontAwesomeIcon className={cx("icon")} icon={faCircle} />
               <p className={cx("text")}>{item.label}</p>
            </li>
         )
         break
   }

   return template
}