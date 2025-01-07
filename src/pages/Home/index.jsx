import styles from "./Home.module.scss"
import classNames from "classnames/bind"

import DropDown from "../../components/Dropdown"

let cx = classNames.bind(styles)

export default function Home() {
   return (
      <div className={cx("wrapper")}>
         <h1>Home Page</h1>
      </div>
   )
}