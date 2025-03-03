import { useImperativeHandle, forwardRef, useRef } from "react";

import DropDownItem from "../../../components/DropDownItem";

import { DROPDOWN_ITEM_TYPE as TYPE } from "../../../constants";

import { Icon_XMark } from "../../../assets/Icons";

import styles from "../../../assets/styles/components/SidebarSearch.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SidebarSearch({ className, onClose }, ref) {
   const DOM_input = useRef(null)

   useImperativeHandle(ref, () => {
      return {
         focus() {
            DOM_input?.current?.focus()
         }
      }
   }, [])

   console.log("sidebarSearch re-render");
   

   return (
      <section className={cx("wrapper", { [className]: className })}>
         <div className={cx("header")}>
            <strong className={cx("title")}>Search</strong>

            <span onClick={onClose} className={cx("icon-wrapper")}>
               <Icon_XMark className={cx("icon")} />
            </span>
         </div>

         <input ref={DOM_input} placeholder="Search" type="text" />

         <div className={cx("results")}>
            <p>You may like</p>

            <ul>
               <DropDownItem 
                  item={{label: "item 1"}}
                  type={TYPE.DEFAULT}
                  className={cx("search-item")} 
               />
               <DropDownItem 
                  item={{label: "item 2"}}
                  type={TYPE.DEFAULT}
                  className={cx("search-item")} 
               />
               <DropDownItem 
                  item={{label: "item 3"}}
                  type={TYPE.DEFAULT}
                  className={cx("search-item")} 
               />
               <DropDownItem 
                  item={{label: "item 4"}}
                  type={TYPE.DEFAULT}
                  className={cx("search-item")} 
               />
            </ul>
         </div>
      </section>
   );
}

export default forwardRef(SidebarSearch);
