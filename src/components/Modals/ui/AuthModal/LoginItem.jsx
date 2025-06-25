

import { Fragment } from "react"
import styles from "@styles/components/LoginItem.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

function LoginItem({label = "", icon: Icon = Fragment, type = "", onClick = () => {}}) {

   return (
      <button onClick={(e) => onClick(e, type)} className={cx("button")}>
         <span className={cx("icon-wrapper")}>
            <Icon className={cx("icon")}/>
         </span>
         <span className={cx("label")}>{label}</span>
      </button>
   )
}

export default LoginItem