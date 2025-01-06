import styles from "../../../../assets/styles/components/Sidebar.module.scss"
import classNames from "classnames/bind"

let cx = classNames.bind(styles)

export default function Sidebar() {
   return (
      <aside className={cx("wrapper")}>
         <h1>Sidebar</h1>
      </aside>
   )
}