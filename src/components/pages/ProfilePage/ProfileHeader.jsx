import { useMemo, useCallback } from "react";
import { useFollow } from "../../../hooks";
import { useAuth } from "@contexts/AuthContext";
import { useUI } from "@contexts/UIContext/UIContext";

import { ACTION_MODAL_TYPES, MODAL_TYPES } from "@types";

import Image from "@components/Image";

import {
   Icon_Setting,
   Icon_ShareSolid,
   Icon_EllipsisVertical,
   Icon_BlueTick,
   Icon_Following,
} from "@icons";

import styles from "@styles/pages/ProfilePage/ProfileHeader.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ProfileHeader({ user, isOwnProfile }) {
   const { followingList } = useAuth();
   const { dispatch: uiDispatch } = useUI();
   const toggleFollowUser = useFollow();

   const followedSet = useMemo(
      () => new Set(followingList?.map((user) => user?.id)),
      [followingList]
   );

   const displayUser = useMemo(() => user, [user, isOwnProfile]);
   const isFollowed = useMemo(
      () => !isOwnProfile && followedSet.has(user?.id),
      [followedSet, user, isOwnProfile]
   );

   const handleToggleFollow = useCallback(() => {
      toggleFollowUser(user, !isFollowed);
   }, [toggleFollowUser, isFollowed, user]);

   const handleEditProfile = useCallback(() => {
      console.log("edit profile");
      uiDispatch({
         type: ACTION_MODAL_TYPES.OPEN_MODAL,
         modalType: MODAL_TYPES.PROFILE_EDITOR,
         modalProps: {
            onClose: () => uiDispatch({ type: ACTION_MODAL_TYPES.CLOSE_MODAL }),
         },
      });
   }, []);

   // console.log("re-render");

   return (
      <div className={cx("wrapper")}>
         <div className={cx("avatar-section")}>
            <Image
               src={displayUser?.avatar}
               alt={`${displayUser?.username}'s avatar`}
               className={cx("avatar")}
            />
         </div>
         <div className={cx("info-section")}>
            <div className={cx("username-section")}>
               <span className={cx("nickname")}>
                  {displayUser?.nickname !== "undefined"
                     ? displayUser?.nickname
                     : " "}
                  {user?.tick && <Icon_BlueTick className={cx("tick")} />}
               </span>
               <span className={cx("username")}>
                  {displayUser?.first_name + " " + displayUser?.last_name}
               </span>
            </div>

            <div className={cx("actions")}>
               <button
                  onClick={
                     isOwnProfile ? handleEditProfile : handleToggleFollow
                  }
                  className={cx("edit", { following: isFollowed })}
               >
                  {isOwnProfile ? (
                     "Edit profile"
                  ) : !isFollowed ? (
                     "Follow"
                  ) : (
                     <>
                        <Icon_Following className={cx("icon")} />
                        Following
                     </>
                  )}
               </button>
               <button className={cx("promote")}>
                  {isOwnProfile ? "Promote post" : "Message"}
               </button>
               <button className={cx("setting")}>
                  {isOwnProfile ? <Icon_Setting /> : <Icon_ShareSolid />}
               </button>
               <button className={cx("share")}>
                  {isOwnProfile ? (
                     <Icon_ShareSolid />
                  ) : (
                     <Icon_EllipsisVertical style={{ rotate: "90deg" }} />
                  )}
               </button>
            </div>

            <div className={cx("stats")}>
               <span>
                  <strong>{displayUser?.followings_count || 0}</strong>{" "}
                  Following
               </span>
               <span>
                  <strong>{displayUser?.followers_count || 0}</strong> Followers
               </span>
               <span>
                  <strong>{displayUser?.likes_count || 0}</strong> Likes
               </span>
            </div>

            <div className={cx("bio")}>{displayUser?.bio || "No bio yet."}</div>
         </div>
      </div>
   );
}

export default ProfileHeader;
