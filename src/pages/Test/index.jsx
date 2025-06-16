import Phone from "./Phone";

import styles from "./Test.module.scss";
import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";

const cx = classNames.bind(styles);

function Test() {
   const [showPhone, setShowPhone] = useState(false);
   const [zoomPhone, setZoomPhone] = useState(false);
   const [showContent, setShowContent] = useState({
      visible: false,
      frame_1: false,
      frame_2: false,
      frame_3: false,
   });

   useEffect(() => {
      const handleKeyDown = (e) => {
         console.log(e);

         switch (e.keyCode) {
            case 49:
            case 50:
            case 51:
               setShowContent((prev) => ({
                  ...prev,
                  ["frame_" + (e.keyCode - 48)]:
                     !prev["frame_" + (e.keyCode - 48)],
               }));
               break;
            case 65:
               setShowContent((prev) => ({ ...prev, visible: !prev.visible }));
               break;
            case 13:
               setShowPhone((prev) => !prev);
               break;
            case 32:
               setZoomPhone((prev) => !prev);
               break;
            default:
         }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => document.removeEventListener("keydown", handleKeyDown);
   }, []);

   const optionalContentClass = useMemo(() => {
      // let classObject = {}
      // Object.keys?.forEech(key => {
      //    classObject[key] = showContent[key]
      // })
      return {
         hide: showPhone,
         ...showContent,
      };
   }, [showContent, showPhone]);

   return (
      <div className={cx("container")}>
         {/* <div className={cx("circle-2", "circle")}/> */}

         {
            <>
               {showContent.frame_1 && <div className={cx("circle-1", "circle")} />}
               <div className={cx("content", optionalContentClass)}>
                  <h1>Liquid Glass Navbar</h1>
                  <div className={cx("sub-title")}>
                     <div className={cx("div1")}>UI/UX concept</div>
                     <div className={cx("div2")}> - </div>
                     <div className={cx("div3")}>Built using ReactJS</div>
                  </div>
               </div>
            </>
         }
         <Phone
            isZoom={zoomPhone}
            className={cx("phone", { hide: !showPhone, zoom: zoomPhone })}
         />
      </div>
   );
}

export default Test;
