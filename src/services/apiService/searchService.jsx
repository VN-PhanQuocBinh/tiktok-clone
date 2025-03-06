import * as request from "../../utils/httpRequest";

export const search = async (query, type = 'less') => {
   try {
      const API_query = "users/search"
      const response = await request.get(API_query, {
         params: {
            q: query,
            type,
         }
      })

      return response.data
   } catch (error) {
      console.log("Error fetching search result: ", error)
   } 
}