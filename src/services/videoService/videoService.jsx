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
