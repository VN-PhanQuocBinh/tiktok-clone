import { useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router"
import routesConfig from "../../../../config/routes"

import logo from "../../../../assets/images/logo.svg"

import {
   Icon_MessagePlane,
   Icon_Plus,
   Icon_EllipsisVertical,
   Icon_MessageBox 
} from "../../../../assets/Icons"

import SearchComponent from "../../../SearchComponent"
import HeaderActionMenu from "../../../HeaderActionMenu"
import Button from "../../../Button"
import Badge from "../../../Badge"
import Tooltip from "../../../Tooltip/Tooltip"
import Image from "../../../Image"
import { useAuth } from "../../../../contexts/AuthContext"

import { actionItems_loggedIn, actionItems_loggedOut } from "../../../../fakeDB"

import styles from "../../../../assets/styles/components/Header.module.scss"
import classNames from "classnames/bind"
const cx = classNames.bind(styles)


export default function Header() {
   const { isLoggedIn, login } = useAuth()
   const initMenu = () => {
      if (isLoggedIn)
         return actionItems_loggedIn
      return actionItems_loggedOut
   }
   const [currentActionMenu, setCurrentActionMenu] = useState(initMenu)
   const [isVisible, setIsVisible] = useState(false)
   const timerId = useRef()

   const appearDelay = useRef(0)
   const hideDelay = useRef(100)

   useLayoutEffect(() => {
      if (isLoggedIn) {
         setCurrentActionMenu(actionItems_loggedIn)      
      }
      else {
         setCurrentActionMenu(actionItems_loggedOut)
      }

      if (isVisible)
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

   return (
      <header className={cx("header")}>
         <div className={cx("inner")}>
            <Link to={routesConfig.home} className={cx("logo")}>
               <img src={logo} alt="" />
            </Link>

            <SearchComponent/>
            
            <div className={cx("user-actions")}>
               <Button
                  label={isLoggedIn ? "Upload" : "Log in"}
                  secondary={isLoggedIn}
                  primary={!isLoggedIn}
                  icon={<Icon_Plus/>}
                  onClick={!isLoggedIn ? login : () => {}}
               />

               { isLoggedIn &&
                  <>
                     <Tooltip
                        content={
                           <span>Message</span>
                        }
                     >
                        <Button
                           transparent
                           icon={
                              <Icon_MessagePlane 
                                 width='2.4rem' 
                                 height="2.4rem" 
                                 className={cx('message-icon')}
                              />
                           }
                           className={cx("message-btn")}
                        >
                           <Badge
                              label={"18"}
                              position={"top-right"}
                              styleRule={{
                                 bottom: "50%",
                                 left: "50%"
                              }}
                           />
                        </Button>
                     </Tooltip>

                     <Tooltip
                        content={
                           <span>Mailbox</span>
                        }
                     >
                        <Button
                           transparent
                           icon={<Icon_MessageBox width='3.2rem' height="3.2rem" className={cx('message-icon')}/>}
                           className={cx("message-btn")}
                        >
                           <Badge
                              label={"19"}
                              position={"top-right"}
                              styleRule={{
                                 bottom: "50%",
                                 left: "50%"
                              }}
                           />
                        </Button>
                     </Tooltip>

                  </> 
               }
               <i
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                     width: 'max-content'
                  }}
               >
                  {isLoggedIn ?
                     <Image
                        alt=""   
                        src=''
                        className={cx("avt-icon")}
                     />
                     :
                     <Icon_EllipsisVertical className={cx("actions-icon")}/>
                  }   
                   
                  <HeaderActionMenu
                     isVisible={isVisible}
                     items={ currentActionMenu }
                     appearDelay={appearDelay.current}              
                     hideDelay={hideDelay.current}
                  />
               </i>
            </div>
         </div>
      </header>
   )
}


