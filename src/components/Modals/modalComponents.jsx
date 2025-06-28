import { MODAL_TYPES } from "@types"

import DeleteConfirmComment from "./ui/DeleteConfirmComment"
import Alert from "./ui/Alert"

import AuthModal from "./ui/AuthModals"
import LogoutModal from "./ui/AuthModals/LogoutModal"
import EditProfile from "./ui/ProfileEditor/ProfileEditor.jsx"

const MODAL_COMPONENTS = {
   [MODAL_TYPES.CONFIRM_DELETE_COMMENT]: DeleteConfirmComment,
   [MODAL_TYPES.ALERT]: Alert,
   [MODAL_TYPES.AUTH_MODALS]: AuthModal,
   [MODAL_TYPES.CONFIRM_LOGOUT]: LogoutModal,
   [MODAL_TYPES.PROFILE_EDITOR]: EditProfile
}

export default MODAL_COMPONENTS