import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Icon_Home, Icon_New, Icon_Radio, Icon_Library } from "./Icons";

import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const TAB_COUNT = 4;
const SIZE_DIFFERENCE = 2;

function Navbar({ className, collapsed = false, isZoom }) {
   // For tab indicator
   const zoomRatio = useMemo(() => {
      if (isZoom) return 2;
      return 1;
   }, [isZoom]);
   const [animations, setAnimations] = useState({
      glass: false,
      liquid: false,
      zoomIn: false,
   });
   const [tabIndicatorLeft, setTabIndicatorLeft] = useState({
      currentLeft: 0.009,
      left: 0.009,
   });
   const [dragging, setDragging] = useState(false);
   const justClicked = useRef(false);

   const offset = useRef({ x: 0, y: 0 });

   const DOM_tabIndicator = useRef(null);
   const tabIndicatorRect = useRef(null);

   const listRect = useRef(null);
   const DOM_list = useRef(null);

   const resolveIndicatorPosition = useCallback(() => {
      console.log("yes");

      setTabIndicatorLeft((prev) => {
         const { width: listWidth } = listRect.current;
         const tabWidth = (1 / TAB_COUNT) * listWidth;

         let newLeft = prev.currentLeft * listWidth;
         // console.log(newLeft);

         let nearestTabLeft = listWidth - tabWidth;

         for (let i = 0; i <= TAB_COUNT - 1; i++) {
            console.log(
               Math.abs(tabWidth * i - newLeft),
               Math.abs(nearestTabLeft - newLeft)
            );

            if (
               Math.abs(tabWidth * i - newLeft) <
               Math.abs(nearestTabLeft - newLeft)
            ) {
               nearestTabLeft = tabWidth * i;
            }
         }

         newLeft = (nearestTabLeft + SIZE_DIFFERENCE) / listWidth;
         console.log(newLeft);

         return {
            ...prev,
            currentLeft: newLeft,
            left: newLeft,
         };
      });
   }, [zoomRatio]);

   useEffect(() => {
      const timer = setTimeout(() => {
         console.log("update");
         
         listRect.current = DOM_list.current?.getBoundingClientRect();
         tabIndicatorRect.current =
            DOM_tabIndicator.current?.getBoundingClientRect();
      }, 1000);

      return () => clearTimeout(timer);
   }, [zoomRatio]);

   useEffect(() => {
      const handlePointerMove = (e) => {
         setTabIndicatorLeft((prev) => {
            const { x } = offset.current;
            const { width: listWidth } = listRect.current;
            const { width: tabIndicatorWidth } = tabIndicatorRect.current;

            let newCurrentLeft = Math.min(
               Math.max(
                  prev.left*listWidth + (e.clientX - x),
                  SIZE_DIFFERENCE
               ),
               listWidth - tabIndicatorWidth - SIZE_DIFFERENCE
            );

            console.log(
               newCurrentLeft,
               listWidth - tabIndicatorWidth - SIZE_DIFFERENCE
            );

            return {
               ...prev,
               currentLeft: newCurrentLeft / listWidth,
            };
         });
      };

      const handlePointerUp = () => {
         setAnimations((prev) => ({ ...prev, glass: false, zoomIn: false }));
         setDragging(false);
         resolveIndicatorPosition();
         justClicked.current = true;

         DOM_tabIndicator.current?.removeEventListener(
            "pointermove",
            handlePointerMove
         );
         document.removeEventListener("pointerup", handlePointerUp);
      };

      if (dragging) {
         document.addEventListener("pointermove", handlePointerMove);
         document.addEventListener("pointerup", handlePointerUp);
      }

      return () => {
         document.removeEventListener("pointermove", handlePointerMove);
         document.removeEventListener("pointerup", handlePointerUp);
      };
   }, [resolveIndicatorPosition, dragging, zoomRatio]);

   const handlePointerDown = (e) => {
      e.preventDefault();

      setDragging(true);
      setAnimations((prev) => ({ ...prev, glass: true, zoomIn: true }));

      offset.current = { x: e.clientX, y: e.clientY };
   };

   useEffect(() => {
      let timer = { glass: null, liquid: null };
      if (!dragging) {
         setAnimations((prev) => ({
            ...prev,
            glass: true,
            liquid: !justClicked.current,
         }));
         timer.liquid = setTimeout(() => {
            setAnimations((prev) => ({ ...prev, liquid: false }));
            justClicked.current = false;
         }, 500);

         timer.glass = setTimeout(
            () => {
               setAnimations((prev) => ({ ...prev, glass: false }));
               justClicked.current = false;
            },
            justClicked.current ? 0 : 300
         );
      }

      return () => clearTimeout(timer);
   }, [tabIndicatorLeft]);

   const handleChooseTab = useCallback(
      (e) => {
         console.log("choose");

         setTabIndicatorLeft((prev) => {
            const { width: listWidth } = listRect.current;
            const tabWidth = (1 / TAB_COUNT) * listWidth;

            console.log(e.pageX, listRect.current.left);
            
            let newLeft = e.pageX - listRect.current.left;

            let startingLeft = listWidth - tabWidth;

            while (startingLeft > newLeft) {
               console.log(startingLeft, newLeft);
               startingLeft -= tabWidth;
            }

            newLeft = startingLeft + SIZE_DIFFERENCE;
            // console.log(newLeft / listWidth);

            return {
               ...prev,
               currentLeft: newLeft / listWidth,
               left: newLeft / listWidth,
            };
         });
      },
      [zoomRatio]
   );

   return (
      <div
         className={cx("border", {
            [className]: className,
            collapsed: collapsed,
            moving: dragging || (animations.glass && animations.liquid),
            // "moving": dragging
         })}
      >
         <div className={cx("blur")}>
            <ul onClick={handleChooseTab} ref={DOM_list}>
               <li>
                  <Icon_Home className={cx("icon")} />
                  {!collapsed && <span>Home</span>}
               </li>

               <li className={cx({ hide: collapsed })}>
                  <Icon_New className={cx("icon")} />
                  <span>New</span>
               </li>
               <li className={cx({ hide: collapsed })}>
                  <Icon_Radio className={cx("icon")} />
                  <span>Radio</span>
               </li>
               <li className={cx({ hide: collapsed })}>
                  <Icon_Library className={cx("icon")} />
                  <span>Library</span>
               </li>

               <div
                  ref={DOM_tabIndicator}
                  className={cx("tab-indicator", {
                     glass: animations.glass,
                     liquid: animations.liquid,
                     "zoom-in": animations.zoomIn,
                     hide: collapsed,
                  })}
                  style={{ left: tabIndicatorLeft.currentLeft * 100 + "%" }}
                  onPointerDown={handlePointerDown}
               >
                  <div className={cx("indicator-border")}>
                     <div className={cx("indicator-blur")}></div>
                  </div>
               </div>
            </ul>
         </div>
      </div>
   );
}

export default Navbar;
