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

            <div className={cx("details")}>
               <h4>Details</h4>
               <div className={cx("info-field")}>
                  <div className={cx("caption-container")}>
                     <div className={cx("caption-title")}>Description</div>
                     <div className={cx("caption-markup")}>
                        <div contentEditable="true" className={cx("caption-editor")}></div>
                        <div className={cx("caption-toolbar")}>
                           <button>
                              <span>#</span>
                              Hashtags
                           </button>

                           <button>
                              <span>@</span>
                              Mention
                           </button>

                           <span className={cx("word-count")}>264/2005</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className={cx("buttons")}>
               <button className={cx("post")}>Post</button>
               <button className={cx("discard")}>Discard</button>
            </div>
         </div>
      </div>
   );
}

export default Upload;