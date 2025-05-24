import { MODAL_TYPES, ACTION_MODAL_TYPES } from "../../constants"

const initState = {
   isOpen: false,
   modalType: null,
   modalProps: null
}

const uiReducer = (state, action) => {
   switch (action.type) {
      case ACTION_MODAL_TYPES.CLOSE_MODAL:
         return {
            ...state,
            isOpen: false
         }
      case ACTION_MODAL_TYPES.OPEN_CONFIRM_DELETE_COMMENT:

         return {
            ...state,
            isOpen: true,
            modalType: MODAL_TYPES.CONFIRM_DELETE_COMMENT,
            modalProps: {...action?.modalProps}
         }
      case ACTION_MODAL_TYPES.OPEN_ALERT:
         return {
            ...state,
            isOpen: true,
            modalType: MODAL_TYPES.ALERT,
            modalProps: {...action?.modalProps}
         }
      default:
         return state
   }
}

export {initState, uiReducer}