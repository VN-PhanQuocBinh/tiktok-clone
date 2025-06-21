import { Icon_CloudUpload } from "../../../assets/Icons";
import { Icon_ArrowRepeat } from "../../../assets/Icons/components/Upload";

import styles from "../../../assets/styles/components/pages/Upload/UploadZone.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function UploadZone({ className }) {
   return (
      <div className={cx("wrapper", { [className]: className })}>
         {/* <div className={cx("drag-area")}>
            <div className={cx("content")}>
               <Icon_CloudUpload className={cx("icon")}/>
               <div>
                  <span>Select video to upload</span>
                  <span>Or drag and drop it here</span>
               </div>
            </div>
         </div> */}

         <div className={cx("upload-info")}>
            <div className={cx("details")}>
               <div className={cx("file-name")}>
                  <span>OfficialVideo.mp4</span>
                  <span>1080P</span>
               </div>

               <div className={cx("file-details")}>
                  <span className={cx("size")}>7.5MB/12.7MB</span>
                  <span className={cx("duration")}>Duration: 0m25s</span>
                  <span className={cx("time-left")}>3 seconds left</span>
               </div>
            </div>

            <div className={cx("actions")}>
               {/* <button>Cancel</button> */}
               <button>
                  <Icon_ArrowRepeat className={cx("icon")} />
                  Replace
               </button>
               <span>26.04%</span>
            </div>
         </div>

         <div className={cx("progress")}></div>
      </div>
   );
}

export default UploadZone;
