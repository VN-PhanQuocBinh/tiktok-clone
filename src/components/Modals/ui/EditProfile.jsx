import Image from "../../Image";
import { Icon_PencilSolid } from "../../../assets/Icons";

import styles from "../../../assets/styles/components/Modals/ui/EditProfile.module.scss";
import classNames from "classnames/bind";

import { Icon_XMark } from "../../../assets/Icons";
import { useCallback, useState } from "react";

const cx = classNames.bind(styles);

function EditProfile({ onClose = () => {} }) {
   const [animation, setAnimation] = useState(true);
   // true: opening, false: closing

   const handleClose = useCallback(() => {
      setAnimation(false)
      const timer = setTimeout(() => {
         onClose();
      }, 200) //delay 100ms allow the animation to finish
   }, [onClose]);

   return (
      <div className={cx("wrapper")}>
         <div className={cx("black-bg")}>
            <div
               className={cx("modal") + ` ${animation ? "zoom-in" : "fade-out"}`}
            >
               <div className={cx("header")}>
                  <h2>Edit profile</h2>
                  <button onClick={handleClose}>
                     <Icon_XMark className={cx("icon")} />
                  </button>
               </div>

               <div className={cx("inner")}>
                  <div className={cx("info-field", "profile-photo")}>
                     <span className={cx("title")}>Profile photo</span>
                     <div className={cx("content")}>
                        <div className={cx("input-field")}>
                           <Image className={cx("avt")} />

                           <span>
                              <input tabIndex={-1} type="file" id="avt" />
                              <Icon_PencilSolid className={cx("icon")} />
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className={cx("info-field", "username")}>
                     <span className={cx("title")}>Username</span>
                     <div className={cx("content")}>
                        <div className={cx("input-field")}>
                           <input
                              id="username"
                              type="text"
                              autoComplete="true"
                           />
                        </div>

                        <div className={cx("description")}>
                           <span>www.tiktok.com/@2604bp</span>

                           <span>
                              Usernames can only contain letters, numbers,
                              underscores and periods. Changing your username
                              will also change your profile link.
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className={cx("info-field", "name")}>
                     <span className={cx("title")}>Name</span>
                     <div className={cx("content")}>
                        <div className={cx("input-field")}>
                           <input id="name" type="text" autoComplete="true" />
                        </div>

                        <div className={cx("description")}>
                           <span>
                              Your nickname can only be changed once every 7
                              days.
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className={cx("info-field", "bio")}>
                     <span className={cx("title")}>Bio</span>
                     <div className={cx("content")}>
                        <div className={cx("input-field")}>
                           <textarea
                              id="bio"
                              rows="3"
                              autoComplete="true"
                           ></textarea>
                        </div>

                        <div className={cx("description")}>
                           <span>0/80</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className={cx("footer")}>
                  <button className={cx("cancel-btn")}>Cancel</button>
                  <button className={cx("save-btn")} disabled>
                     Save
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default EditProfile;
