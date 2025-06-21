import { MODAL_TYPES, ACTION_MODAL_TYPES } from "../../constants";

const initState = {
   isOpen: false,
   modalType: {},
   modalProps: {},
};

Object.keys(MODAL_TYPES).forEach(key => {
   initState.modalType[MODAL_TYPES[key]] = false
   initState.modalProps[MODAL_TYPES[key]] = {}
})

const uiReducer = (state, action) => {
   switch (action.type) {
      case ACTION_MODAL_TYPES.OPEN_MODAL: {

         return {
            ...state,
            isOpen: true,
            modalType: {...state.modalType, [action.modalType]: true},
            modalProps: {...state.modalProps, [action.modalType]: {...action.modalProps}}
         }
      }
      case ACTION_MODAL_TYPES.CLOSE_MODAL: {
         const newModalType = {...state.modalType}
         let isOpen = true

         if (!action.modalType) {
            isOpen = false
            Object.keys(newModalType).forEach(key => {
               newModalType[key] = false
            })
         } else {
            newModalType[action.modalType] = false
         }

         return {
            ...state,
            isOpen,
            modalType: newModalType
         };
      }
      default:
         return state
   }
};

export { initState, uiReducer };
