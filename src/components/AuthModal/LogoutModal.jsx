import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import styles from "../../assets/styles/components/LogoutModal.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function LogoutModal({ onClose }) {
   const { logout } = useAuth();

   const [isClosing, setIsClosing] = useState(false);

   const handleCancel = () => {
      setIsClosing(true);

      setTimeout(() => {
         onClose()
         setIsClosing(false);
      }, 200);
   };

   const handleConfirm = () => {
      logout();
   };

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

export default LogoutModal;
