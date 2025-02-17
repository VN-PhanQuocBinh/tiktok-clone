import styles from "./Profile.module.scss"
import classNames from "classnames/bind"

import { useParams } from "react-router"


let cx = classNames.bind(styles)

export default function Profile() {
   const { nickname } = useParams()


   return (
      <div className={cx("wrapper")}>
         <h1>Profile Page</h1>
         <p>This is profile of user {nickname}</p>
      </div>
   )
}