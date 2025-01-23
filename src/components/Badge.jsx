import classNames from "classnames/bind" 
import styles from "../assets/styles/components/Badge.module.scss"

const cx = classNames.bind(styles)

export default function Badge({ 
   label, 
   position = "top-left", 
   styleRule
}) { 
   const props = {
      className: cx({
         "badge": true,
         [position]: position
      }),
      style: styleRule
   }

   return (
      <div {...props}>
         {label}
      </div>
   )
}