import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService/authService";
import { getToken, removeToken, saveToken } from "../utils/token";

import classNames from "classnames/bind";
import styles from "../assets/styles/components/AuthContext.module.scss";

const cx = classNames.bind(styles);

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [isRegistering, setIsRegistering] = useState(false);
   const [isLoggingIn, setLoggingIn] = useState(false);
   const [user, setUser] = useState({});

   const [logoutConfirm, setLogoutConfirm] = useState(false);

   const [isClosing, setIsClosing] = useState(false)

   useEffect(() => {
      const token = getToken();

      const fetchAPI = async () => {
         try {
            const response = await authService.getCurrentUser(token);
            setUser(response.data);
            console.log(response);
         } catch (error) {
            console.log("GET CURRENT USER: ", error);
         }
      };

      if (token) {
         // console.log(token);
         fetchAPI();
         setIsLoggedIn(true);
      } else {
         setIsLoggedIn(false);
      }
   }, []);

   const register = async (email, password) => {
      setIsRegistering(true);

      try {
         const data = await authService.register(email, password);
         const token = await data?.meta?.token;
         console.log(data);

         return {
            success: true,
            message: "",
         };
      } catch (error) {
         console.log(error);

         let message = "";

         switch (error?.response?.status) {
            case 409:
               message = "Account already exists";
               break;
            default:
               message = "Unknown error";
         }

         return {
            success: false,
            message,
         };
      } finally {
         setIsRegistering(false);
      }
   };

   const login = async (email, password) => {
      setLoggingIn(true);

      try {
         const data = await authService.login(email, password);
         const token = await data?.meta?.token;
         console.log(token);

         setIsLoggedIn(true);
         saveToken(token);

         // window.location.reload()
         return {
            success: true,
            message: "",
         };
      } catch (error) {
         console.log(error);

         let message = "";

         switch (error?.response?.status) {
            case 401:
               message = "Account doesn't exist";
               break;
            case 422:
               message = "The given data was invalid";
               break;
            default:
               message = "Unknown error";
         }

         return {
            success: false,
            message,
         };
      } finally {
         setLoggingIn(false);
      }
   };

   const logout = () => {
      setIsLoggedIn(false);
      setUser(null);
      removeToken();
   };

   const handleCancel = () => {
      setIsClosing(true)

      setTimeout(() => {
         setLogoutConfirm(false)
         setIsClosing(false)
      }, 200);
   }

   const handleConfirm = () => {
      setLogoutConfirm(false)
      logout()
   }

   return (
      <AuthContext.Provider
         value={{
            user,
            login,
            logout,
            register,
            isLoggedIn,
            isRegistering,
            isLoggingIn,
            logoutConfirm,
            setLogoutConfirm,
         }}
      >
         {/* CHILDREND */}
         {children}

         {/* CONFIRM MODAL */}
         {logoutConfirm && (
            <div className={cx("black-bg")}>
               <div className={cx("logout-confirm", {closing: isClosing})}>
                  <span>Are you sure you want to log out?</span>
                  <button onClick={handleCancel} className={cx("cancel")}>Cancel</button>
                  <button onClick={handleConfirm} className={cx("logout")}>Log out</button>
               </div>
            </div>
         )}
      </AuthContext.Provider>
   );
};

const useAuth = () => {
   return useContext(AuthContext);
};

export { AuthProvider, useAuth };
