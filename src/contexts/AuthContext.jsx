import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService/authService";
import { getToken, removeToken, saveToken } from "../utils/token";

import { useNavigate } from "react-router";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [isLoggedOut, setIsLoggedOut] = useState(true);
   const [isRegistering, setIsRegistering] = useState(false);
   const [isLoggingIn, setLoggingIn] = useState(false);
   const [user, setUser] = useState({});
   const navigate = useNavigate()

   useEffect(() => {
      navigate("/")
   }, [isLoggedIn])

   useEffect(() => {
      const token = getToken();

      const fetchAPI = async () => {
         try {
            const response = await authService.getCurrentUser(token);
            setUser(response.data);
            // console.log(response);
         } catch (error) {
            console.log("GET CURRENT USER: ", error);
         }
      };

      if (token) {
         fetchAPI();
         setIsLoggedOut(false)
         setIsLoggedIn(true);
      } else {
         setIsLoggedIn(false);
         setIsLoggedOut(true)
      }
   }, []);

   const register = async (email, password) => {
      setIsRegistering(true);

      try {
         const data = await authService.register(email, password);
         // console.log(data);

         return {
            success: true,
            message: "",
         };
      } catch (error) {
         // console.log(error);

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
         const response = await authService.login(email, password);
         const token = await response?.meta?.token;

         setUser(response?.data)
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
      setUser({});
      removeToken();
   };

   return (
      <AuthContext.Provider
         value={{
            user,
            login,
            logout,
            register,
            isLoggedIn,
            isLoggedOut,
            isRegistering,
            isLoggingIn,
         }}
      >
         {/* CHILDREND */}
         {children}
      </AuthContext.Provider>
   );
};

const useAuth = () => {
   return useContext(AuthContext);
};

export { AuthProvider, useAuth };
