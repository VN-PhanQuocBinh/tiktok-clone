import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@contexts/AuthContext";
import { useUI } from "@contexts/UIContext/UIContext";

import { ACTION_MODAL_TYPES, MODAL_TYPES } from "@types";

import PhotoEditor from "./PhotoEditor";
import Image from "@components/Image";
import {
   Icon_PencilSolid,
   Icon_XMark,
   Icon_AngleLeft,
   Icon_Loading,
} from "@icons";

import { cropImage } from "@utils/cropImage";
import { getToken } from "@utils/token";
import { updateProfile } from "@services/authService/authService";

import styles from "@styles/components/uiContext/ui/ProfileEditor/ProfileEditor.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const MAX_BIO_LEN = 80;
const MAX_NAME_LEN = 20;
const MIN_NAME_LEN = 4;

function ProfileEditor({ onClose = () => {} }) {
   const { user, updateCurrentUser } = useAuth();
   const { dispatch: uiDispatch } = useUI();
   const [uploading, setUploading] = useState(false)

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
         if (key === "name" && formData[key].length < 4) check = false;
         if (formData[key] !== originalFormData.current?.[key]) check = false;
      });

      if (formData.name.length < MIN_NAME_LEN) check = true;

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
      const uploadData = new FormData();

      Object.keys(formData).forEach((key) => {
         const data = formData[key];

         if (key === "name") {
            uploadData.append("first_name", data.slice(0, MIN_NAME_LEN));
            uploadData.append("last_name", data.slice(MIN_NAME_LEN));
         } else {
            uploadData.append(key, data);
         }
      });

      try {
         setUploading(true)

         const token = getToken();
         const response = await updateProfile(token, uploadData);

         const handleCloseAlert = () => {
            setTimeout(() => {
               uiDispatch({
                  type: ACTION_MODAL_TYPES.CLOSE_MODAL,
                  modalType: MODAL_TYPES.ALERT,
               });
            }, 300); // delay 300ms to allow the animation to finish
         };

         if (response.success) {
            updateCurrentUser({
               ...Object.fromEntries(uploadData),
               avatar: URL.createObjectURL(formData.avatar),
            });

            uiDispatch({
               type: ACTION_MODAL_TYPES.CLOSE_MODAL,
               modalType: MODAL_TYPES.PROFILE_EDITOR,
            });

            uiDispatch({
               type: ACTION_MODAL_TYPES.OPEN_MODAL,
               modalType: MODAL_TYPES.ALERT,
               modalProps: {
                  message: "Edit profile successfully!",
                  openClassName: "slide-down",
                  closeClassName: "slide-up",
                  duration: 2000,
                  onClose: handleCloseAlert,
               },
            });
         } else {
            uiDispatch({
               type: ACTION_MODAL_TYPES.OPEN_MODAL,
               modalType: MODAL_TYPES.ALERT,
               modalProps: {
                  message: "Edit profile error!",
                  openClassName: "slide-down",
                  closeClassName: "slide-up",
                  duration: 5000,
                  onClose: handleCloseAlert,
               },
            });
         }

         setUploading(false)
      } catch (error) {
         setUploading(false)
         console.log("UPDATE PROFILE", error);
      }
   }, [formData, croppedImg]);

   const handleApply = useCallback(async () => {
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

   const handleBeforeInputName = useCallback((e) => {
      const currentValue = e.target.value;
      const newValueLen = currentValue.length + e.data.length;
      if (newValueLen > MAX_NAME_LEN) e.preventDefault();
   }, []);

   const handleBack = useCallback(() => {
      setShowPhotoEditor(false);
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
                  {showPhotoEditor && (
                     <button className={cx("back-btn")} onClick={handleBack}>
                        <Icon_AngleLeft className={cx("icon")} />
                     </button>
                  )}
                  <h2>{showPhotoEditor ? "Edit Photo" : "Edit Profile"}</h2>
                  <button className={cx("close-btn")} onClick={handleClose}>
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
                                 onInput={handleChangeForm}
                                 onBeforeInput={handleBeforeInputName}
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
                  <PhotoEditor
                     updateImageCrop={updateImageCrop}
                     className={cx("edit-photo")}
                     src={avatarPreview}
                  />
               )}

               <div className={cx("footer")}>
                  <button
                     onClick={showPhotoEditor ? handleBack : handleClose}
                     className={cx("cancel-btn")}
                  >
                     Cancel
                  </button>

                  <button
                     onClick={showPhotoEditor ? handleApply : handleSave}
                     className={cx("save-btn")}
                     disabled={!(showPhotoEditor || !isDiabledSubmit)}
                  >
                     {showPhotoEditor ? "Apply" : (uploading ? <Icon_Loading className={cx("icon")}/> :"Save")}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProfileEditor;
