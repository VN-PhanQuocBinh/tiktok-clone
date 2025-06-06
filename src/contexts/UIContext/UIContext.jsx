import { useEffect, useReducer } from "react";
import { createContext, useContext } from "react";

import ModalContainer from "../../components/Modals/ModalContainer";

import { initState, uiReducer } from "./UIReducer";

const UIContext = createContext(null)

function UIProvider({ children }) {
   const [state, dispatch] = useReducer(uiReducer, initState)

   return (
      <UIContext.Provider value={{state, dispatch}}>
         {children}
         <ModalContainer />
      </UIContext.Provider>
   );
}

const useUI = () => useContext(UIContext)

export {useUI, UIProvider}
