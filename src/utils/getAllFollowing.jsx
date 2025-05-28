import { getFollowingList } from "../services/userService/followingService";
import { getToken } from "./token";

export const getAllFollowingList = async () => {
   let page = 1;
   let pageSize = 1;
   let responseList = []
   
   while (page <= pageSize) {
      const token = getToken();

      if (token) {
         const response = await getFollowingList(token, page);
         // console.log(response?.data);
         
         const list = response?.data || []
         responseList = [...responseList, ...list]

         const totalPages = response?.meta?.pagination?.total_pages;
         if (totalPages && pageSize !== totalPages) pageSize = totalPages;
      }

      page++;
   }

   return responseList;
};
