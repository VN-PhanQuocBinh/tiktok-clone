import { memo, useEffect, useLayoutEffect, useRef, useState } from "react"

import styles from "../assets/styles/components/DropDown.module.scss"
import classNames from "classnames/bind"


// Component
let cx = classNames.bind(styles)

function DropDown({ 
   isVisible,
   onBlur,
   width, 
   animation, 
   delay = [0, 0], 
   className, 
   children, 
   onHide
}) {
   const [isAppear, setIsAppear] = useState(isVisible)
   const timerId = useRef()
   const DOM_container = useRef(null)

   useEffect(() => {
      if (!isVisible) {
         clearTimeout(timerId.current)
         timerId.current = setTimeout(() => {
            // console.log(`hide ${delay[1]}`);
            setIsAppear(false)
            onHide && onHide()
         }, delay[1])
      } else {
         clearTimeout(timerId.current)
         timerId.current = setTimeout(() => {
            // console.log(`appear ${delay[0]}`);
            setIsAppear(true)
         }, delay[0])
      }
   }, [isVisible])

   useEffect(() => {
      if (onBlur) {
         function handleClickOutside(e) {
            if (!DOM_container.current?.contains(e.target)) 
               onBlur()
         }
   
         document.addEventListener("mousedown", handleClickOutside)
   
         return () => {
            document.removeEventListener("mousedown", handleClickOutside)
         }
      }
   }, [])

   // console.log("DropDown re-render");
   return (
      (isAppear && 
         <ul 
            className={cx({
               "list": true, 
               [animation?.appear]: animation?.appear,
               [animation?.hide]: !isVisible,
               [className]: className,
            })}

            style={{
               width: width || "100%",
            }}

            ref={DOM_container}
         >
            {children}     
         </ul>
      )
   )
}

export default memo(DropDown)