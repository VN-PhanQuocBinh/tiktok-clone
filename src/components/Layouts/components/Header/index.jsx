import { useEffect, useMemo, useRef, useState } from "react"

import logo from "../../../../assets/images/logo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
   faCircleUser,
   faEllipsisVertical,
   faPlus,
} from "@fortawesome/free-solid-svg-icons"
import {
   faMessage
} from "@fortawesome/free-regular-svg-icons"
import { MessagePlane } from "../../../Icons"


import SearchComponent from "../../../SearchComponent"
import HeaderActionMenu from "../../../HeaderActionMenu"
import Button from "../../../Button"
import Badge from "../../../Badge"
import Tooltip from "../../../Tooltip/Tooltip"
import { useAuth } from "../../../../contexts/AuthContext"

import { actionItems_loggedIn, actionItems_loggedOut } from "../../../../fakeDB"

import styles from "../../../../assets/styles/components/Header.module.scss"
import classNames from "classnames/bind"
const cx = classNames.bind(styles)

export default function Header() {
   const [currentActionMenu, setCurrentActionMenu] = useState(actionItems_loggedOut)
   const { isLoggedIn, login } = useAuth()
   const [isVisible, setIsVisible] = useState(false)
   const timerId = useRef()

   useEffect(() => {
      if (isLoggedIn) {
         setCurrentActionMenu(actionItems_loggedIn)
         console.log("login");      
      }
      else {
         setCurrentActionMenu(actionItems_loggedOut)
         console.log("logout");
      }
      setIsVisible(false)
   }, [isLoggedIn])
   
   function handleMouseEnter() {
      clearTimeout(timerId.current)
      setIsVisible(true)
   }

   function handleMouseLeave() {
      clearTimeout(timerId.current)
      timerId.current = setTimeout(() => {
         setIsVisible(false)
      }, 1000)
   }

   // console.group("-->>> header re-render");

   // console.log(currentActionMenu);

   // console.groupEnd()
   
   
   // console.log("header re-render");
   return (
      <header className={cx("header")}>
         <div className={cx("inner")}>
            <div className={cx("logo")}>
               <img src={logo} alt="" />
            </div>

            <SearchComponent/>
            
            <div className={cx("user-actions")}>
               <Button
                  label={isLoggedIn ? "Upload" : "Log in"}
                  secondary={isLoggedIn}
                  primary={!isLoggedIn}
                  icon={faPlus}
                  onClick={!isLoggedIn ? login : () => {}}
               />

               { isLoggedIn &&
                  <Tooltip
                     content={
                        <span>Message</span>
                     }
                  >
                     <Button
                        transparent
                        icon={MessagePlane}
                        iconSize={"large"}
                        className={cx("message-btn")}
                     >
                        <Badge
                           label={"99+"}
                           position={"top-right"}
                           styleRule={{
                              bottom: "50%",
                              left: "50%"
                           }}
                        />
                     </Button>
                  </Tooltip>
                  
               }
               <i
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
               >
                  {isLoggedIn ?
                     <FontAwesomeIcon 
                        className={cx("avt-icon")} 
                        icon={faCircleUser} 
                     />
                     :
                     <FontAwesomeIcon 
                        className={cx("actions-icon")} 
                        icon={faEllipsisVertical} 
                     /> 
                  }   
                   
                  <HeaderActionMenu
                     isVisible={isVisible}
                     items={ currentActionMenu }
                     appearDelay={0}
                     hideDelay={100}
                  />
               </i>
            </div>
         </div>
      </header>
   )
}


