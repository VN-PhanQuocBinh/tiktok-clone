import * as request from "../../utils/httpRequest";

export const getFollowingList = async (token, page = 1) => {
   try {
      const API_query = "me/followings";
      const response = await request.getUserSuggested(API_query, {
         params: {
            page
         },
         headers: {
            Authorization: `Bearer ${token}`,          
         }
      });
      
      return response;
   } catch (error) {
      console.log("Error fetching users suggested: ", error);
   }
};