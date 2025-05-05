function validateDay(day) {
   const dayNumber = Number(day);
   if (!day) return { valid: false, error: "Day is required." };
   if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 31) {
      return { valid: false, error: "Day must be between 1 and 31." };
   }
   return { valid: true };
}

function validateMonth(month) {
   const monthNumber = Number(month);
   if (!month) return { valid: false, error: "Month is required." };
   if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return { valid: false, error: "Month must be between 1 and 12." };
   }
   return { valid: true };
}

function validateYear(year) {
   const yearNumber = Number(year);
   const currentYear = new Date().getFullYear();
   if (!year) return { valid: false, error: "Year is required." };
   if (isNaN(yearNumber) || yearNumber < 1900 || yearNumber > currentYear) {
      return {
         valid: false,
         error: `Year must be between 1900 and ${currentYear}.`,
      };
   }
   return { valid: true };
}

function validateFullDate(day, month, year) {
   const d = Number(day);
   const m = Number(month) - 1; // JavaScript month index (0-11)
   const y = Number(year);

   const date = new Date(y, m, d);
   const isValid =
      date.getFullYear() === y && date.getMonth() === m && date.getDate() === d;

   if (!isValid) {
      return { valid: false, error: "Invalid date combination." };
   }

   return { valid: true };
}

function validateEmail(email) {
   if (!email) return { valid: false, error: "Email is required." };
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!regex.test(email))
      return { valid: false, error: "Invalid email format." };
   return { valid: true };
}

function validatePassword(password) {
   if (!password) return { valid: false, error: "Password is required." };
   if (password.length < 6)
      return { valid: false, error: "Password must be at least 6 characters." };
   return { valid: true };
}

export function validateForm(formValue) {
   const errors = {
      valid: true,
      error: {
         day: "",
         month: "",
         year: "",
         email_address: "",
         password: "",
      }
   };

   // Validate day
   const dayCheck = validateDay(formValue.day);
   if (!dayCheck.valid) errors.day = dayCheck.error;

   // Validate month
   const monthCheck = validateMonth(formValue.month);
   if (!monthCheck.valid) errors.month = monthCheck.error;

   // Validate year
   const yearCheck = validateYear(formValue.year);
   if (!yearCheck.valid) errors.year = yearCheck.error;

   // If day, month, and year are all valid, check full date
   if (dayCheck.valid && monthCheck.valid && yearCheck.valid) {
      const fullDateCheck = validateFullDate(
         formValue.day,
         formValue.month,
         formValue.year
      );
      if (!fullDateCheck.valid) {
         errors.date = fullDateCheck.error;
      }
   }

   // Validate email
   const emailCheck = validateEmail(formValue.email_address);
   if (!emailCheck.valid) errors.email_address = emailCheck.error;

   // Validate password
   const passwordCheck = validatePassword(formValue.password);
   if (!passwordCheck.valid) errors.password = passwordCheck.error;

   
   Object.keys(errors).forEach(key => {
      if (errors.error[key]) {
         errors.valid = false
      }
   })

   return errors;
}

export {
   validateDay,
   validateMonth,
   validateYear,
   validateFullDate,
   validateEmail,
   validatePassword,
};
