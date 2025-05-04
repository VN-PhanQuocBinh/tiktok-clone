import * as request from "../../utils/httpRequest";

export const register = async (email, password) => {
   // try {
      const API_query = "auth/register";
      const response = await request.register(API_query, {
         type: "email",
         email,
         password,
      });
      

      return response.data;
   // } catch (error) {
   //    console.log("Error fetching register: ", error);
   // }
};
