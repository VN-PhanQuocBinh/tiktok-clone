import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@contexts/AuthContext";
import { useUI } from "@contexts/UIContext/UIContext";

import DropDown from "@components/DropDown";
import DropDownItem from "@components/DropDownItem";

import {
   DROPDOWN_ITEM_TYPE as TYPE,
   ACTION_MODAL_TYPES,
   MODAL_TYPES,
} from "../../../constants";
import { Icon_XMark, Icon_ChevronRight } from "@icons";

import { actionItems_loggedIn, actionItems_loggedOut } from "../../../fakeDB";
import classNames from "classnames/bind";
import styles from "@styles/components/MoreOption.module.scss";

const cx = classNames.bind(styles);

function MoreOption({ className, onClose }) {
   const { isLoggedIn } = useAuth();
   const { dispatch: uiDispatch } = useUI()

   const [currentMenu, setCurrentMenu] = useState({
      title: "More",
      list: actionItems_loggedIn,
   });
   const [history, setHistory] = useState([]);

   useEffect(() => {
      setCurrentMenu({
         title: "More",
         list: isLoggedIn ? actionItems_loggedIn : actionItems_loggedOut,
      });
   }, [isLoggedIn]);

   const handleClick = useCallback(
      (item) => {
         console.log(item);
         switch (item.label) {
            case "Log out":
               uiDispatch({
                  type: ACTION_MODAL_TYPES.OPEN_MODAL,
                  modalType: MODAL_TYPES.CONFIRM_LOGOUT
               });
               break;
            default:
               if (item.children) {
                  setHistory((pre) => [...pre, currentMenu]);
                  setCurrentMenu({ title: item.label, list: item.children });
               }
         }
      },
      [currentMenu]
   );

   const handleBack = () => {
      console.log("history: ", history);
      setCurrentMenu(history[history.length - 1]);
      setHistory(history.splice(0, history.length - 1));
   };

   return (
      <div className={cx("wrapper", { [className]: className })}>
         <div className={cx("header", { "back-header": history.length >= 1 })}>
            <span
               onClick={handleBack}
               className={cx("icon-wrapper", "icon-back")}
            >
               <Icon_ChevronRight className={cx("icon")} />
            </span>

            <strong className={cx("title")}>{currentMenu.title}</strong>

            {history.length == 0 && (
               <span onClick={onClose} className={cx("icon-wrapper")}>
                  <Icon_XMark className={cx("icon")} />
               </span>
            )}
         </div>

         <DropDown className={cx("list")} isVisible={true}>
            {currentMenu?.list?.map((item, key) => (
               <DropDownItem
                  type={TYPE.NAV_MORE_ITEM}
                  key={key}
                  item={item}
                  itemClick={() => handleClick(item)}
               />
            ))}
         </DropDown>
      </div>
   );
}

export default MoreOption;
