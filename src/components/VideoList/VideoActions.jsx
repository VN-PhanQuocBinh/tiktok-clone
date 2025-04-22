

import styles from "../../assets/styles/components/VideoActions.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

function VideoActions({className, ...props}) {

   return (
      <div className={cx("wrapper") + " " + className} {...props}>
         
      </div>
   )
}

export default VideoActions