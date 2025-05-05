import { useCallback, useEffect, useState } from "react";

import {
   Icon_ArrowDown,
   Icon_Eye,
   Icon_EyeXmark,
   Icon_CircleNotch,
} from "../../assets/Icons";

import { useAuth } from "../../contexts/AuthContext";

import styles from "../../assets/styles/components/LoginForm_email.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function LoginForm_email({ className }) {
   const { login, isLoggingIn } = useAuth();

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
