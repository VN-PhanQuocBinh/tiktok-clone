import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "../../../Image";
import InputRange from "../../../InputRange";

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
   const [zoom, setZoom] = useState(1);
   const [offset, setOffset] = useState({ x: 0, y: 0 });
   const [dragging, setDragging] = useState(false);
   const DOM_img = useRef(null);
   const DOM_avtFrame = useRef(null);
   const positionLimit = useRef({ maxX: 0, maxY: 0, minX: 0, minY: 0 });

   useEffect(() => {
      const handlePointerUp = (e) => {
         if (dragging) {
            console.log("up");

            setPosition((prev) => {
               const { maxX, maxY, minX, minY } = positionLimit.current;
               let newX = prev.currentX;
               let newY = prev.currentY;

               if (newX < minX) newX = minX;
               else if (newX > maxX) newX = maxX;

               if (newY < minY) newY = minY;
               else if (newY > maxY) newY = maxY;

               return {
                  ...prev,
                  currentX: newX,
                  currentY: newY,
                  x: newX,
                  y: newY,
               };
            });
            setDragging(false);
         }
      };

      document.addEventListener("pointerup", handlePointerUp);

      return () => document.removeEventListener("pointerup", handlePointerUp);
   }, [dragging]);

   const handleLoadImg = useCallback(() => {
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
         right: (avtFrameBottom + avtFrameRight) / 2 - CIRCLE_DIAMETER / 2,
         bottom: (avtFrameBottom + avtFrameBottom) / 2 - CIRCLE_DIAMETER / 2,
      };

      const dLeft = circleRect.left - imgLeft; // max of x, the negative is min of x
      const dTop = circleRect.top - imgTop; // max of y, the negative is min of y

      positionLimit.current = {
         maxX: Math.abs(dLeft),
         maxY: Math.abs(dTop),
         minX: -Math.abs(dLeft),
         minY: -Math.abs(dTop),
      };
   }, []);

   const handlePointerMove = useCallback(
      (e) => {
         if (!dragging) return;
         const dX = e.clientX - offset.x;
         const dY = e.clientY - offset.y;

         setPosition((prev) => ({
            ...prev,
            currentX: prev.x + dX,
            currentY: prev.y + dY,
         }));
      },
      [dragging, offset]
   );

   const handlePointerDown = (e) => {
      setOffset({ x: e.clientX, y: e.clientY });
      setDragging(true);
   };

   const handleZoom = useCallback((value) => {
      console.log(value);
      setZoom(1 + value / 100);
   }, []);

   const imageStyle = useMemo(
      () => ({
         transform: `translate(${position.currentX}px, ${position.currentY}px) scale(${zoom})`
         // translate: `${position.currentX}px ${position.currentY}px`,
         // scale: zoom,
      }),
      [position, zoom]
   );

   return (
      <div className={cx("wrapper") + " " + className}>
         <div ref={DOM_avtFrame} className={cx("avt-frame")}>
            {/* <div className={cx("img-wrapper")}> */}
            <Image
               ref={DOM_img}
               style={imageStyle}
               className={cx("img", { transition: !dragging })}
               src={src}
               draggable="false"
               onPointerDown={handlePointerDown}
               onPointerMove={handlePointerMove}
               onLoad={handleLoadImg}
            />
            {/* </div> */}
         </div>

         <div className={cx("zoom-control")}>
            <span>Zoom</span>
            <InputRange onChange={handleZoom} className={cx("range")} />
         </div>
      </div>
   );
}

export default EditPhoto;
