import * as request from "../../utils/httpRequest";

export const getUserVideo = async (id) => {
   try {
      const API_query = `users/${id}/videos`
      const response = await request.getUser(API_query)

      return response.data
   } catch(error) {
      console.log("Error fetching users: ", error);
   }
}
