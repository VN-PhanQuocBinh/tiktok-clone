import { useCallback, useEffect, useRef, useState } from "react";
import {
   Icon_CloudUpload,
   Icon_ArrowRepeat,
   Icon_BlueTick,
} from "../../../assets/Icons";

import styles from "../../../assets/styles/components/pages/Upload/UploadZone.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function UploadZone({ className, updateVideoFile }) {
   const [videoFile, setVideoFile] = useState(null);
   const [videoDetails, setVideoDetails] = useState({
      size: 0,
      name: "",
   });
   const [isUploaded, setIsUploaded] = useState(false);

   const DOM_inputFile = useRef(null);

   useEffect(() => {
      if (videoFile) {
         setIsUploaded(true);
         updateVideoFile(videoFile)

         const fileSize =
            Math.round((videoFile.size / (1024 * 1024)) * 100) / 100;
         setVideoDetails((prev) => ({
            ...prev,
            size: fileSize,
            name: videoFile.name,
         }));
      } else {
         updateVideoFile(null)
         setIsUploaded(false);
      }
   }, [videoFile]);

   const handleInputVideo = useCallback(() => {
      DOM_inputFile.current?.click();
   }, []);

   const handleInputChange = useCallback((e) => {
      const file = e.target.files[0];
      if (file) {
         setVideoFile(file);
      }
   }, []);

   const handleDragOver = useCallback((e) => {
      e.preventDefault();
   }, []);

   const handleDragLeave = useCallback((e) => {
      e.preventDefault();
   }, []);

   const handleDrop = useCallback((e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file?.type?.startsWith("video/")) {
         setVideoFile(file);
      }
   }, []);

   const handleReplace = useCallback(() => {
      setVideoFile(null);
      DOM_inputFile.current?.click();
   }, []);

   return (
      <div
         className={cx("wrapper", { [className]: className })}
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}
      >
         <input
            ref={DOM_inputFile}
            onChange={handleInputChange}
            type="file"
            accept="video/*"
            style={{ display: "none" }}
         />

         {!isUploaded && (
            <div className={cx("drag-area")} onClick={handleInputVideo}>
               <div className={cx("content")}>
                  <Icon_CloudUpload className={cx("icon")} />
                  <div>
                     <span>Select video to upload</span>
                     <span>Or drag and drop it here</span>
                  </div>
               </div>
            </div>
         )}

         {isUploaded && (
            <div className={cx("upload-info")}>
               <div className={cx("details")}>
                  <div className={cx("file-name")}>
                     <span>{videoDetails.name}</span>
                     <span>1080P</span>
                  </div>

                  <div className={cx("file-details")}>
                     <span className={cx("size")}>
                        {/* <Icon_CloudUpload className={cx("icon")} /> */}
                        <Icon_BlueTick className={cx("icon", "tick")} />
                        {isUploaded && `Uploaded (${videoDetails.size}MB)`}
                     </span>
                     {/* <span className={cx("duration")}>Duration: 0m25s</span> */}
                     {/* <span className={cx("time-left")}>3 seconds left</span> */}
                  </div>
               </div>

               <div className={cx("actions")}>
                  {/* <button onClick={handleDiscard}>Cancel</button> */}
                  <button onClick={handleReplace}>
                     <Icon_ArrowRepeat className={cx("icon")} />
                     Replace
                  </button>
                  {/* <span>26.04%</span> */}
               </div>
            </div>
         )}

         {isUploaded && <div className={cx("progress")}></div>}
      </div>
   );
}

export default UploadZone;
