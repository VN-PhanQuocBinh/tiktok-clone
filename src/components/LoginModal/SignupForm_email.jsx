import { useCallback, useEffect, useState } from "react";

import { Icon_ArrowDown, Icon_Eye, Icon_EyeXmark } from "../../assets/Icons";

import styles from "../../assets/styles/components/SignupForm_email.module.scss";
import classNames from "classnames/bind";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

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

function SignupForm_email({ className }) {
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

   const [showPassword, setShowPassword] = useState(false)

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

   return (
      <form action="" className={cx("form", { [className]: className })}>
         <div className={cx("birth")}>
            <h3>When's your birthday?</h3>
            <div onClick={() => openMenu("month")} className={cx("month")}>
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

            <div onClick={() => openMenu("day")} className={cx("day")}>
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

            <div onClick={() => openMenu("year")} className={cx("year")}>
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

         <button className={cx("submit-btn")}>Next</button>
      </form>
   );
}

export default SignupForm_email;
