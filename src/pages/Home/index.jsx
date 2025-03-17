import VideoList from "../../components/VideoList/VideoList"

import styles from "./Home.module.scss"
import classNames from "classnames/bind"

let cx = classNames.bind(styles)

export default function Home() {
   return (
      <div className={cx("wrapper")}>
         <VideoList/>
      </div>
   )
}