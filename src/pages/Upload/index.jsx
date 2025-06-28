import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUI } from "@/contexts/UIContext/UIContext";

import UploadZone from "@components/pages/UploadPage/UploadZone";

import { MODAL_TYPES, ACTION_MODAL_TYPES } from "@/types";

import { postVideo } from "@services/videoService/videoService";
import { getToken } from "@utils/token";

import styles from "./Upload.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MAX_CAPTION_LENGTH = 4000;

function Upload() {
   const { isLoggedIn } = useAuth()
   const { dispatch: uiDispatch } = useUI()

   const [videoFormValue, setVideoFormValue] = useState({
      description: "",
      upload_file: null,
   });
   const DOM_captionEditor = useRef(null);

   useEffect(() => {
      if (!isLoggedIn) {
         uiDispatch({
            type: ACTION_MODAL_TYPES.OPEN_MODAL,
            modalType: MODAL_TYPES.AUTH_MODALS,
         })
      }
   }, [])

   const handleBeforeInput = useCallback(
      (e) => {
         const value = videoFormValue.description + e.data;
         if (value.length > MAX_CAPTION_LENGTH) {
            e.preventDefault();
         }
      },
      [videoFormValue]
   );

   const handleInput = useCallback((e) => {
      const value = e.target.textContent;
      setVideoFormValue((prev) => ({ ...prev, description: value }));
   }, []);

   const updateVideoFile = useCallback((videoFile) => {
      setVideoFormValue((prev) => ({ ...prev, upload_file: videoFile }));
   }, []);

   const handleUpload = useCallback( async () => {
      const videoFormData = new FormData()

      videoFormData.append("viewable", "public")
      Object.keys(videoFormValue).forEach(key => {
         console.log(key, videoFormValue[key]);
         
         videoFormData.append(key, videoFormValue[key])
      })

      const token = getToken()
      const response = await postVideo(token, videoFormData)

      console.log(response);
      
      
   }, [videoFormValue]);

   return (
      <div className={cx("container")}>
         <div className={cx("header")}></div>
         <div className={cx("content")}>
            <UploadZone
               updateVideoFile={updateVideoFile}
               className={cx("upload-zone")}
            />

            <div className={cx("details")}>
               <h4>Details</h4>
               <div className={cx("info-field")}>
                  <div className={cx("caption-container")}>
                     <div className={cx("caption-title")}>Description</div>
                     <div className={cx("caption-markup")}>
                        <div
                           ref={DOM_captionEditor}
                           onBeforeInput={handleBeforeInput}
                           onInput={handleInput}
                           contentEditable="true"
                           className={cx("caption-editor")}
                           spellCheck="false"
                        ></div>

                        <div className={cx("caption-toolbar")}>
                           <button>
                              <span>#</span>
                              Hashtags
                           </button>

                           <button>
                              <span>@</span>
                              Mention
                           </button>

                           <span className={cx("word-count")}>
                              {videoFormValue.description?.length || 0}/
                              {MAX_CAPTION_LENGTH}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className={cx("buttons")}>
               <button
                  onClick={handleUpload}
                  className={cx("post")}
                  disabled={!videoFormValue.upload_file || videoFormValue.description?.length <= 0}
               >
                  Post
               </button>
               {/* <button className={cx("discard")}>Discard</button> */}
            </div>
         </div>
      </div>
   );
}

export default Upload;
