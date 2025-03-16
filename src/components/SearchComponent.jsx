import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useDebounce } from "../hooks/";

import * as searchServices from "../services/apiService/searchService"

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
   const debounceQuery = useDebounce(query, 500)

   useEffect(() => {
      if (debounceQuery) {
         const fetchAPI = async () => {
            setIsLoading(true)

            const result = await searchServices.search(debounceQuery)
            await console.log(result);
            

            if (result.length > 0) {
               setSearchResults(result)
            } else {
               setSearchResults([])
            }

            setIsLoading(false)
         }

         fetchAPI()

      } else {
         setSearchResults([])
      }
   }, [debounceQuery]);


   useEffect(() => {
      if (searchResults?.length == 0) {
         setShowSearchResults(false)
      } else {
         setShowSearchResults(true)
      }
   }, [searchResults])

   // hide results when click clear button
   useEffect(() => {
      if (query == "")
         setShowSearchResults(false)
   }, [query])

   const handleChange = (e) => {
      let newValue = e.target.value

      if (!newValue.startsWith(" ")) {
         setQuery(newValue)
      }
      // newValue = newValue.trimStart()
   };

   const handleClickClear = () => {
      setQuery("")
      DOM_input.current.focus()
   }

   const preventFocus = useCallback((e) => {
      e.preventDefault()
   })

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
               type={TYPE.USER}
               item={item}
               itemClick={(label) => console.log("click " + label)}
            />
         ))}

         <li className={cx("more-title")}>View all results for "{query}"</li>
      </>
   ), [searchResults])

   // console.log("Search Component re-render");
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
               <Icon_Search className={cx("search-btn")} onMouseDown={preventFocus}/>
            </button>
         </div>

         <DropDown onBlur={() => setShowSearchResults(false)} isVisible={showSearchResults}>
            {dropDownChildren}
         </DropDown>
      </div>
   );
}
