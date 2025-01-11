import { Link } from "react-router"
import { DROPDOWN_ITEM_TYPE as TYPE } from '../constants'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
   faCircle
} from "@fortawesome/free-solid-svg-icons"

import styles from "../assets/styles/components/DropDownItem.module.scss"
import classNames from 'classnames/bind'
import { Fragment } from "react"

const cx = classNames.bind(styles)



export default function DropDownItem({ 
   type, 
   item, 
   itemClick = () => {}, 
   className 
}) {

   let Component = Fragment
   let common_Props = {}

   if (item.to) {
      Component = Link

      common_Props = {
         to: item.to,
         target: item.to ? "_blank" : ""
      }
   }

   
   let content
   let props = {}
   
   switch (type) {
      case TYPE.DEFAULT:
         props = {
            className: cx("drop-item", {[className]: className}),
            onClick: () => itemClick(item.label)
         }

         content = (
            <>
               <FontAwesomeIcon className={cx("icon")} icon={faCircle} />
               <h4 className={cx("text")}>{item.label}</h4>
            </>
         )
         break
      case TYPE.USER_SUGGEST:
         props = {
            className: cx("drop-item", "user-suggest", {[className]: className}),
            onClick: () => itemClick(item.userId)
         }

         content = (
            <>
               <img className={cx("avt")} />
               <div className={cx("user-info")} >
                  <h4 className={cx("text")}>{item.userId}</h4>
                  <p>{item.caption}</p>
               </div>
            </>
         )
         break
      case TYPE.ACTIONS:
         props = {
            className: cx("drop-item", {[className]: className}),
            onClick: itemClick
         }

         content = (
            <>
               {!!item.icon && 
                  <FontAwesomeIcon 
                     className={cx("icon", "actions")} 
                     icon={item.icon} 
                     color=""
                  />
               }
               <p className={cx("text")}>{item.label}</p>
            </>
         )
         break
      case TYPE.ACTIONS_HEADER:
         let hasIcon = !!item.icon

         props = {
            className: cx("header", {[className]: className}),
            onClick: !hasIcon ? itemClick : undefined,
         }    

         content = (
            <>
               {hasIcon && 
                  <FontAwesomeIcon 
                     className={cx("icon", "actions")} 
                     icon={item.icon} 
                     onClick={itemClick}
                  />
               }
               <p className={cx("text")}>{item.label}</p>
            </>
         )
         break
      default:
         throw Error("Unknown TYPE: " + type)
   }

   return (
      <li {...props}>
         <Component {...common_Props}>
            {content}
         </Component>
      </li>
   )
}