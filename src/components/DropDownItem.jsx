import { Link } from "react-router"
import { memo } from "react"
import { DROPDOWN_ITEM_TYPE as TYPE } from '../constants'
import Image from "../components/Image"

import { 
   Icon_Circle
} from "../assets/Icons"

import styles from "../assets/styles/components/DropDownItem.module.scss"
import classNames from 'classnames/bind'
import { Fragment } from "react"

const cx = classNames.bind(styles)


function DropDownItem({ 
   type, 
   item, 
   itemClick = () => {}, 
   className,
   icon_className 
}) {

   let Component = Fragment
   let common_Props = {}

   if (item.to) {
      Component = Link

      common_Props = {
         to: item.to,
         target: item.to ? "_self" : ""
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
               <Icon_Circle className={cx("icon")} />
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
            <Link to={`/profile/${item.nickname}`}>
               <Image src={item.avatar} className={cx("avt")} />
               <div className={cx("user-info")} >
                  <h4 className={cx("text")}>{item.nickname}</h4>
                  <p>{item.full_name}</p>
               </div>
            </Link>
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
                  <item.icon 
                     className={cx("icon", "actions", {[icon_className]: icon_className})} 
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
                  <item.icon 
                     className={cx("icon", "actions")} 
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

   console.log("item re-render");
   
   return (
      <li {...props}>
         <Component {...common_Props}>
            {content}
         </Component>
      </li>
   )
}


export default memo(DropDownItem)