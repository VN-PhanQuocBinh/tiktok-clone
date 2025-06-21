import UploadZone from "./components/UploadZone";

import styles from "./Upload.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function Upload() {
   return (
      <div className={cx("container")}>
         <div className={cx("header")}>

         </div>
         <div className={cx("content")}>
            <UploadZone className={cx("upload-zone")}/>
         </div>
      </div>
   );
}

export default Upload;