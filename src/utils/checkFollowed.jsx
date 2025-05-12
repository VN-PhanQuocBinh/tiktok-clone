import { getFollowingList } from "../services/userService/followingService";
import { getToken } from "./token";

export const checkFollowed = async (userId) => {
   let page = 1;
   let pageSize = 1;
   let isFound = false;

   
   
   while (page <= pageSize && !isFound) {
      // console.log(userId);
      const token = getToken();

      if (token) {
         const response = await getFollowingList(token, page);
         // console.log(response?.data);
         
         const list = response?.data || []
         isFound = list.some(user => user.id === userId)

         const totalPages = response?.meta?.pagination?.total_pages;
         if (totalPages && pageSize !== totalPages) pageSize = totalPages;
      }

      page++;
   }

   return isFound;
};
