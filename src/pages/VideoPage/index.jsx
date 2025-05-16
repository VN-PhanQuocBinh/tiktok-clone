import { useParams } from "react-router";

import VideoList from "./components/VideoList/VideoList";
import VideoDetail from "./components/VideoDetail/VideoDetail";

import styles from "./VideoPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function VideoPage() {
   const { nickname, videoId } = useParams();

   console.log(nickname, videoId);

   return (
      <div className={cx("wrapper")}>
         <div className={cx("video-section")}>
            <VideoList  />
         </div>

         <div className={cx("detail-section")}>
            <VideoDetail  />
         </div>
      </div>
   );
}

export default VideoPage;
