import {
   useImperativeHandle,
   forwardRef,
   useRef,
   useState,
   useEffect,
} from "react";
import { useDebounce } from "../../../hooks";
import * as SearchServices from "../../../services/apiService/searchService";

import DropDownItem from "../../../components/DropDownItem";

import { DROPDOWN_ITEM_TYPE as TYPE } from "../../../constants";

import { Icon_XMark, Icon_Loading, Icon_Clear } from "../../../assets/Icons";

import styles from "../../../assets/styles/components/SidebarSearch.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SidebarSearch({ className, onClose }, ref) {
   const DOM_input = useRef(null);

   const [searchResults, setSearchResults] = useState([])
   const [query, setQuery] = useState("");
   const debounceQuery = useDebounce(query, 500);
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      if (debounceQuery) {
         const fetchAPI = async () => {
            setLoading(true)
            const result = await SearchServices.search(debounceQuery)
            setSearchResults(result)
            setLoading(false)
         }

         fetchAPI()
      } else {

      }
      
   }, [debounceQuery]);

   const handleChange = (e) => {
      let newValue = e.target.value

      if (!newValue.startsWith(" ")) {
         setQuery(newValue)
      }
   };

   useImperativeHandle(
      ref,
      () => {
         return {
            focus() {
               DOM_input?.current?.focus();
            },
         };
      },
      []
   );

   console.log("sidebarSearch re-render");

   return (
      <section className={cx("wrapper", { [className]: className })}>
         <div className={cx("header")}>
            <strong className={cx("title")}>Search</strong>

            <span onClick={onClose} className={cx("icon-wrapper")}>
               <Icon_XMark className={cx("icon")} />
            </span>
         </div>

         <div className={cx("input-field")}>
            <input
               value={query}
               onChange={handleChange}
               ref={DOM_input}
               placeholder="Search"
               type="text"
            />

            {loading && <Icon_Loading className={cx("icon", "loading")}/>}
            {(!loading && query) && <Icon_Clear className={cx("icon")}/>}
         </div>
         

         <div className={cx("results")}>
            {searchResults.length > 0 && <p>Accounts</p>}

            <ul>

               {searchResults.map(item => 
                  <DropDownItem
                     key={item.id}
                     item={item}
                     type={TYPE.USER_SUGGEST}
                     className={cx("search-item")}
                     smallSize
                  />
               )}

               {searchResults.length > 0 && (
                  <DropDownItem
                     item={{ label: `View all results for "${debounceQuery}"`}}
                     type={TYPE.DEFAULT}
                     className={cx("search-item")}
                  />  
               )}
            </ul>
         </div>
      </section>
   );
}

export default forwardRef(SidebarSearch);
