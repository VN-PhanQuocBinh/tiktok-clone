import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useUI } from "../../../../contexts/UIContext/UIContext";

import LoginItem from "./LoginItem";
import SignupForm_email from "./SignupForm_email";
import LoginForm_email from "./LoginForm_email";

import { loginMethods, signupMethods } from "../../../../fakeDB";
import {
   ACTION_MODAL_TYPES,
   AUTH_TYPE as FORM_TYPE,
} from "../../../../constants";

import { Icon_XMark } from "../../../../assets/Icons";

import styles from "../../../../assets/styles/components/AuthModal.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AuthModal({ isOpen = true, type = FORM_TYPE.LOGIN_OPTIONS, onClose }) {
   const { dispatch: uiDispatch } = useUI();

   const currentForm = useMemo(() => {
      if (FORM_TYPE[type.toUpperCase()]) return type
      return FORM_TYPE.LOGIN_OPTIONS
   }, [type]);
   const [currentList, setCurrentList] = useState([]);
   const [isClosing, setIsClosing] = useState(false);

   const DOM_wrapper = useRef(null);

   useEffect(() => {
      const handleBlur = (e) => {
         if (e.target === DOM_wrapper.current) {
            handleClose();
         }
      };

      DOM_wrapper.current?.addEventListener("pointerdown", handleBlur);

      return () =>
         DOM_wrapper.current?.removeEventListener("pointerdown", handleBlur);
   }, []);

   useEffect(() => {
      if (currentForm === FORM_TYPE.LOGIN_OPTIONS) setCurrentList(loginMethods);
      else if (currentForm === FORM_TYPE.SIGNUP_OPTIONS)
         setCurrentList(signupMethods);
   }, [currentForm]);

   const handleClose = () => {
      setIsClosing(true);

      setTimeout(() => {
         onClose?.();
         uiDispatch({ type: ACTION_MODAL_TYPES.CLOSE_MODAL });
         setIsClosing(false);
      }, 200);
   };

   const changeIntoForm = useCallback(
      (type) => {
         console.log(type);

         uiDispatch({
            type: ACTION_MODAL_TYPES.OPEN_AUTH_MODALS,
            modalProps: {
               type,
            },
         });
      },
      [uiDispatch]
   );

   const handleClick = useCallback(
      (e, type) => {
         if (
            type == "phone_email" &&
            currentForm === FORM_TYPE.SIGNUP_OPTIONS
         ) {
            changeIntoForm(FORM_TYPE.SIGNUP);
         } else if (
            type == "phone_email_name" &&
            currentForm === FORM_TYPE.LOGIN_OPTIONS
         ) {
            changeIntoForm(FORM_TYPE.LOGIN);
         }
      },
      [currentForm]
   );

   const handleToggle = () => {
      if (
         currentForm === FORM_TYPE.LOGIN_OPTIONS ||
         currentForm === FORM_TYPE.LOGIN
      ) {
         changeIntoForm(FORM_TYPE.SIGNUP_OPTIONS);
      } else if (
         currentForm === FORM_TYPE.SIGNUP_OPTIONS ||
         currentForm === FORM_TYPE.SIGNUP
      ) {
         changeIntoForm(FORM_TYPE.LOGIN_OPTIONS);
      }
   };

   return (
      isOpen && (
         <div ref={DOM_wrapper} className={cx("wrapper")}>
            {[
               FORM_TYPE.LOGIN_OPTIONS,
               FORM_TYPE.SIGNUP_OPTIONS,
               FORM_TYPE.LOGIN,
               FORM_TYPE.SIGNUP,
            ].indexOf(currentForm) !== -1 && (
               <div className={cx("modal", { close: isClosing })}>
                  <div className={cx("header")}>
                     <h2>
                        {currentForm === FORM_TYPE.LOGIN_OPTIONS ||
                        currentForm === FORM_TYPE.LOGIN
                           ? "Log in to TikTok"
                           : "Sign up for TikTok"}
                     </h2>

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
         </div>
      )
   );
}

export default AuthModal;
