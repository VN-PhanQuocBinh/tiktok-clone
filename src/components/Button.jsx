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
   to,
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

   let ElementType = 'button'
   if (to != null) ElementType = NavLink

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
      to,
      onClick,
      onPointerEnter,
      onPointerLeave
   }

   console.log(to);
   

   return (
      <ElementType {...props}>
         {icon || Fragment}
         {label && <span>{label}</span>}
         {children}
      </ElementType>
   )
}

export default forwardRef(Button)