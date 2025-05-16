import styles from "../../assets/styles/components/CommentSide/CommentSide.module.scss";
import classNames from "classnames/bind";
import { useVideo } from "../../contexts/VideoContext/VideoContext";
import { useEffect, useState } from "react";

import { Icon_XMark, Icon_Tag, Icon_Emoji } from "../../assets/Icons";

const cx = classNames.bind(styles);

function CommentSide({ className }) {
   const { state, dispatch } = useVideo();
   const [animation, setAnimation] = useState(false);

   useEffect(() => {
      setTimeout(() => {
         setAnimation(state.isCommentVisible);
      }, 100);
   }, [state]);

   return (
      <div className={cx("animation-wrapper", { animation: animation })}>
         {state.isCommentVisible && (
            <div className={cx("wrapper", { [className]: className })}>
               <div className={cx("header")}>
                  <h4>Comments (24)</h4>
                  <button className={cx("close-btn")}>
                     <span className={cx("icon")}>
                        <Icon_XMark />
                     </span>
                  </button>
               </div>

               <div className={cx("inner")}>
                  <ul>Comment Side</ul>
               </div>

               <div className={cx("footer")}>
                  <div className={cx("input-box")}>
                     <input type="text" />

                     <button className={cx("tag-btn")}>
                        <span>
                           <Icon_Tag />
                        </span>
                     </button>

                     <button className={cx("emoji-btn")}>
                        <span>
                           <Icon_Emoji />
                        </span>
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default CommentSide;
