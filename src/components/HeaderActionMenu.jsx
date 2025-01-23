import { useEffect, useState, useLayoutEffect, useCallback } from "react"
import { useAuth } from "../contexts/AuthContext"

import DropDown from "./DropDown"
import DropDownItem from "./DropDownItem"

import { DROPDOWN_ITEM_TYPE as TYPE } from "../constants"

import classNames from "classnames/bind"
import styles from "../assets/styles/components/HeaderActionMenu.module.scss"
import { faAngleLeft, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons"

const cx = classNames.bind(styles)

export default function HeaderActionMenu({ 
   isVisible, 
   items, 
   appearDelay = 0, 
   hideDelay = 0 
}) {
   const initHistory = useCallback(() => {
      return [{ children: items }]
   }, [items])

   const [history, setHistory] = useState(initHistory)
   const [currentMenu, setCurrentMenu] = useState(history[0])
   const { isLoggedIn, logout } = useAuth()

   useEffect(() => {
      setCurrentMenu(history[history.length - 1])

      return () => {}
   }, [history])

   function handleClick(index) {
      const clickedItem = history[history.length - 1].children[index]
      console.log(history[history.length - 1]);
      

      if (clickedItem?.children) {
         setHistory((prev) => [...prev, clickedItem])  
      } else {
         console.log(clickedItem);        
      }     
   }

   function handleBack() {
      setHistory((prev) => {
         let len = prev.length

         if (len > 1)
            return prev.splice(0, prev.length - 1)

         return prev
      })
   }

   function handleHide() {
      setHistory(initHistory)
   }
     
   // console.group("Header action re-render")
   // console.log("history: ", history)
   // console.log("logged in: ", isLoggedIn)
   // console.groupEnd()

   return (
      <DropDown 
         isVisible={isVisible} 
         width={"max-content"}
         animation={{
            appear: "fadeout",
            hide: "fadein"
         }}
         delay={[appearDelay, hideDelay]}
         className={cx("drop-down")}
         onHide={handleHide}
      >
         {history.length > 1 && 
            <DropDownItem
               type={TYPE.ACTIONS_HEADER}
               itemClick={handleBack}
               item={{
                  label: currentMenu.label,
                  icon: faAngleLeft
               }}
            />
         }

         {currentMenu.children.map((item, index) => (
            <DropDownItem
               key={index}
               type={TYPE.ACTIONS}
               item={item}
               itemClick={() => handleClick(index)}
               className={cx("drop-item")}
            />
         ))}

         {(isLoggedIn && history.length <= 1) && 
            <DropDownItem
            type={TYPE.ACTIONS}
            itemClick={logout}
            item={{
               label: "Log out",
               icon: faArrowRightToBracket
            }}
            className={cx("logout-action")}
         />
         }
      </DropDown>
   )
}