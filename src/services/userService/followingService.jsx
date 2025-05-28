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
      console.log("Error fetching following list: ", error);
   }
};

export const follow = async (token, userId) => {
   let result = {success: false, message: ""}
   
   try {
      const API_query = `users/${userId}/follow`;
      const response = await request.follow(API_query, {
         headers: {
            Authorization: `Bearer ${token}`,          
         }
      });
      
      result = {...result, success: true}
   } catch (error) {
      // console.log("Error fetching: ", error);
      result = {...result, success: false, message: error}
   }

   return result
};

export const unfollow = async (token, userId) => {
   let result = {success: false, message: ""}

   try {
      const API_query = `users/${userId}/unfollow`;
      const response = await request.unfollow(API_query, {
         headers: {
            Authorization: `Bearer ${token}`,          
         }
      });
      
      result = {...result, success: true}
   } catch (error) {
      result = {...result, success: false, message: error}
   }
   
   return result
};