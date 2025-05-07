import { useCallback, useEffect, useState } from "react";
import { useAuthModal } from "../../contexts/AuthModalContext";

import LoginItem from "./LoginItem";
import SignupForm_email from "./SignupForm_email";
import LoginForm_email from "./LoginForm_email";
import LogoutModal from "./LogoutModal";

import { loginMethods, signupMethods } from "../../fakeDB";
import { AUTH_TYPE as FORM_TYPE } from "../../constants";

import { Icon_XMark } from "../../assets/Icons";

import styles from "../../assets/styles/components/AuthModal.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AuthModal({ isOpen, type, onClose }) {
   const { openAuthModal, closeAuthModal } = useAuthModal();

   const [currentForm, setCurrentForm] = useState(
      type || FORM_TYPE.LOGIN_OPTIONS
   );
   const [currentList, setCurrentList] = useState([]);
   const [isClosing, setIsClosing] = useState(false);

   useEffect(() => {
      setCurrentForm(type);
   }, [type]);

   useEffect(() => {
      if (currentForm === FORM_TYPE.LOGIN_OPTIONS) setCurrentList(loginMethods);
      else if (currentForm === FORM_TYPE.SIGNUP_OPTIONS)
         setCurrentList(signupMethods);
   }, [currentForm]);

   const handleClose = () => {
      setIsClosing(true);

      setTimeout(() => {
         onClose();
         setIsClosing(false)
      }, 200);
   };

   const handleClick = useCallback(
      (e, type) => {
         if (
            type == "phone_email" &&
            currentForm === FORM_TYPE.SIGNUP_OPTIONS
         ) {
            openAuthModal(FORM_TYPE.SIGNUP);
         } else if (
            type == "phone_email_name" &&
            currentForm === FORM_TYPE.LOGIN_OPTIONS
         ) {
            openAuthModal(FORM_TYPE.LOGIN);
         }
      },
      [currentForm]
   );

   const handleToggle = () => {
      if (
         currentForm === FORM_TYPE.LOGIN_OPTIONS ||
         currentForm === FORM_TYPE.LOGIN
      ) {
         openAuthModal(FORM_TYPE.SIGNUP_OPTIONS);
      } else if (
         currentForm === FORM_TYPE.SIGNUP_OPTIONS ||
         currentForm === FORM_TYPE.SIGNUP
      ) {
         openAuthModal(FORM_TYPE.LOGIN_OPTIONS);
      }
   };

   return (
      isOpen && (
         <div className={cx("wrapper")}>
            {[
               FORM_TYPE.LOGIN_OPTIONS,
               FORM_TYPE.SIGNUP_OPTIONS,
               FORM_TYPE.LOGIN,
               FORM_TYPE.SIGNUP,
            ].indexOf(currentForm) !== -1 && (
               <div className={cx("modal", { close: isClosing })}>
                  <div className={cx("header")}>
                     <h2>Log in to TikTok</h2>

                     <button onClick={handleClose} className={cx("close-btn")}>
                        <Icon_XMark className={cx("icon")} />
                     </button>
                  </div>

                  <div className={cx("inner")}>
                     {(currentForm === FORM_TYPE.LOGIN_OPTIONS ||
                        currentForm === FORM_TYPE.SIGNUP_OPTIONS) && (
                        <ul>
                           {currentList.map((item, key) => (
                              <li key={key}>
                                 <LoginItem onClick={handleClick} {...item} />
                              </li>
                           ))}
                        </ul>
                     )}
                     {currentForm === FORM_TYPE.SIGNUP && (
                        <SignupForm_email className={cx("signup-form")} />
                     )}
                     {currentForm === FORM_TYPE.LOGIN && (
                        <LoginForm_email className={cx("login-form")} />
                     )}
                  </div>

                  <div className={cx("footer")}>
                     <span>
                        {currentForm === FORM_TYPE.LOGIN_OPTIONS ||
                        currentForm === FORM_TYPE.LOGIN
                           ? "Don't have an account?"
                           : "Already have an account?"}
                     </span>
                     <button onClick={handleToggle}>
                        {currentForm === FORM_TYPE.LOGIN_OPTIONS ||
                        currentForm === FORM_TYPE.LOGIN
                           ? "Sign up"
                           : "Log in"}
                     </button>
                  </div>
               </div>
            )}

            {currentForm === FORM_TYPE.LOGOUT_CONFIRM && (
               <LogoutModal
                  onClose={() => closeAuthModal(FORM_TYPE.LOGOUT_CONFIRM)}
               />
            )}
         </div>
      )
   );
}

export default AuthModal;
