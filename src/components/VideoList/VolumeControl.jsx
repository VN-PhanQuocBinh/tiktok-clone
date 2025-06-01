
import { useEffect, useRef, useState } from "react"
import { useVideo } from "../../contexts/VideoContext/VideoContext"

import styles from "../../assets/styles/components/VolumeControl.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)


function VolumeControl({className, onChangeVolume, ...props}) {
   const { state: videoState } = useVideo()

   const DOM_wrapper = useRef(null)
   const DOM_track = useRef(null)
   const DOM_thumb = useRef(null)
   const [leftThumb, setLeftThumb] = useState(0)

   useEffect(() => {
      const trackWidth = DOM_track.current?.offsetWidth
      const thumbWith = DOM_thumb.current?.offsetWidth
      setLeftThumb(videoState.volumeValue.current * (trackWidth - thumbWith))
   }, [videoState])

   useEffect(() => {
      const trackWidth = DOM_track.current?.offsetWidth
      const thumbWith = DOM_thumb.current?.offsetWidth
      // setLeftThumb(videoState.volumeValue.current * (trackWidth - thumbWith))

      const clearEvents = () => {
         // console.log("clear events");
         
         window.removeEventListener("pointermove", handlePointerMove)
         DOM_wrapper.current?.removeEventListener("pointerup", handlePointerUp)
      }

      const handlePointerMove = (e) => {
         if (!DOM_wrapper.current?.contains(e.target)) {
            clearEvents()
         } else {
            const rect = DOM_track.current?.getBoundingClientRect()
            let left = Math.min(Math.max(e.clientX - rect.left - thumbWith/2, 0), trackWidth - thumbWith)

            // console.log(left/(trackWidth - thumbWith));
            onChangeVolume(left/(trackWidth - thumbWith))
            setLeftThumb(left)
         }
      }

      const handlePointerUp = (e) => {
         // console.log("pointer up");
         
         clearEvents()
      }

      const handlePointerDown = (e) => {
         window.addEventListener("pointermove", handlePointerMove)
         DOM_wrapper.current?.addEventListener("pointerup", handlePointerUp)
      }

      DOM_thumb.current?.addEventListener("pointerdown", handlePointerDown)
      DOM_wrapper.current?.addEventListener("pointerdown", (e) => {
         e.preventDefault()
      })

      return () => {
         DOM_thumb.current?.removeEventListener("pointerdown", handlePointerDown)
         DOM_wrapper.current?.removeEventListener("poinerdown", () => {
            e.preventDefault()
         })
      }
   }, [])


   return (
      <div {...props} ref={DOM_wrapper} className={cx("wrapper") + " " + className}>
         <div ref={DOM_track} className={cx("slider-track")}>
            <div style={{width: `${leftThumb}px`}} className={cx("slider-fill")}/>
            <div ref={DOM_thumb} style={{left: `${leftThumb}px`}} className={cx("slider-thumb")}/>
         </div>
      </div>
      
   )
}

export default VolumeControl