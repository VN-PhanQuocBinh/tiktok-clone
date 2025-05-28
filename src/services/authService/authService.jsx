import * as request from "../../utils/httpRequest";

export const getCurrentUser = async (token) => {
   let result = { success: false, message: "", data: null };

   try {
      const API_query = "auth/me";

      const response = await request.getCurrentUser(API_query, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      result = { ...result, success: true, data: response?.data?.data };
   } catch (error) {
      result = { ...result, success: false, message: error };
   }

   return result;
};

export const register = async (email, password) => {
   const API_query = "auth/register";
   const response = await request.register(API_query, {
      type: "email",
      email,
      password,
   });

   return response.data;
};

export const login = async (email, password) => {
   let result = { success: false, message: "", data: null };

   try {
      const API_query = "auth/login";
      const response = await request.login(API_query, {
         type: "email",
         email,
         password,
      });

      result = { ...result, success: true, data: response?.data };
   } catch (error) {
      result = { ...result, success: false, message: error };
   }

   return result;
};
