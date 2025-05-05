import * as request from "../../utils/httpRequest";

export const getVideo = async (type, page = 1) => {
   try {
      const API_query = "videos";
      const response = await request.getUserSuggested(API_query, {
         params: {
            type,
            page
         },
      });

      // console.log(response);
      

      return response.data;
   } catch (error) {
      console.log("Error fetching video: ", error);
   }
};
