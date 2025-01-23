import DropDown from './Dropdown'
import DropDownItem from './DropDownItem'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
   faMagnifyingGlass,
   faCircleXmark, 
   faCircleNotch 
} from "@fortawesome/free-solid-svg-icons"

import { searchItems, userDefaultSugItems } from '../fakeDB'
import { DROPDOWN_ITEM_TYPE as TYPE } from '../constants'

import styles from "../assets/styles/components/SearchComponent.module.scss"
import classNames from "classnames/bind"
import { useEffect, useMemo, useState } from 'react'

const cx = classNames.bind(styles)



export default function SearchComponent() {
   const [query, setQuery] = useState("")
   const [debounceQuery, setDebounceQuery] = useState(query)

   const [showSearchResults, setShowSearchResults] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {

      let timerId = setTimeout(() => {
         // if (query) 
         //    setIsLoading(true)
         
         setDebounceQuery(query)
      }, 500)

      return () => {
         clearTimeout(timerId)
         setIsLoading(false)
         // console.log("reset Effect");       
      }
   }, [query])

   useEffect(() => {
      // if (debounceQuery) 
      //    console.log("Searching for: ", debounceQuery);
   }, [debounceQuery])

   const handleChange = (e) => {
      setQuery(e.target.value)
   }

   const dropDownChildren = useMemo(() => (
      <>
         <p className={cx("title")}>
            You may like
         </p>

         {searchItems.map((item, index) => (
            <DropDownItem
               key={index}
               type={TYPE.DEFAULT}
               item={item}
               itemClick={(label) => console.log("click " + label)}
            />
         ))}

         <p className={cx("title")}>
            Accounts
         </p>

         {userDefaultSugItems.map((item, index) => (
            <DropDownItem
               key={index}
               type={TYPE.USER_SUGGEST}
               item={item}
               itemClick={(label) => console.log("click " + label)}
            />
         ))}

         <li className={cx("more-title")}>View all results for "{query}"</li>
      </>
   ), [debounceQuery])
   

   // console.log("Search Component re-render");
   return (
      <div className={cx("search-wrapper")}>
         <div className={cx("search-box")}>
            <input
               placeholder="Search"
               type="text"
               value={query}
               onChange={handleChange}
               onFocus={() => setShowSearchResults(true)}
               onBlur={() => setShowSearchResults(false)}
            />

            {isLoading && (
               <FontAwesomeIcon 
                  className={cx("loading-icon")}
                  icon={faCircleNotch} 
               />
            )}

            {(query && !isLoading) && (
               <FontAwesomeIcon 
                  className={cx("clear-icon")} 
                  icon={faCircleXmark} 
                  onClick={() => setQuery("")}
               /> 
            )}

            <button>
               <FontAwesomeIcon className={cx("search-btn")} icon={faMagnifyingGlass} />
            </button>
         </div>  

         <DropDown 
            isVisible={showSearchResults}
         >
            {dropDownChildren}
         </DropDown>
      </div>
   )  
}