import { useCallback, useEffect, useRef, useState } from "react";
import {
   Icon_CloudUpload,
   Icon_ArrowRepeat,
   Icon_BlueTick,
} from "../../../assets/Icons";

import styles from "../../../assets/styles/components/pages/Upload/UploadZone.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function UploadZone({ className }) {
   const [videoFile, setVideoFile] = useState(null);
   const [isDragging, setIsDragging] = useState(false);
   const [isUploaded, setIsUploaded] = useState(false);
   const [isUploading, setIsUploading] = useState(false)

   const DOM_inputFile = useRef(null);

   useEffect(() => {
      if (videoFile) {
         const fileSize = Math.round(videoFile.size / (1024*1024) * 100) / 100
         console.log(fileSize + "MB");
         
         setIsUploaded(true);
      }
   }, [videoFile]);

   const handleInputVideo = useCallback(() => {
      DOM_inputFile.current?.click();
   }, []);

   const handleInputChange = useCallback((e) => {
      const file = e.target.files[0]
      console.log(file);
      if (file) {
         setVideoFile(file)
      }

      const reader = new FileReader()
      reader.onload = () => {
         const arrayBuffer = reader.result
         const video = new Uint8Array(arrayBuffer)
         const mediaSource = new MediaSource(video)
         const videoUrl = URL.createObjectURL(mediaSource)
         console.log(videoUrl);
         
      }

      reader.readAsArrayBuffer(file)
   }, []);

   const handleDragOver = useCallback((e) => {
      e.preventDefault();
      setIsDragging(true);
   }, []);

   const handleDragLeave = useCallback((e) => {
      e.preventDefault();
      setIsDragging(false);
   }, []);

   const handleDrop = useCallback((e) => {
      e.preventDefault();
      console.log(e.dataTransfer.files);
      const file = e.dataTransfer.files[0];
      if (file?.type?.startsWith("video/")) {
         setVideoFile(file);
      }
   }, []);

   const handleDiscard = useCallback(() => {
      setIsUploaded(false);
      setVideoFile(null)
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
                     <span>OfficialVideo.mp4</span>
                     <span>1080P</span>
                  </div>

                  <div className={cx("file-details")}>
                     <span className={cx("size")}>
                        {/* <Icon_CloudUpload className={cx("icon")} /> */}
                        <Icon_BlueTick className={cx("icon", "tick")} />
                        7.5MB/12.7MB 
                        {isUploaded && "Uploaded (12.7MB)"}
                     </span>
                     <span className={cx("duration")}>Duration: 0m25s</span>
                     <span className={cx("time-left")}>3 seconds left</span>
                  </div>
               </div>

               <div className={cx("actions")}>
                  {/* <button onClick={handleDiscard}>Cancel</button> */}
                  <button onClick={handleDiscard}>
                     <Icon_ArrowRepeat className={cx("icon")} />
                     Replace
                  </button>
                  <span>26.04%</span>
               </div>
            </div>
         )}

         {isUploaded && <div className={cx("progress")}></div>}
      </div>
   );
}

export default UploadZone;
