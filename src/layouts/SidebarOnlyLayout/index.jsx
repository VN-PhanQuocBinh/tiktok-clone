import Sidebar from "../components/Sidebar"

import classNames from "classnames/bind"
import styles from "../../assets/styles/layouts/SidebarOnlyLayout.module.scss"

const cx = classNames.bind(styles)

export default function SidebarOnlyLayout({children}) {
   return (
      <>
         <div className={cx("container")}>
            <Sidebar/>
            <main className={cx("main")}>
               {children}
            </main>
         </div>
      </>
   )
}