import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "../../../Image";
import InputRange from "../../../InputRange";

import styles from "../../../../assets/styles/components/Modals/ui/EditProfile/EditPhoto.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CIRCLE_DIAMETER = 360;
// 2 * radius

function EditPhoto({ className, src, handleSave }) {
   const [position, setPosition] = useState({
      currentX: 0,
      currentY: 0,
      x: 0,
      y: 0,
   });
   const [zoom, setZoom] = useState(1);
   const [offset, setOffset] = useState({ x: 0, y: 0 });
   const positionLimit = useRef({ maxX: 0, maxY: 0, minX: 0, minY: 0 });

   const [dragging, setDragging] = useState(false);
   const [circleMaskRatio, setCircleMaskRatio] = useState(0); // 0 <= x <= 1
   const [transition, setTransition] = useState(true);
   const isImgLoaded = useRef(false);

   const DOM_avtFrame = useRef(null);
   const DOM_img = useRef(null);

   useEffect(() => {
      const { width, height } = DOM_avtFrame.current?.getBoundingClientRect();
      const ratio =
         CIRCLE_DIAMETER / Math.sqrt(width * width + height * height);
      setCircleMaskRatio(ratio);
   }, []);

   const applyBoundedPosition = useCallback(() => {
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
   }, []);

   // Handle pointer up event
   useEffect(() => {
      const handlePointerUp = (e) => {
         if (dragging) {
            setDragging(false);
            setTransition(true);
            applyBoundedPosition()
         }
      };

      document.addEventListener("pointerup", handlePointerUp);

      return () => document.removeEventListener("pointerup", handlePointerUp);
   }, [dragging, applyBoundedPosition]);

   const handleUpdatePositionLimit = useCallback(function() {
      const {
         height: imgHeight,
         width: imgWidth,
      } = DOM_img.current?.getBoundingClientRect();

      const dLeft = (CIRCLE_DIAMETER - imgWidth) / 2; // max of x, the negative is min of x
      const dTop = (CIRCLE_DIAMETER - imgHeight) / 2; // max of y, the negative is min of y

      positionLimit.current = {
         maxX: Math.abs(dLeft),
         maxY: Math.abs(dTop),
         minX: -Math.abs(dLeft),
         minY: -Math.abs(dTop),
      };
   }, []);

   // handle when change zoom
   useEffect(() => {
      setTransition(false)
      handleUpdatePositionLimit()
      applyBoundedPosition()
   }, [zoom, handleUpdatePositionLimit])

   const handleLoadImg = useCallback(() => {
      isImgLoaded.current = true;
      handleUpdatePositionLimit();
   }, [handleUpdatePositionLimit]);

   const handlePointerMove = useCallback(
      (e) => {
         if (!dragging) return;
         const dX = e.clientX - offset.x;
         const dY = e.clientY - offset.y;

         setTransition(false)
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
      setTransition(false);
      setZoom(1 + value / 100);
   }, []);

   const handleScroll = useCallback((e) => {
      // setTransition(false)
      setZoom(prev => {
         const zoomSpeed = 0.1
         const type = -e.deltaY/Math.abs(e.deltaY)
         // up -> type = -1, down -> type = 1

         const tmpValue = prev + type*zoomSpeed
         const newValue = Math.min(Math.max(1, tmpValue), 2)
         
         return newValue
      })
   }, [])

   const imageStyle = useMemo(
      () => ({
         transform: `translate(${position.currentX}px, ${position.currentY}px) scale(${zoom})`,
      }),
      [position, zoom]
   );

   return (
      <div className={cx("wrapper") + " " + className}>
         <div
            ref={DOM_avtFrame}
            style={{
               maskImage: `radial-gradient(circle, black ${
                  circleMaskRatio * 100
               }%, rgba(0, 0, 0, 0.5) ${circleMaskRatio * 100}%`,
            }}
            className={cx("avt-frame")}
         >
            {/* <div className={cx("img-wrapper")}> */}
            <Image
               ref={DOM_img}
               style={imageStyle}
               className={cx("img", { transition: transition })}
               src={src}
               draggable="false"
               onPointerDown={handlePointerDown}
               onPointerMove={handlePointerMove}
               onWheel={handleScroll}
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
