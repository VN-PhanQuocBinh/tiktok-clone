import LoginItem from "./LoginItem";
import SignupForm_email from "./SignupForm_email";
import LoginForm_email from "./LoginForm_email";
import { loginMethods, signupMethods } from "@/fakeDB";

import { Icon_XMark } from "@icons";

import styles from "@styles/components/AuthContext/AuthModals/LoginModal.module.scss";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";

const cx = classNames.bind(styles);

const FORM_TYPE = {
   LOGIN_OPTIONS: "login_options",
   SIGNUP_OPTIONS: "signup_options",
   LOGIN: "login",
   SIGNUP: "signup",
};

function LoginModal({ onClose }) {
   const [currentList, setCurrentList] = useState([]);
   const [isClosing, setIsClosing] = useState(false);

   const [showForm, setShowForm] = useState({
      [FORM_TYPE.LOGIN_OPTIONS]: true,
      [FORM_TYPE.SIGNUP_OPTIONS]: false,
      [FORM_TYPE.SIGNUP]: false,
      [FORM_TYPE.LOGIN]: false,
   });

   useEffect(() => {
      if (showForm[FORM_TYPE.LOGIN_OPTIONS]) 
         setCurrentList(loginMethods);
      else if (showForm[FORM_TYPE.SIGNUP_OPTIONS])
         setCurrentList(signupMethods);
   }, [showForm]);

   const handleClose = () => {
      setIsClosing(true);

      setTimeout(() => {
         onClose();
      }, 200);
   };

   const handleChangeForm = (type) => {
      setShowForm((prev) => {
         let newState = { ...prev };

         Object.keys(newState).forEach((key) => {
            newState[key] = false;
         });

         newState[type] = true;

         return newState;
      });
   };

   const handleClick = useCallback((e, type) => {
      if (type == "phone_email" && showForm[FORM_TYPE.SIGNUP_OPTIONS]) {
         handleChangeForm(FORM_TYPE.SIGNUP)
      } else if (type == "phone_email_name" && showForm[FORM_TYPE.LOGIN_OPTIONS]) {
         handleChangeForm(FORM_TYPE.LOGIN)
      }
   }, [showForm]);

   const handleToggle = () => {
      if (showForm[FORM_TYPE.LOGIN_OPTIONS] || showForm[FORM_TYPE.LOGIN]) {
         handleChangeForm(FORM_TYPE.SIGNUP_OPTIONS);
      } else if (showForm[FORM_TYPE.SIGNUP_OPTIONS] || showForm[FORM_TYPE.SIGNUP]) {
         handleChangeForm(FORM_TYPE.LOGIN_OPTIONS);
      }
   };

   return (
      <div className={cx("wrapper")}>
         <div className={cx("modal", { close: isClosing })}>
            <div className={cx("header")}>
               <h2>Log in to TikTok</h2>

               <button onClick={handleClose} className={cx("close-btn")}>
                  <Icon_XMark className={cx("icon")} />
               </button>
            </div>

            <div className={cx("inner")}>
               {(showForm[FORM_TYPE.LOGIN_OPTIONS] ||
                  showForm[FORM_TYPE.SIGNUP_OPTIONS]) && (
                  <ul>
                     {currentList.map((item, key) => (
                        <li key={key}>
                           <LoginItem onClick={handleClick} {...item} />
                        </li>
                     ))}
                  </ul>
               )}
               {showForm[FORM_TYPE.SIGNUP] && (
                  <SignupForm_email className={cx("signup-form")} />
               )}
               {showForm[FORM_TYPE.LOGIN] && (
                  <LoginForm_email className={cx("login-form")} />
               )}
            </div>

            <div className={cx("footer")}>
               <span>
                  {showForm[FORM_TYPE.LOGIN_OPTIONS] ||
                  showForm[FORM_TYPE.LOGIN]
                     ? "Don't have an account?"
                     : "Already have an account?"}
               </span>
               <button onClick={handleToggle}>
                  {showForm[FORM_TYPE.LOGIN_OPTIONS] ||
                  showForm[FORM_TYPE.LOGIN]
                     ? "Sign up"
                     : "Log in"}
               </button>
            </div>
         </div>
      </div>
   );
}

export default LoginModal;
