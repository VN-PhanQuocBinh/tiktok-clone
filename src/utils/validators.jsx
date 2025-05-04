// utils/validators.js

export const validateEmail = (email) => {
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!email) return "Email address is required";
   if (!regex.test(email)) return "Enter a valid email address";
   return null;
};

export const validatePassword = (password) => {
   if (!password) return "Password is required";
   if (password.length < 6) return "Password must have 8 to 20 characters";
   return null;
};

export const validateDay = (day) => {
   if (!day) return "Day is required";
   const num = Number(day);
   if (isNaN(num) || num < 1 || num > 31) return "Invalid day";
   return null;
};

export const validateMonth = (month) => {
   if (!month) return "Month is required";
   const num = Number(month);
   if (isNaN(num) || num < 1 || num > 12) return "Invalid month";
   return null;
};

export const validateYear = (year) => {
   if (!year) return "Year is required";
   const num = Number(year);
   const currentYear = new Date().getFullYear();
   if (isNaN(num) || num < 1900 || num > currentYear) return "Invalid year";
   return null;
};

// ✅ Hàm tổng kiểm tra toàn bộ form
export const validateForm = (formValues) => {
   // console.log(formValues);

   const errors = {};
   let isValid = true

   const dayError = validateDay(formValues.day);
   if (dayError) errors.day = dayError;

   const monthError = validateMonth(formValues.month);
   if (monthError) errors.month = monthError;

   const yearError = validateYear(formValues.year);
   if (yearError) errors.year = yearError;

   const emailError = validateEmail(formValues.email_address);
   if (emailError) errors.email_address = emailError;

   const passwordError = validatePassword(formValues.password);
   if (passwordError) errors.password = passwordError;

   if (dayError || monthError || yearError || emailError || passwordError)
      isValid = false

   return {isValid, errors};
};
