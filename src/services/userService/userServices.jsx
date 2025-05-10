import * as request from "../../utils/httpRequest";

export const getUserSuggested = async (page = 1, per_page = 5) => {
   try {
      const API_query = "users/suggested";
      const response = await request.getUserSuggested(API_query, {
         params: {
            page,
            per_page,
         }
      });
      
      return response.data;
   } catch (error) {
      console.log("Error fetching users suggested: ", error);
   }
};

export const getUser = async (nickname) => {
   try {
      const API_query = "users/"
      const response = await request.getUser(`${API_query}@${nickname}`)

      return response
   } catch(error) {
      console.log("Error fetching users: ", error);
   }
}
