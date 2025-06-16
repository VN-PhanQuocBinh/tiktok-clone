import { Icon_Next, Icon_Pause } from "./Icons";

import styles from "./AudioControl.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const imgSrc =
   "data:image/jpeg;base64,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";

function AudioControl({ className, collapsed = false }) {
   return (
      <div className={cx("border", { [className]: className })}>
         <div className={cx("blur")}>
            <div className={cx("wrapper")}>
               <div className={cx("img-wrapper")}>
                  <img src={imgSrc} alt="" />
               </div>

               <div className={cx("info")}>
                  <div className={cx("music-name-slider")}>
                     <span className={cx("name-1")}>
                        I Want to Know What Love Is
                     </span>
                     <span className={cx("name-2")}>
                        I Want to Know What Love Is
                     </span>
                  </div>

                  <span className={cx("author-name")}>Foreigner</span>
               </div>

               <div className={cx("controls")}>
                  <Icon_Pause className={cx("icon", "pause")} />
                  {!collapsed && <Icon_Next className={cx("icon", "next")} />}
               </div>
            </div>
         </div>
      </div>
   );
}

export default AudioControl;
