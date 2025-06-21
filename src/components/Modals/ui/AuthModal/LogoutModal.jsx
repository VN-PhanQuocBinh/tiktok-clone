import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useUI } from "../../../../contexts/UIContext/UIContext";

import { ACTION_MODAL_TYPES, MODAL_TYPES } from "../../../../constants";

import styles from "../../../../assets/styles/components/LogoutModal.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function LogoutModal({ onClose }) {
   const { logout } = useAuth();
   const { dispatch: uiDispatch } = useUI();

   const DOM_blackBg = useRef(null)

   const [isClosing, setIsClosing] = useState(false);

   useEffect(() => {
      const handleBlur = (e) => {
         if (e.target === DOM_blackBg.current) {
            handleCancel()
         }
      }

      DOM_blackBg.current?.addEventListener("pointerdown", handleBlur)

      return () => DOM_blackBg.current?.removeEventListener("pointerdown", handleBlur)
   }, [])

   const handleCancel = () => {
      setIsClosing(true);

      setTimeout(() => {
         onClose?.();
         uiDispatch({
            type: ACTION_MODAL_TYPES.CLOSE_MODAL,
            modalType: MODAL_TYPES.CONFIRM_LOGOUT
         });

         setIsClosing(false);
      }, 200);
   };

   const handleConfirm = () => {
      logout();
      handleCancel()
   };

   return (
      <div ref={DOM_blackBg} className={cx("black-bg")}>
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
