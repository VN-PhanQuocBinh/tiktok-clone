import {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from "react";

import * as authService from "../services/authService/authService";
import { getToken, removeToken, saveToken } from "../utils/token";
import { getAllFollowingList } from "../utils/getAllFollowing";

import { useNavigate } from "react-router";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [isRegistering, setIsRegistering] = useState(false);
   const [isLoggingIn, setLoggingIn] = useState(false);
   const [user, setUser] = useState({});
   const [followingList, setFollowingList] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      if (isLoggedIn) {
         (async () => {
            const _list = await getAllFollowingList();
            // console.log(_list);

            setFollowingList(_list);
         })();
      } else {
         setFollowingList([]);
      }

      navigate("/");
   }, [isLoggedIn]);

   useEffect(() => {
      const token = getToken();

      if (token) {
         (async () => {
            const response = await authService.getCurrentUser(token);

            if (response.success) {
               setUser(response.data);
               setIsLoggedIn(true);
            } else {
               setIsLoggedIn(false);
            }
         })();
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

      const response = await authService.login(email, password);

      setLoggingIn(false);

      if (response?.success) {
         const token = await response?.data?.meta?.token;

         setUser(response?.data?.data);
         setIsLoggedIn(true);
         saveToken(token);

         // window.location.reload()
         return {
            success: true,
            message: "",
         };
      } else {
         let message = "";

         switch (response?.message?.status) {
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
      }
   };

   const logout = () => {
      setIsLoggedIn(false);
      setUser({});
      removeToken();
   };

   const updateFollowingList = (user, isFollowed) => {
      if (isFollowed) {
         setFollowingList((prev) => [...prev, user]);
      } else {
         setFollowingList((prev) => {
            let newList = [...prev];
            newList = newList.filter((_user) => _user.id !== user.id);
            return newList;
         });
      }
   };

   const updateCurrentUser = useCallback((formData = {}) => {
      setUser((prev) => {
         const newUser = {...prev}

         Object.keys(newUser).forEach((key) => {
            newUser[key] = formData[key] || newUser[key]
         });

         return newUser
      });

      () => URL.revokeObjectURL(user.avatar)
   }, [user])

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
            followingList,
            updateFollowingList,
            updateCurrentUser
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
