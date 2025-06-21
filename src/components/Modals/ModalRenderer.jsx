import { MODAL_TYPES } from "../../constants";
import MODAL_COMPONENTS from "./modalComponents";
import { useUI } from "../../contexts/UIContext/UIContext";

import styles from "../../assets/styles/components/Modals/ModalRenderer.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ModalRenderer() {
   const {
      state: { isOpen, modalProps, modalType },
   } = useUI();

   if (!isOpen) return null;

   return (
      <div className={cx("modal-wrapper")}>
         {Object.keys(MODAL_TYPES).map((key, index) => {
            const modalKey = MODAL_TYPES[key];
            if (modalType[modalKey]) {
               const ModalComponent = MODAL_COMPONENTS[modalKey]
               return  <ModalComponent key={index} {...modalProps[modalKey]}/>
            }
            return null
         })}
      </div>
   );
}

export default ModalRenderer;
