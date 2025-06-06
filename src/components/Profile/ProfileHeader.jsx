import {
   useState,
   useEffect,
   useMemo,
   useCallback,
} from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useFollow } from "../../hooks";

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


const cx = classNames.bind(styles);

function ProfileHeader({ user, isOwnProfile }) {
   const {
      followingList
   } = useAuth();

   const toggleFollowUser = useFollow()

   const followedSet = useMemo(
      () => new Set(followingList?.map((user) => user?.id)),
      [followingList]
   );

   const [displayUser, setDisplayUser] = useState({});
   const isFollowed = useMemo(
      () => !isOwnProfile && followedSet.has(user?.id),
      [followedSet, user, isOwnProfile]
   );

   useEffect(() => {
      console.log(user);

      setDisplayUser(user);
   }, [user, isOwnProfile]);

   const handleToggleFollow = useCallback(() => {
      toggleFollowUser(user, !isFollowed);
   }, [toggleFollowUser, isFollowed, user]);

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
