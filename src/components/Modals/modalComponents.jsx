import { MODAL_TYPES } from "../../constants"

import DeleteConfirmComment from "./ui/DeleteConfirmComment"
import Alert from "./ui/Alert"

const MODAL_COMPONENTS = {
   [MODAL_TYPES.CONFIRM_DELETE_COMMENT]: DeleteConfirmComment,
   [MODAL_TYPES.ALERT]: Alert
}

export default MODAL_COMPONENTS