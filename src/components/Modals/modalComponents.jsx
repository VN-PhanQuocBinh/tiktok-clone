import { MODAL_TYPES } from "../../constants"

import DeleteConfirmComment from "./ui/DeleteConfirmComment"
import Alert from "./ui/Alert"

import AuthModal from "../AuthModal"
import LogoutModal from "../AuthModal/LogoutModal"

const MODAL_COMPONENTS = {
   [MODAL_TYPES.CONFIRM_DELETE_COMMENT]: DeleteConfirmComment,
   [MODAL_TYPES.ALERT]: Alert,
   [MODAL_TYPES.AUTH_MODALS]: AuthModal,
   [MODAL_TYPES.CONFIRM_LOGOUT]: LogoutModal
}

export default MODAL_COMPONENTS