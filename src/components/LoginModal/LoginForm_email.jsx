import { useCallback, useEffect, useState } from "react";

import { Icon_ArrowDown, Icon_Eye, Icon_EyeXmark } from "../../assets/Icons";

import styles from "../../assets/styles/components/SignupForm_email.module.scss";
import classNames from "classnames/bind";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function LoginForm_email({ className }) {
   const [formValue, setFormValue] = useState({
      email_address: "",
      password: "",
   });

   const [showPassword, setShowPassword] = useState(false)

   const handleSelect = (type, value) => {
      setFormValue((prev) => {
         let newState = { ...prev };

         newState[type] = value;

         return newState;
      });
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

               {showPassword ? 
                  <Icon_Eye onClick={() => setShowPassword(!showPassword)} className={cx("icon")} />
                  : <Icon_EyeXmark onClick={() => setShowPassword(!showPassword)} className={cx("icon")} />
               }
            </div>
         </div>

         <button className={cx("submit-btn")}>Log in</button>
      </form>
   );
}

export default LoginForm_email;
