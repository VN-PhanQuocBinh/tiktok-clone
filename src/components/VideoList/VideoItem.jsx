import VideoPlayer from "./VideoPlayer"

import classNames from "classnames/bind"
import styles from "../../assets/styles/components/VideoItem.module.scss"

const cx = classNames.bind(styles)

function VideoItem({ className, video }) {

   return (
      <li className={cx("video-item", {[className]: className})}>
         <VideoPlayer className={cx("video-element")} src={video.file_url} controls></VideoPlayer>
      </li>
   )
}

export default VideoItem