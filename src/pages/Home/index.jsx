import { VideoProvider } from "../../contexts/VideoContext/VideoContext";
import VideoList from "../../components/VideoList/VideoList";
import CommentSide from "../../components/CommentSide/CommentSide";

import styles from "./Home.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

export default function Home() {
   return (
      <VideoProvider>
         <div className={cx("wrapper")}>
            <VideoList className={cx("video-list")} />
            <CommentSide />
         </div>
      </VideoProvider>
   );
}
