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


import SearchComponent from "../../../SearchComponent"
import HeaderActionMenu from "../../../HeaderActionMenu"
import Button from "../../../Button"
import Badge from "../../../Badge"
import { useAuth } from "../../../../contexts/AuthContext"

import { actionItems_loggedIn, actionItems_loggedOut } from "../../../../fakeDB"

import styles from "../../../../assets/styles/components/Header.module.scss"
import classNames from "classnames/bind"
const cx = classNames.bind(styles)

export default function Header() {
   const [currentActionMenu, setCurrentActionMenu] = useState(actionItems_loggedOut)
   const { isLoggedIn, login, logout } = useAuth()
   const [isVisible, setIsVisible] = useState(false)
   const timerId = useRef()

   useEffect(() => {
      if (isLoggedIn)
         setCurrentActionMenu(actionItems_loggedIn)
      else 
         setCurrentActionMenu(actionItems_loggedOut)
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
                  <Button
                     transparent
                     icon={faMessage}
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
                  />
               </i>
            </div>
         </div>
      </header>
   )
}


