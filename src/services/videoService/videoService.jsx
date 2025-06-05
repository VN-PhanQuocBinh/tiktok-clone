import * as request from "../../utils/httpRequest";

export const getVideo = async (type, page = 1) => {
   let result = { success: false, message: "", data: null, meta: null };

   try {
      const API_query = "videos";
      const response = await request.getUserSuggested(API_query, {
         params: {
            type,
            page,
         },
      });

      result = { ...result, success: true, data: response.data, meta: response.meta };
   } catch (error) {
      result = { ...result, success: false, message: error };
   }

   return result;
};


export const likeVideo = async (token, id) => {
   let result = { success: false, message: "", data: null };

   try {
      const API_query = `videos/${id}/like`;

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

export const unlikeVideo = async (token, id) => {
   let result = { success: false, message: "", data: null };

   try {
      const API_query = `videos/${id}/unlike`;

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