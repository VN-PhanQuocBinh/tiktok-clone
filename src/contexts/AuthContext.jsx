import { createContext, useContext, useState } from "react";
import * as authService from "../services/authService/authService";

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const [isRegistering, setIsRegistering] = useState(false)

   const register = async (email, password) => {
      setIsRegistering(true)
      
      try {
         const data = await authService.register(email, password) 
         const token = await data?.meta?.token
         console.log(data);

         return {
            success: true,
            message: ""
         }
      } catch (error) {
         console.log(error);

         let message = ""

         switch (error?.response?.status) {
            case 409:
               message = "Account already exists"
               break
            default:
         }
         
         return {
            success: false,
            message
         }
      } finally {
         setIsRegistering(false)
      }
   }
 
   const login = () => {
      setIsLoggedIn(true)
   }

   const logout = () => {
      setIsLoggedIn(false)
   }


   return (
      <AuthContext.Provider value={{
         isLoggedIn,
         isRegistering,
         login,
         logout,
         register
      }}>
         {children}
      </AuthContext.Provider>
   )
}

const useAuth = () => {
   return useContext(AuthContext)
}

export {
   AuthProvider,
   useAuth
}