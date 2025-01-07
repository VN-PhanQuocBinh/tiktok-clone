import HeaderItem from './DropDownItem'

import { defaultSearchItems, userDefaultSugItems  } from '../fakeDB'

import styles from "../assets/styles/components/DropDown.module.scss"
import classNames from "classnames/bind"


// Component
let cx = classNames.bind(styles)

export default function DropDown({ isVisible, children }) {
   
   return (
      <ul className={cx("list")}>
         {children}
         <li className={cx("more-title")}>View all results for "{}"</li>
      </ul>
   )
}