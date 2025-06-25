import DropDown from "@components/DropDown.jsx";
import DropDownItem from "@components/DropDownItem.jsx";

import { DROPDOWN_ITEM_TYPE as TYPE } from "@types";

import { Icon_ChevronRight } from "@icons";

import * as UserService from "@services/userService/userServices.jsx";

import classNames from "classnames/bind";
import styles from "@styles/components/UserSuggested.module.scss";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function UserSuggested() {
   const [userList, setUserList] = useState([]);
   const [prePage, setPrePage] = useState([])
   const [currentLen, setCurrentLen] = useState(5);

   useEffect(() => {
      const fetchAPI = async () => {
         let page = Math.ceil(currentLen / 20)
         let per_page = currentLen - (page - 1)*20

         const result = await UserService.getUserSuggested(
            page,
            per_page
         );

         if (per_page == 20) {
            setPrePage(pre => [...pre, ...result])
         }

         setUserList([...prePage, ...result])

      };

      fetchAPI();
   }, [currentLen]);

   const handleSeeMore = () => {
      setCurrentLen(currentLen + 5);
   };


   return (
      <section className={cx("wrapper")}>
         <h2>Following accounts</h2>

         <DropDown isVisible={true} className={cx("list")}>
            {userList?.map((item, index) => (
               <DropDownItem
                  key={index}
                  type={TYPE.USER_SUGGESTED}
                  item={item}
               />
            ))}
         </DropDown>

         <button onClick={handleSeeMore} className={cx("see-more")}>
            <Icon_ChevronRight className={cx("icon")} />
            <span>See more</span>
         </button>
      </section>
   );
}

export default UserSuggested;
