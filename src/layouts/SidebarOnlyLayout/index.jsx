import Sidebar from "../components/Sidebar"

import classNames from "classnames/bind"
import styles from "@styles/layouts/SidebarOnlyLayout.module.scss"

const cx = classNames.bind(styles)

export default function SidebarOnlyLayout({children}) {
   return (
      <>
         <div className={cx("container")}>
            <Sidebar className={cx("side-bar")}/>
            <main className={cx("main")}>
               {children}
            </main>
         </div>
      </>
   )
}