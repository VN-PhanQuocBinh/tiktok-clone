import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

import classNames from "classnames/bind";
import styles from "../../assets/styles/layouts/DefaultLayout.module.scss"

const cx = classNames.bind(styles)


export default function DefaultLayout({ children }) {
   return (
      <>
         <div className={cx("container")}>
            <Header/>
            <main className={cx("main")}>
               <Sidebar/>
               {children}
            </main>   
         </div>
      </>
   )
}