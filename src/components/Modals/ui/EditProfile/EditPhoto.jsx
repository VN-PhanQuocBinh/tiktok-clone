import { useEffect, useRef, useState } from "react";
import Image from "../../../Image";

import styles from "../../../../assets/styles/components/Modals/ui/EditProfile/EditPhoto.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function EditPhoto({ className, src }) {
   const [position, setPosition] = useState({ x: 0, y: 0 });
   const [client, setClient] = useState({ x: 0, y: 0 });
   const [dragging, setDragging] = useState(false)

   const handlePointerMove = (e) => {
      if (!dragging) return
      console.log(e.clientX - client.x, e.clientX - client.y);
   };

   const handlePointerDown = (e) => {
      setClient({ x: e.clientX, y: e.clientX });
      setDragging(true)
      // console.log(`x: ${e.x}, y: ${e.y}`);
   };

   const handlePointerUp = (e) => {
      console.log("up");
      setDragging(false)
   };

   return (
      <div className={cx("wrapper") + " " + className}>
         <div className={cx("avt-frame")}>
            <div className={cx("img-wrapper")}>
               <Image
                  styles={{
                     translate: `${position.x}px ${position.y}px`,
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
