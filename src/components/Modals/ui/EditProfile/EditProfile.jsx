import { useCallback, useRef, useState } from "react";

import EditPhoto from "./EditPhoto";
import Image from "../../../Image";
import { Icon_PencilSolid, Icon_XMark } from "../../../../assets/Icons";

import { cropImage } from "../../../../utils/cropImage";

import styles from "../../../../assets/styles/components/Modals/ui/EditProfile/EditProfile.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function EditProfile({ onClose = () => {} }) {
   const [avatarPreview, setAvatarPreview] = useState(null);
   const [croppedImg, setCroppedImg] = useState(null);
   const [formData, setFromData] = useState({
      username: "",
      name: "",
      bio: "",
   });

   const [showEditPhoto, setShowEditPhoto] = useState(false);
   const [animation, setAnimation] = useState(true);
   // true: opening, false: closing

   const imageCrop = useRef(null);

   const handleClose = useCallback(() => {
      setAnimation(false);
      const timer = setTimeout(() => {
         onClose();
      }, 200); //delay 200ms allow the animation to finish

      return () => clearTimeout(timer);
   }, [onClose]);

   const handleUploadFile = useCallback((e) => {
      console.dir(e.target.files[0]);
      const file = e.target.files[0];
      
      if (file) {
         const url = URL.createObjectURL(file);

         setAvatarPreview(url);
         setShowEditPhoto(true);
      }

      return () => URL.revokeObjectURL(url);
   }, []);

   const handleSave = useCallback(() => {
      console.log("save");
   }, []);

   const handleApply = useCallback(async () => {
      console.log("apply");
      try {
         const blob = await cropImage({
            imgSrc: avatarPreview,
            crop: imageCrop.current,
         });

         const croppedImg = URL.createObjectURL(blob);
         setCroppedImg(croppedImg);
      } catch (error) {
         console.log(error);
      }
   }, [avatarPreview]);

   const updateImageCrop = useCallback((crop) => {
      imageCrop.current = { ...crop };
      console.log(imageCrop.current);
   }, []);

   console.log("re-render");

   return (
      <div className={cx("wrapper")}>
         <div className={cx("black-bg") + " " + "test-img"}>
            {/* <img src={croppedImg} alt="" /> */}
            {/* Test image element */}

            <div
               className={
                  cx("modal") + ` ${animation ? "zoom-in" : "fade-out"}`
               }
            >
               <div className={cx("header")}>
                  <h2>Edit profile</h2>
                  <button onClick={handleClose}>
                     <Icon_XMark className={cx("icon")} />
                  </button>
               </div>

               {!showEditPhoto ? (
                  <form className={cx("inner")}>
                     <div className={cx("info-field", "profile-photo")}>
                        <span className={cx("title")}>Profile photo</span>
                        <div className={cx("content")}>
                           <div className={cx("input-field")}>
                              <Image className={cx("avt")} />

                              <span>
                                 <input
                                    onChange={handleUploadFile}
                                    tabIndex={-1}
                                    type="file"
                                    id="avt"
                                    accept="image/jpg, image/jpeg, image/png"
                                 />
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
                                 name="username"
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
                              <input
                                 id="name"
                                 name="name"
                                 type="text"
                                 autoComplete="true"
                              />
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
                                 name="bio"
                                 rows="3"
                                 autoComplete="true"
                              ></textarea>
                           </div>

                           <div className={cx("description")}>
                              <span>0/80</span>
                           </div>
                        </div>
                     </div>
                  </form>
               ) : (
                  <EditPhoto
                     updateImageCrop={updateImageCrop}
                     className={cx("edit-photo")}
                     src={avatarPreview}
                  />
               )}

               <div className={cx("footer")}>
                  <button onClick={handleClose} className={cx("cancel-btn")}>
                     Cancel
                  </button>

                  <button
                     onClick={avatarPreview ? handleApply : handleSave}
                     className={cx("save-btn", "active")}
                  >
                     {avatarPreview ? "Apply" : "Save"}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default EditProfile;
