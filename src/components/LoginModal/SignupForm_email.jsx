import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import { validateEmail, validatePassword } from "../../utils/validators";

import { validateForm } from "../../utils/validators";

import {
   Icon_ArrowDown,
   Icon_Eye,
   Icon_EyeXmark,
   Icon_Warning,
} from "../../assets/Icons";

import styles from "../../assets/styles/components/SignupForm_email.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];
const years = Array.from(
   { length: 100 },
   (_, i) => new Date().getFullYear() - i
);

const validateMethods = {
   email_address: validateEmail,
   password: validatePassword,
};

function SignupForm_email({ className }) {
   const { isLoggedIn, register } = useAuth();

   const [showMenu, setShowMenu] = useState({
      day: false,
      month: false,
      year: false,
   });

   const [formValue, setFormValue] = useState({
      day: "",
      month: "",
      year: "",
      email_address: "",
      password: "",
   });

   const [showPassword, setShowPassword] = useState(false);
   const [errorState, setErrorState] = useState({
      email_address: {
         isError: false,
         error: null,
      },
      password: {
         isError: false,
         error: null,
      },
   });

   const DOM_day = useRef(null);
   const DOM_month = useRef(null);
   const DOM_year = useRef(null);

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (
            !DOM_day.current?.contains(e.target) &&
            !DOM_month.current?.contains(e.target) &&
            !DOM_year.current?.contains(e.target)
         ) {
            setShowMenu((prev) => {
               let newState = { ...prev };

               Object.keys(newState).forEach((key) => {
                  newState[key] = false;
               });

               return newState;
            });
         }
      };

      document.addEventListener("pointerdown", handleClickOutside);

      return () =>
         document.removeEventListener("pointerdown", handleClickOutside);
   }, [showMenu]);

   const openMenu = (type) => {
      setShowMenu((prev) => {
         let newState = { ...prev };

         if (newState[type]) newState[type] = false;
         else {
            Object.keys(newState).map((key) => {
               newState[key] = false;
            });

            newState[type] = true;
         }

         return newState;
      });
   };

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
         const { isValid, errors } = validateForm({
            ...formValue,
            month: months.indexOf(formValue.month) + 1,
         });
         console.log(isValid, errors);

         if (isValid) {
            let response = await register(formValue.email_address, formValue.password);
            console.log(response);
         }
      } catch (error) {
         console.log("Please double check the information!");
      }
   };

   const handleBlur = (field) => {
      const error = validateMethods[field](formValue[field]);

      setErrorState((prev) => {
         let newState = { ...prev };

         newState[field].isError = !!error;
         newState[field].error = error;

         return newState;
      });
   };

   const handleFocus = (field) => {
      setErrorState((prev) => {
         let newState = { ...prev };

         newState[field].isError = false;
         newState[field].error = null;

         return newState;
      });
   }

   return (
      <form action="" className={cx("form", { [className]: className })}>
         <div className={cx("birth")}>
            <h3>When's your birthday?</h3>
            <div
               ref={DOM_month}
               onClick={() => openMenu("month")}
               className={cx("month")}
            >
               <span
                  className={cx("text", "placeholder", {
                     filled: formValue.month !== "",
                  })}
               >
                  {formValue.month !== "" ? formValue.month : "Month"}
               </span>
               <Icon_ArrowDown
                  className={cx("icon", { active: showMenu.month })}
               />

               {showMenu.month && (
                  <div className={cx("drop-list")}>
                     {months.map((label, key) => (
                        <div
                           className={cx("drop-item")}
                           onClick={() => handleSelect("month", label)}
                           key={key}
                        >
                           {label}
                        </div>
                     ))}
                  </div>
               )}
            </div>

            <div
               ref={DOM_day}
               onClick={() => openMenu("day")}
               className={cx("day")}
            >
               <span
                  className={cx("text", "placeholder", {
                     filled: formValue.day !== "",
                  })}
               >
                  {formValue.day !== "" ? formValue.day : "day"}
               </span>
               <Icon_ArrowDown
                  className={cx("icon", { active: showMenu.day })}
               />
               {showMenu.day && (
                  <div className={cx("drop-list")}>
                     {days.map((label, key) => (
                        <div
                           className={cx("drop-item")}
                           onClick={() => handleSelect("day", label)}
                           key={key}
                        >
                           {label}
                        </div>
                     ))}
                  </div>
               )}
            </div>

            <div
               ref={DOM_year}
               onClick={() => openMenu("year")}
               className={cx("year")}
            >
               <span
                  className={cx("text", "placeholder", {
                     filled: formValue.year !== "",
                  })}
               >
                  {formValue.year !== "" ? formValue.year : "Year"}
               </span>
               <Icon_ArrowDown
                  className={cx("icon", { active: showMenu.year })}
               />
               {showMenu.year && (
                  <div className={cx("drop-list")}>
                     {years.map((label, key) => (
                        <div
                           className={cx("drop-item")}
                           onClick={() => handleSelect("year", label)}
                           key={key}
                        >
                           {label}
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>

         <div className={cx("email")}>
            <h3>Email</h3>

            <div className={cx("field-box")}>
               <div
                  className={cx("address", {
                     warning: errorState.email_address.isError,
                  })}
               >
                  <input
                     onInput={(e) =>
                        handleSelect("email_address", e.target?.value)
                     }
                     onBlur={() => handleBlur("email_address")}
                     onFocus={() => handleFocus("email_address")}
                     placeholder="Email address"
                     type="text"
                     name="address"
                     value={formValue.email_address}
                  />

                  {errorState.email_address.isError && (
                     <Icon_Warning className={cx("icon", "warn-icon")} />
                  )}
               </div>

               {errorState.email_address.isError && (
                  <span className={cx("warning-text")}>
                     {errorState.email_address.error}
                  </span>
               )}
            </div>

            <div className={cx("field-box")}>
               <div
                  className={cx("password", {
                     warning: errorState.password.isError,
                  })}
               >
                  <input
                     onInput={(e) => handleSelect("password", e.target?.value)}
                     onBlur={() => handleBlur("password")}
                     onFocus={() => handleFocus("password")}
                     placeholder="Password"
                     type={showPassword ? "text" : "password"}
                     name="password"
                     value={formValue.password}
                  />

                  {errorState.password.isError && (
                     <Icon_Warning className={cx("icon", "warn-icon")} />
                  )}

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

               {errorState.password.isError && (
                  <span className={cx("warning-text")}>
                     {errorState.password.error}
                  </span>
               )}
            </div>
         </div>

         <button onClick={handleSubmit} className={cx("submit-btn")}>
            Next
         </button>
      </form>
   );
}

export default SignupForm_email;
