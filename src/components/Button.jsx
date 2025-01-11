import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import classNames from "classnames/bind"
import styles from "../assets/styles/components/Button.module.scss"

const cx = classNames.bind(styles)

export default function Button({ 
   className,
   children,
   primary, 
   secondary, 
   transparent, 
   label, 
   icon,
   iconSize = "small" ,
   onClick = () => {}
}) {
   const props = {
      className: cx({
         "button": true,
         [className]: className,
         primary,
         secondary,
         transparent, 
      }),
      onClick
   }

   const iconProps = {
      className: cx({
         "icon": true,
         [iconSize]: iconSize
      })
   }

   return (
      <button {...props}>
         {icon ? <FontAwesomeIcon {...iconProps} icon={icon}/> : ""}
         {label && <span>{label}</span>}
         {children}
      </button>
   )
}