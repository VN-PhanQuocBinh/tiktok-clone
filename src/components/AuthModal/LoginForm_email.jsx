import { useState } from "react";

import {
   Icon_Eye,
   Icon_EyeXmark,
   Icon_CircleNotch,
} from "../../assets/Icons";

import { useAuth } from "../../contexts/AuthContext";
import { useUI } from "../../contexts/UIContext/UIContext";
import { ACTION_MODAL_TYPES } from "../../constants";

import styles from "../../assets/styles/components/LoginForm_email.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function LoginForm_email({ className }) {
   const { login, isLoggingIn } = useAuth();
   const { dispatch: uiDispatch } = useUI();

   const [formValue, setFormValue] = useState({
      email_address: "",
      password: "",
   });

   const [resultSubmit, setResultSubmit] = useState({
      success: false,
      message: "",
   });

   const [showPassword, setShowPassword] = useState(false);

   const handleSelect = (type, value) => {
      setFormValue((prev) => {
         let newState = { ...prev };

         newState[type] = value;

         return newState;
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         let response = await login(
            formValue.email_address,
            formValue.password
         );

         console.log(response);

         if (response.success) {
            setFormValue({
               email_address: "",
               password: "",
            });

            setResultSubmit({
               success: true,
               message: "Login is successful!",
            });

            const handleClose = () => {
               setTimeout(() => {
                  uiDispatch({
                     type: ACTION_MODAL_TYPES.CLOSE_MODAL,
                  });
               }, 300); // delay 300ms to allow the animation to finish
            };

            uiDispatch({ type: ACTION_MODAL_TYPES.CLOSE_MODAL });
            uiDispatch({
               type: ACTION_MODAL_TYPES.OPEN_ALERT,
               modalProps: {
                  message: "Login successfully!",
                  openClassName: "slide-down",
                  closeClassName: "slide-up",
                  duration: 3000,
                  onClose: handleClose,
               },
            });
         } else {
            setResultSubmit(response);
         }
      } catch (error) {
         console.log("Please double check the information!", error);
      }
   };

   return (
      <form action="" className={cx("form", { [className]: className })}>
         <div className={cx("email")}>
            <h3>Email or username</h3>

            <div className={cx("address")}>
               <input
                  onInput={(e) =>
                     handleSelect("email_address", e.target?.value)
                  }
                  placeholder="Email address"
                  type="text"
                  name="address"
                  value={formValue.email_address}
               />
            </div>

            <div className={cx("password")}>
               <input
                  onInput={(e) => handleSelect("password", e.target?.value)}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formValue.password}
               />

               {showPassword ? (
                  <Icon_Eye
                     onClick={() => setShowPassword(!showPassword)}
                     className={cx("icon")}
                  />
               ) : (
                  <Icon_EyeXmark
                     onClick={() => setShowPassword(!showPassword)}
                     className={cx("icon")}
                  />
               )}
            </div>

            {resultSubmit.message !== "" && (
               <span
                  className={cx("warning-text", {
                     success: resultSubmit.success,
                     error: !resultSubmit.success,
                  })}
               >
                  {resultSubmit.message}
               </span>
            )}
         </div>

         <button
            disabled={
               !(formValue.email_address !== "" && formValue.password !== "")
            }
            onClick={handleSubmit}
            className={cx("submit-btn")}
         >
            {isLoggingIn ? (
               <Icon_CircleNotch className={cx("loading-icon")} />
            ) : (
               "Next"
            )}
         </button>
      </form>
   );
}

export default LoginForm_email;
