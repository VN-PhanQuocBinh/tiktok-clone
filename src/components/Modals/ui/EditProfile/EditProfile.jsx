import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";

import EditPhoto from "./EditPhoto";
import Image from "../../../Image";
import { Icon_PencilSolid, Icon_XMark } from "../../../../assets/Icons";

import { cropImage } from "../../../../utils/cropImage";
import { getToken } from "../../../../utils/token";
import { updateProfile } from "../../../../services/authService/authService";

import styles from "../../../../assets/styles/components/Modals/ui/EditProfile/EditProfile.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const MAX_BIO_LEN = 80;

function EditProfile({ onClose = () => {} }) {
   const { user, updateCurrentUser } = useAuth();

   const [avatarPreview, setAvatarPreview] = useState(null);
   const [croppedImg, setCroppedImg] = useState(null);
   const [formData, setFromData] = useState({
      username: user?.nickname,
      name: user?.first_name + " " + user?.last_name,
      bio: user?.bio,
      avatar: null,
   });
   const originalFormData = useRef({
      username: user?.nickname,
      name: user?.first_name + " " + user?.last_name,
      bio: user?.bio,
   });

   const [showPhotoEditor, setShowPhotoEditor] = useState(false);
   const [animation, setAnimation] = useState(true);
   const [isDiabledSubmit, setIsDisabledSubmit] = useState(false);
   // true: opening, false: closing

   const imageCrop = useRef(null);

   useEffect(() => {
      let check = true;

      Object.keys(formData).forEach((key) => {
         if (formData[key] !== originalFormData.current?.[key]) check = false;
      });

      setIsDisabledSubmit(check);
   }, [formData]);

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
         setShowPhotoEditor(true);
      }

      return () => URL.revokeObjectURL(url);
   }, []);

   const handleSave = useCallback(async () => {
      console.log("save");
      const uploadData = new FormData();

      Object.keys(formData).forEach((key) => {
         const data = formData[key];

         if (key === "name") {
            uploadData.append("first_name", data);
         } else {
            uploadData.append(key, data);
         }
      });

      // last_name must includes at least 2 characters
      uploadData.append("last_name", "..");

      try {
         const token = getToken();
         const response = await updateProfile(token, uploadData);

         if (response.success) {
            updateCurrentUser({
               ...formData,
               avatar: URL.createObjectURL(formData.avatar),
            });
         }
      } catch (error) {
         console.log("UPDATE PROFILE", error);
      }
   }, [formData, croppedImg]);

   const handleApply = useCallback(async () => {
      console.log("apply");
      try {
         const blob = await cropImage({
            imgSrc: avatarPreview,
            crop: imageCrop.current,
         });

         URL.revokeObjectURL(croppedImg);
         setShowPhotoEditor(false);

         const newCroppedImg = URL.createObjectURL(blob);
         const file = new File([blob], "avatar.png", { type: "image/png" });
         setFromData((prev) => ({ ...prev, avatar: file }));

         setCroppedImg(newCroppedImg);
      } catch (error) {
         console.log(error);
      }
   }, [avatarPreview, croppedImg]);

   const updateImageCrop = useCallback((crop) => {
      imageCrop.current = { ...crop };
      console.log(imageCrop.current);
   }, []);

   const handleChangeForm = useCallback((e) => {
      const key = e.target.name;
      setFromData((prev) => ({
         ...prev,
         [key]: e.target.value,
      }));
   }, []);

   const handleBeforeInputBio = useCallback((e) => {
      const currentValue = e.target.value;
      const newValueLen = currentValue.length + e.data.length;
      if (newValueLen > MAX_BIO_LEN) e.preventDefault();
   }, []);

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

               {!showPhotoEditor ? (
                  <form className={cx("inner")}>
                     <div className={cx("info-field", "profile-photo")}>
                        <span className={cx("title")}>Profile photo</span>
                        <div className={cx("content")}>
                           <div className={cx("input-field")}>
                              <Image src={croppedImg} className={cx("avt")} />

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
                                 onChange={handleChangeForm}
                                 value={formData.username}
                                 id="username"
                                 name="username"
                                 type="text"
                                 autoComplete="true"
                                 spellCheck="false"
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
                                 onChange={handleChangeForm}
                                 value={formData.name}
                                 id="name"
                                 name="name"
                                 type="text"
                                 autoComplete="true"
                                 spellCheck="false"
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
                                 onInput={handleChangeForm}
                                 onBeforeInput={handleBeforeInputBio}
                                 value={formData.bio}
                                 id="bio"
                                 name="bio"
                                 rows="3"
                                 autoComplete="true"
                                 spellCheck="false"
                              ></textarea>
                           </div>

                           <div className={cx("description")}>
                              <span>
                                 {formData.bio.length}/{MAX_BIO_LEN}
                              </span>
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
                     onClick={showPhotoEditor ? handleApply : handleSave}
                     className={cx("save-btn")}
                     disabled={!(showPhotoEditor || !isDiabledSubmit)}
                  >
                     {showPhotoEditor ? "Apply" : "Save"}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default EditProfile;
