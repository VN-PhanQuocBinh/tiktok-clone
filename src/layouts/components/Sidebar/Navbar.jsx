import { navList } from "../../../fakeDB"

import classNames from "classnames/bind"
import styles from "../../../assets/styles/components/Navbar.module.scss"
import Button from "../../../components/Button"

const cx = classNames.bind(styles)
console.log(navList);


function Navbar() {
   return (
      <nav>
         <ul>
            {navList.map((nav, index) => 
               <li key={index}>
                  <Button label={nav.label} to={nav.to} />
               </li>
            )}
         </ul>
      </nav>
   )
}

export default Navbar