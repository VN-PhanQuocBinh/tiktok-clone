import { useUI } from "../../../contexts/UIContext/UIContext";

import { ACTION_MODAL_TYPES } from "../../../constants";


import classNames from "classnames/bind";
import styles from "../../../assets/styles/components/Modals/ui/DeleteConfirmComment.module.scss";

const cx = classNames.bind(styles);

function DeleteConfirmComment() {
   const { dispatch: uiDispatch } = useUI();

   const handleCancel = () => {
      console.log("cancel");
      
      uiDispatch({type: ACTION_MODAL_TYPES.CLOSE_MODAL})
   }

   const handleDelete = () => {

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