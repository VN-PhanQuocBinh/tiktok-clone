import DropDown from './Dropdown'
import DropDownItem from './DropDownItem'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
   Icon_Loading, 
   Icon_Clear,
   Icon_Search 
} from './Icons'

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
      if (query !== '')
         setIsLoading(true)

      let timerId = setTimeout(() => {      
         setDebounceQuery(query)
         setIsLoading(false)
      }, 500)

      return () => {
         clearTimeout(timerId)      
      }
   }, [query])

   useEffect(() => {
      if (debounceQuery) 
         console.log("Searching for: ", debounceQuery);
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

            {isLoading && <Icon_Loading className={cx('loading-icon')}/>}

            {(query && !isLoading) && 
               <Icon_Clear 
                  className={cx('clear-icon')} 
                  onClick={() => setQuery("")}
               />
            }

            <button>
               <Icon_Search className={cx("search-btn")}/>
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