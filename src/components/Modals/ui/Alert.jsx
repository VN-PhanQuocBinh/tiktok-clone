import classNames from "classnames/bind";
import styles from "@styles/components/Modals/ui/Alert.module.scss";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function Alert({ message, openClassName, closeClassName, duration, onClose }) {
   if (!message) return null

   const [animationClass, setAnimationClass] = useState(openClassName);

   useEffect(() => {
      const timer = setTimeout(() => {
         setAnimationClass(closeClassName) 
         onClose?.();
      }, duration || 0)

      return () => clearTimeout(timer)
   }, [])

   return (
      <div className={cx("alert") + " " + animationClass}>
         <span>{message}</span>
      </div>
   );
}

export default Alert;
