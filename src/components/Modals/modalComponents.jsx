import { MODAL_TYPES } from "../../constants"

import DeleteConfirmComment from "./ui/DeleteConfirmComment"

const MODAL_COMPONENTS = {
   [MODAL_TYPES.CONFIRM_DELETE_COMMENT]: DeleteConfirmComment,
}

export default MODAL_COMPONENTS