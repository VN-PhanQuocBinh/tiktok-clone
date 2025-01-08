import { memo } from "react"

import styles from "../assets/styles/components/DropDown.module.scss"
import classNames from "classnames/bind"


// Component
let cx = classNames.bind(styles)

function DropDown({ isVisible, width, animation, children }) {
   console.log("DropDown re-render");
   
   return (
      (isVisible && 
         <ul 
            className={cx("list", animation ? "fadeout" : "")}
            style={{
               width: width || "100%",
            }}
         >
            {children}     
         </ul>
      )
   )
}

export default memo(DropDown)