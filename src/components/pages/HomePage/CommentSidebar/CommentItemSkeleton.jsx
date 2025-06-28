import styles from "@styles/pages/HomePage/CommentSide/CommentItemSkeleton.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function CommentSideSkeleton({className}) {
   return (
      <div
         className={cx("wrapper", { [className]: className })}
      >
         <div className={cx("avt-wrapper")}>
            
         </div>
         <div className={cx("inner")}>
            <div className={cx("inner-header")}>
               
            </div>

            <div className={cx("content")}>
               
            </div>

            <div className={cx("inner-footer")}>
               <div className={cx("left-part")}>

               </div>

               <div className={cx("right-part")}>
                  
               </div>
            </div>
         </div>
      </div>
   );
}

export default CommentSideSkeleton;