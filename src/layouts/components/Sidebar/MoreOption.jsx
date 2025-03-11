import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

import DropDown from "../../../components/DropDown";
import DropDownItem from "../../../components/DropDownItem";

import { DROPDOWN_ITEM_TYPE as TYPE } from "../../../constants";

import { actionItems_loggedIn } from "../../../fakeDB";
import classNames from "classnames/bind";
import styles from "../../../assets/styles/components/MoreOption.module.scss";

const cx = classNames.bind(styles);

function MoreOption({ className }) {
   const { isLoggedIn, login, logout } = useAuth();
   const [currentMenu, setCurrentMenu] = useState(actionItems_loggedIn);

   return (
      <DropDown
         className={cx("wrapper", { [className]: className })}
         isVisible={true}
      >
         {currentMenu.map((item, key) => (
            <DropDownItem type={TYPE.NAV_MORE_ITEM} key={key} item={item} />
         ))}
      </DropDown>
   );
}

export default MoreOption;
