import classNames from "classnames/bind";
import styles from "../../assets/styles/components/LogoutModal.module.scss";

const cx = classNames.bind(styles);

function DeleteConfirmComment() {
   return ( 
      <div className={cx("black-bg")}>
         <div className={cx("logout-confirm", { closing: isClosing })}>
            <span>Are you sure you want to log out?</span>
            <button onClick={handleCancel} className={cx("cancel")}>
               Cancel
            </button>
            <button onClick={handleConfirm} className={cx("logout")}>
               Log out
            </button>
         </div>
      </div>
   );
}

export default DeleteConfirmComment;