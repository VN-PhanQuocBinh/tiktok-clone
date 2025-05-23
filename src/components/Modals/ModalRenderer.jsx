import { MODAL_TYPES } from "../../constants";
import MODAL_COMPONENTS from "./modalComponents";
import { useUI } from "../../contexts/UIContext/UIContext";

import styles from "../../assets/styles/components/Modals/ModalRenderer.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function ModalRenderer({ modalType }) {
   const { state: { isOpen, modalProps } } = useUI();

   if (!isOpen) return null
   

   const ModalComponent = MODAL_COMPONENTS[modalType]

   if (!ModalComponent) return null

   return (
      <div className={cx("modal-wrapper")}>
         <ModalComponent {...modalProps} />
      </div>
   );
}

export default ModalRenderer;