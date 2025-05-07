import { createContext, useState, useCallback, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

import AuthModal from "../components/AuthModal";
import { AUTH_TYPE } from "../constants";

const ModalContext = createContext();

const AuthModalProvider = ({ children }) => {
   const { isLoggedIn, isLoggedOut, isRegistering } = useAuth() 

   const [showAuthModal, setShowAuthModal] = useState({
      isOpen: false,
      type: AUTH_TYPE.LOGIN_OPTIONS
   });

   const closeAuthModal = useCallback(() => {
      setShowAuthModal({ ...showAuthModal, isOpen: false });
   }, [showAuthModal]);

   const openAuthModal = (type) => {
      setShowAuthModal({ isOpen: true, type });
   };

   useEffect(() => {
      setShowAuthModal(prev => ({...prev, isOpen: false}));
   }, [isLoggedIn, isLoggedOut])

   return (
      <ModalContext.Provider
         value={{ authModal: showAuthModal, openAuthModal, closeAuthModal }}
      >
         {children}
         <AuthModal
            isOpen={showAuthModal.isOpen}
            type={showAuthModal.type}
            onClose={closeAuthModal}
         />
      </ModalContext.Provider>
   );
};

const useAuthModal = () => useContext(ModalContext);

export { useAuthModal, AuthModalProvider };
