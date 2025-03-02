import { forwardRef, useImperativeHandle, useRef, Fragment, Component} from "react"
import { NavLink } from "react-router"

import classNames from "classnames/bind"
import styles from "../assets/styles/components/Button.module.scss"

const cx = classNames.bind(styles)
const defaultFunction = () => {}
 
function Button({ 
   className,
   children,
   primary, 
   secondary, 
   transparent, 
   label, 
   icon,
   style,
   onClick = defaultFunction,
   onPointerEnter = defaultFunction,
   onPointerLeave = defaultFunction,
}, ref) {
   const _ref = useRef(null)

   useImperativeHandle(ref, () => {
      const rect = _ref.current.getBoundingClientRect()
      
      return {
         x: rect.x,
         y: rect.y,
         height: rect.height,
         width: rect.width
      }
   }, [])

   const props = {
      style,
      ref: _ref,
      className: cx({
         "button": true,
         [className]: className,
         primary,
         secondary,
         transparent,
      }),
      onClick,
      onPointerEnter,
      onPointerLeave
   }
   
   return (
      <button {...props}>
         {icon && (
            <div className={cx("icon-wrapper")}>
               {icon}
            </div>
         )}
         {/* <div>
            {icon || Fragment}
         </div> */}
         
         {label && <span>{label}</span>}
         {children}
      </button>
   )
}

export default forwardRef(Button)