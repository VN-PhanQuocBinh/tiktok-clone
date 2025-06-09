import { useEffect, useRef, useState } from "react";
import Image from "../../../Image";

import styles from "../../../../assets/styles/components/Modals/ui/EditProfile/EditPhoto.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CIRCLE_DIAMETER = 360;
// 2 * radius

function EditPhoto({ className, src }) {
   const [position, setPosition] = useState({
      currentX: 0,
      currentY: 0,
      x: 0,
      y: 0,
   });
   const [client, setClient] = useState({ x: 0, y: 0 });
   const [dragging, setDragging] = useState(false);
   const DOM_img = useRef(null);
   const DOM_avtFrame = useRef(null);
   const maxPosition = useRef({ x: 0, y: 0 });

   useEffect(() => {
      const observer = new MutationObserver(() => {
         console.dir(DOM_img.current);
         console.dir(DOM_avtFrame.current);

         const { left: imgLeft, top: imgTop } =
            DOM_img.current?.getBoundingClientRect();

         const {
            left: avtFrameLeft,
            top: avtFrameTop,
            right: avtFrameRight,
            bottom: avtFrameBottom,
         } = DOM_avtFrame.current?.getBoundingClientRect();

         const circleRect = {
            left: (avtFrameRight + avtFrameLeft) / 2 - CIRCLE_DIAMETER / 2,
            top: (avtFrameBottom + avtFrameTop) / 2 - CIRCLE_DIAMETER / 2,
         };

         console.log(circleRect, imgLeft, imgTop);

         const dLeft = circleRect.left - imgLeft;
         const dTop = circleRect.top - imgTop;

         console.log(dLeft, dTop);
      });

      if (DOM_img.current) {
         observer.observe(DOM_img.current, {
            childList: true,
            subtree: true
         })
      }

      return () => observer.disconnect()
   }, []);

   const handlePointerMove = (e) => {
      if (!dragging) return;
      const dX = e.clientX - client.x;
      const dY = e.clientY - client.y;
      // console.log(dX, dY);

      setPosition((prev) => ({
         ...prev,
         currentX: prev.x + dX,
         currentY: prev.y + dY,
      }));
   };

   const handlePointerDown = (e) => {
      setClient({ x: e.clientX, y: e.clientY });
      setDragging(true);
      // console.log(`x: ${e.x}, y: ${e.y}`);
   };

   const handlePointerUp = (e) => {
      console.log("up");
      setPosition((prev) => ({ ...prev, x: prev.currentX, y: prev.currentY }));
      setDragging(false);
   };

   return (
      <div className={cx("wrapper") + " " + className}>
         <div ref={DOM_avtFrame} className={cx("avt-frame")}>
            <div className={cx("img-wrapper")}>
               <Image
                  ref={DOM_img}
                  style={{
                     translate: `${position.currentX}px ${position.currentY}px`,
                  }}
                  className={cx("img")}
                  src={src}
                  draggable="false"
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                  onPointerMove={handlePointerMove}
               />
            </div>
         </div>
      </div>
   );
}

export default EditPhoto;
