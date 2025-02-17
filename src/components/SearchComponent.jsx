import { useEffect, useMemo, useState, useRef } from "react";
import { useDebounce } from "../hooks/";

import DropDown from "./Dropdown";
import DropDownItem from "./DropDownItem";

import { Icon_Loading, Icon_Clear, Icon_Search } from "../assets/Icons";
import { DROPDOWN_ITEM_TYPE as TYPE } from "../constants";

import styles from "../assets/styles/components/SearchComponent.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function SearchComponent() {
   const [query, setQuery] = useState("");

   const [searchResults, setSearchResults] = useState([])
   const [showSearchResults, setShowSearchResults] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const DOM_input = useRef(null)

   // useEffect(() => {
   //    let timerId = setTimeout(() => {
   //       setDebounceQuery(query.trim());
   //    }, 500);

   //    return () => {
   //       clearTimeout(timerId);
   //    };
   // }, [query]);

   const debounceQuery = useDebounce(query, 500)

   const fetchAPI = async (query) => {
      try {
         const API_query = `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(query)}&type=less`
         const response = await fetch(API_query)
         if (!response.ok) {
            throw Error("Network response was not ok!")
         }

         const responseData = await response.json()
         const data = responseData.data

         return data
      } catch (error) {
         console.log("Error fetching search result: ", error)
      }
   }

   useEffect(() => {
      if (debounceQuery) {
         // console.log("Searching for: ", debounceQuery);
         setIsLoading(true)

         fetchAPI(debounceQuery)
            .then(data => {
               // console.log(data);
               if (data.length > 0) {
                  setShowSearchResults(true)
                  setSearchResults(data)
               } else {
                  setSearchResults([])
               }
               
               setIsLoading(false)
            })
            .catch(error => {
               console.log(error);
            })
      } else {
         setSearchResults([])
      }
   }, [debounceQuery]);


   useEffect(() => {
      if (searchResults.length == 0) {
         setShowSearchResults(false)
      }
   }, [searchResults])

   const handleChange = (e) => {
      let newValue = e.target.value
      newValue = newValue.trimStart()
      setQuery(newValue);
   };

   const handleClickClear = () => {
      setQuery("")
      DOM_input.current.focus()
   }

   const handleFocusInput = () => {
      if (debounceQuery !== '') {
         setShowSearchResults(true)
      }
   }

   const dropDownChildren = useMemo(() => (
      <>
         {/* <p className={cx("title")}>
            You may like
         </p> */}

         <p className={cx("title")}>
            Accounts
         </p>

         {searchResults.map((item, index) => (
            <DropDownItem
               key={index}
               type={TYPE.USER_SUGGEST}
               item={item}
               itemClick={(label) => console.log("click " + label)}
            />
         ))}

         <li className={cx("more-title")}>View all results for "{query}"</li>
      </>
   ), [searchResults])

   console.log("Search Component re-render");
   return (
      <div className={cx("search-wrapper")}>
         <div className={cx("search-box")}>
            <input
               ref={DOM_input}
               placeholder="Search"
               type="text"
               value={query}
               onChange={handleChange}
               onFocus={handleFocusInput}
            />

            {isLoading && <Icon_Loading className={cx("loading-icon")} />}

            {query && !isLoading && (
               <Icon_Clear
                  className={cx("clear-icon")}
                  onClick={handleClickClear}
               />
            )}

            <button>
               <Icon_Search className={cx("search-btn")} />
            </button>
         </div>

         <DropDown onBlur={() => setShowSearchResults(false)} isVisible={showSearchResults}>
            {dropDownChildren}
         </DropDown>
      </div>
   );
}
