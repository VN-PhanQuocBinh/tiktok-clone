import { memo, useEffect, useRef, useState, forwardRef } from "react"
import mergeRef from "../utils/mergeRefs"

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
   onHide,
   style
}, ref) {
   const [isAppear, setIsAppear] = useState(isVisible)
   const timerId = useRef()
   const DOM_container = useRef(null)

   // const mergeRef = (...refs) => {
   //    return (DOM_element) => {
   //       refs.forEach((ref) => {
   //          if (typeof ref === "function") {
   //             ref(DOM_element)
   //          } else if (ref && typeof ref === 'object') {
   //             ref.current = DOM_element
   //          }
   //       })
   //    }
   // }

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
               ...style
            }}

            ref={mergeRef(DOM_container, ref)}
         >
            {children}     
         </ul>
      )
   )
}

export default memo(forwardRef(DropDown))