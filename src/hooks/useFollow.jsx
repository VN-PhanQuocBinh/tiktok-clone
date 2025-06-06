import { useCallback } from "react";
import { useUI } from "../contexts/UIContext/UIContext";
import { useAuth } from "../contexts/AuthContext";

import { follow, unfollow } from "../services/userService/followingService";
import { getToken } from "../utils/token";

import { ACTION_MODAL_TYPES, AUTH_TYPE } from "../constants";

export default function useFollow() {
   const { updateFollowingList } = useAuth();
   const { dispatch: uiDispatch } = useUI();

   return async (user, followed) => {
      const token = getToken();
      const userId = user?.id;

      if (token?.length > 0) {
         // setFollowed(!prevFollowed);
         updateFollowingList(user, followed);
         const response = await (followed
            ? follow(token, userId)
            : unfollow(token, userId));

         // console.log(response);

         if (!response.success) {
            updateFollowingList(user, !followed);
         }
      } else {
         uiDispatch({
            type: ACTION_MODAL_TYPES.OPEN_AUTH_MODALS,
            modalProps: { type: AUTH_TYPE.LOGIN_OPTIONS },
         });
      }
   };
};
