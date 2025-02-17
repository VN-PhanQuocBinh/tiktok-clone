import { useEffect, useState, useLayoutEffect, useCallback } from "react"
import { useAuth } from "../contexts/AuthContext"

import DropDown from "./DropDown"
import DropDownItem from "./DropDownItem"

import { DROPDOWN_ITEM_TYPE as TYPE } from "../constants"

import classNames from "classnames/bind"
import styles from "../assets/styles/components/HeaderActionMenu.module.scss"


import {
   Icon_AngleLeft,
   Icon_ArrowRightToBracket
} from "../assets/Icons"

const cx = classNames.bind(styles)



export default function HeaderActionMenu({ 
   isVisible, 
   items, 
   appearDelay = 0, 
   hideDelay = 0 
}) {
   const [history, setHistory] = useState([])
   const [currentMenu, setCurrentMenu] = useState()
   const { isLoggedIn, logout } = useAuth()

   // useLayoutEffect(() => {
   //    setHistory([{children: items}])
   // }, [items])

   useLayoutEffect(() => {
      const resetValue = {children: items}
      // console.log("init ", resetValue);
      
      // setCurrentMenu(resetValue)
      setHistory([resetValue])
      
      return () => {}
   }, [items])

   useLayoutEffect(() => {
      setCurrentMenu(history[history.length - 1])
   }, [history])

   const handleClick = useCallback((index) => {
      const clickedItem = history[history.length - 1].children[index]
      console.log(history[history.length - 1]);
      

      if (clickedItem?.children) {
         setHistory((prev) => [...prev, clickedItem])  
      } else {
         console.log(clickedItem);        
      }   
   }, [history])

   const handleBack = () => {
      setHistory((prev) => {
         let len = prev.length

         if (len > 1)
            return prev.splice(0, prev.length - 1)

         return prev
      })
   }

   const handleHide = useCallback(() => { 
      setHistory([{children: items}])
   }, [items]) 



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
         {/* {console.log(history)} */}
         {history.length > 1 && 
            <DropDownItem
               type={TYPE.ACTIONS_HEADER}
               itemClick={handleBack}
               item={{
                  label: currentMenu.label,
                  icon: Icon_AngleLeft
               }}
            />
         }

         {currentMenu?.children.map((item, index) => (
            <DropDownItem
               key={index}
               type={TYPE.ACTIONS}
               item={item}
               itemClick={() => handleClick(index)}
               className={cx("drop-item")}
               icon_className={cx("icon")}
            />
         ))}

         {(isLoggedIn && history.length <= 1) && 
            <DropDownItem
               type={TYPE.ACTIONS}
               itemClick={logout}
               item={{
                  label: "Log out",
                  icon: Icon_ArrowRightToBracket
               }}
               className={cx("logout-action")}
               icon_className={cx("icon")}
            />
         }
      </DropDown>
   )
}