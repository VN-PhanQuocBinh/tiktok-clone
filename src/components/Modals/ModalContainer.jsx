import { createPortal } from "react-dom";

import { useUI } from "../../contexts/UIContext/UIContext";

import ModalRenderer from "./ModalRenderer";

function ModalContainer() {
   const { state } = useUI();

   return createPortal(
      <ModalRenderer modalType={state.modalType} />,
      document.querySelector("body")
   );
}

export default ModalContainer;
