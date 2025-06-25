import { useUI } from "@contexts/UIContext/UIContext";

import { ACTION_MODAL_TYPES, MODAL_TYPES } from "@types";


import classNames from "classnames/bind";
import styles from "@styles/components/Modals/ui/DeleteConfirmComment.module.scss";

const cx = classNames.bind(styles);

function DeleteConfirmComment({actions}) {
   const { dispatch: uiDispatch } = useUI();

   console.log(actions);
   

   const handleCancel = () => {
      console.log("cancel");
      
      uiDispatch({type: ACTION_MODAL_TYPES.CLOSE_MODAL, modalType: MODAL_TYPES.CONFIRM_DELETE_COMMENT})
   }

   const handleDelete = () => {
      console.log("delete")
      
      actions?.forEach(action => action())

      uiDispatch({type: ACTION_MODAL_TYPES.CLOSE_MODAL, modalType: MODAL_TYPES.CONFIRM_DELETE_COMMENT})
   }

   return ( 
      <div className={cx("black-bg")}>
         <div className={cx("logout-confirm")}>
            <span>Are you sure you want to delete this comment?</span>
            <button onClick={handleDelete} className={cx("delete")}>
               Delete
            </button>
            <button onClick={handleCancel} className={cx("cancel")}>
               Cancel
            </button>
         </div>
      </div>
   );
}

export default DeleteConfirmComment;