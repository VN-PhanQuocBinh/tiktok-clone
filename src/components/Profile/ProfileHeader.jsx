import { useState, useEffect, useLayoutEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

import Image from "../../components/Image";
import {
   Icon_Setting,
   Icon_ShareSolid,
   Icon_EllipsisVertical,
   Icon_BlueTick,
} from "../../assets/Icons";

import styles from "../../assets/styles/components/Profile/ProfileHeader.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function ProfileHeader({ user, isOwnProfile }) {
   const [displayUser, setDisplayUser] = useState({});

   useEffect(() => {
      // console.log(user);

      setDisplayUser(user);
   }, [user]);

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
               <button className={cx("edit")}>
                  {isOwnProfile ? "Edit profile" : "Follow"}
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
