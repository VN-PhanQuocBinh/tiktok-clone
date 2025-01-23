import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import TooltipContainer from "./TooltipContainer"

export default function Tooltip({ children, content }) {
   const [targetRect, setTargetRect] = useState(null)
   const [tooltipRect, setTooltipRect] = useState({x: 0, y: 0})
   const childRef = useRef(null)
   const tooltipRef = useRef(null)
   

   const onPointerEnter = () => {
      const rect = childRef.current
      setTargetRect(rect)
   }

   const onPointerLeave = () => {
      setTargetRect(null)
   }

   const cloneChild = React.cloneElement(children, {
      ref: childRef,
      onPointerEnter,
      onPointerLeave,
      style: {
         position: "relative"
      }
   })

   useLayoutEffect(() => {
      if (targetRect !== null) {
         console.log("targetRect differ from null");
         
         setTooltipRect({
            x: targetRect.x + (targetRect.width - tooltipRef.current.width)/2,
            y: targetRect.y + targetRect.height + 8 
         }) 
      }  
   }, [targetRect])

   
   console.log("tooltip re-render");
   return (
      <>
         {cloneChild}  
         {(targetRect !== null) && 
            <TooltipContainer
               ref={tooltipRef}
               x={tooltipRect.x}
               y={tooltipRect.y}
            >
               {content}
            </TooltipContainer>
         }
      </>
   )
}