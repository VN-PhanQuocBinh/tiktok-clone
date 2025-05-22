import * as request from "../../utils/httpRequest";

export const getComments = async (token, uuid) => {
   const API_query = `videos/${uuid}/comments`;

   const response = await request.getCurrentUser(API_query, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   return response.data;
};

export const likeComment = async (token, id) => {
   let result = { success: false, message: "", data: null };

   try {
      const API_query = `comments/${id}/like`;

      const response = await request.likeComment(API_query, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      result = { ...result, success: true, data: response.data };
   } catch (error) {
      result = { ...result, success: false, message: error };
   }

   return result;
};

export const unlikeComment = async (token, id) => {
   let result = { success: false, message: "", data: null };

   try {
      const API_query = `comments/${id}/unlike`;

      const response = await request.unlikeComment(API_query, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      result = { ...result, success: true, data: response.data };
   } catch (error) {
      result = { ...result, success: false, message: error };
   }

   return result;
};
