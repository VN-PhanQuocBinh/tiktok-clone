import { useState, useEffect, useMemo, useLayoutEffect } from "react";
import { follow, unfollow } from "../../services/userService/followingService";
import { getToken } from "../../utils/token";

import Image from "../../components/Image";
import {
   Icon_Setting,
   Icon_ShareSolid,
   Icon_EllipsisVertical,
   Icon_BlueTick,
   Icon_Following,
} from "../../assets/Icons";

import styles from "../../assets/styles/components/Profile/ProfileHeader.module.scss";
import classNames from "classnames/bind";
import { useAuth } from "../../contexts/AuthContext";
const cx = classNames.bind(styles);

function ProfileHeader({ user, isOwnProfile }) {
   const { user: authUser, followingList, updateFollowingList } = useAuth();
   const followedSet = useMemo(
      () => new Set(followingList?.map((user) => user?.id)),
      [followingList]
   );
   const [displayUser, setDisplayUser] = useState({});
   const [isFollowed, setIsFollowed] = useState(false);

   useEffect(() => {
      console.log(user);

      setDisplayUser(user);
   }, [user, isOwnProfile]);

   useLayoutEffect(() => {
      if (user.id) {
         const checkFollowStatus = async () => {
            // if (user.id !== authUser?.id) {
            if (!isOwnProfile) {
               const _isFollowed = followedSet.has(user?.id);

               setIsFollowed(_isFollowed);
            } else {
               setIsFollowed(false);
            }
         };

         checkFollowStatus();
      }
   }, [user, isOwnProfile, followedSet]);

   const handleToggleFollow = () => {
      const handleFollow = async () => {
         if (!isOwnProfile) {
            const token = getToken();
            const userId = user?.id;
            const prevFollowed = isFollowed;

            setIsFollowed(!prevFollowed);
            const response = await (prevFollowed
               ? unfollow(token, userId)
               : follow(token, userId));
            
            if (response.success) {
               updateFollowingList(user, !prevFollowed)
            } else {
               setIsFollowed(prevFollowed)
            }
         }
      };

      handleFollow();
   };

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
                  onClick={handleToggleFollow}
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
