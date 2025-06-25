import { createPortal } from "react-dom";

import { useUI } from "@contexts/UIContext/UIContext";

import ModalRenderer from "./ModalRenderer";

function ModalContainer() {
   const { state } = useUI();

   return createPortal(
      <ModalRenderer />,
      document.querySelector("body")
   );
}

export default ModalContainer;
