import { useImperativeHandle, forwardRef, useRef } from "react"
import { createPortal } from "react-dom"
import classNames from "classnames/bind"
import style from "../../assets/styles/components/Tooltip.module.scss"

const cx = classNames.bind(style)

function TooltipContainer({ x, y, children }, ref) {
   const _ref = useRef(null)

   useImperativeHandle(ref, () => {
      const rect = _ref.current.getBoundingClientRect()

      return {
         x: rect.x,
         y: rect.y,
         width: rect.width
      }
   }, [])


   console.log("container re-render");
   
   return createPortal(
      <div 
         ref={_ref}
         style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            translate: `${x}px ${y}px`
         }}
         className={cx("tooltip")}
      >
         {children}
      </div>,
      document.body
   )
}

export default forwardRef(TooltipContainer)