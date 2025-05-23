import { MODAL_TYPES, ACTION_MODAL_TYPES } from "../../constants"

const initState = {
   isOpen: false,
   modalType: null
}

const uiReducer = (state, action) => {
   switch (action.type) {
      case ACTION_MODAL_TYPES.CLOSE_MODAL:
         return {
            ...state,
            isOpen: false
         }
      case ACTION_MODAL_TYPES.OPEN_CONFIRM_DELETE_COMMENT:
         console.log(ACTION_MODAL_TYPES.OPEN_CONFIRM_DELETE_COMMENT);

         return {
            ...state,
            isOpen: true,
            modalType: action?.payload
         }
      default:
         return state
   }
}

export {initState, uiReducer}