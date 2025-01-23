import { 
   faCircleUser,
   faEllipsisVertical,
   faPlus,
   faMagnifyingGlass,
   faCircleXmark, 
   faCircleNotch 
} from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon_MessagePlane = ({ 
   width = '3.2rem', 
   height = '3.2rem' ,
   className
}) => {
   return (
      <svg
         fill="currentColor"
         className={className}
         viewBox="0 0 48 48"
         xmlns="http://www.w3.org/2000/svg"
         width={width}
         height={height}
      >
         <g clipPath="url(#Icon-Paperplane_svg__a)">
            <path d="M2.18 9.67A2 2 0 0 1 4 8.5h40a2 2 0 0 1 1.74 3l-20 35a2 2 0 0 1-3.65-.4l-5.87-18.6L2.49 11.82a2 2 0 0 1-.31-2.15Zm18.2 17.72 4.15 13.15L40.55 12.5H8.41l9.98 11.41 11.71-7.2a1 1 0 0 1 1.38.32l1.04 1.7a1 1 0 0 1-.32 1.38L20.38 27.4Z"></path>
         </g>
         <defs>
            <clipPath id="Icon-Paperplane_svg__a">
               <path d="M0 0h48v48H0z"></path>
            </clipPath>
         </defs>
      </svg>
   );
};

const Icon_Plus = ({ 
   className,

}) => {
   return (
      <FontAwesomeIcon 
         icon={faPlus}
         className={className}
      />
   )
}

const Icon_CircleUser = ({
   className
}) => {
   return (
      <FontAwesomeIcon 
         icon={faCircleUser}
         className={className}
      />
   )
}

const Icon_EllipsisVertical = ({
   className
}) => {
   return (
      <FontAwesomeIcon 
         icon={faEllipsisVertical}
         className={className}
      />
   )
}

const Icon_Loading = ({
   className
}) => {
   return (
      <FontAwesomeIcon
         icon={faCircleNotch}
         className={className}
      />
   )
}

const Icon_Clear = ({
   className,
   onClick
}) => {
   return (
      <FontAwesomeIcon
         icon={faCircleXmark}
         className={className}
         onClick={onClick}
      />
   )
}

const Icon_Search = ({
   className
}) => {
   return (
      <FontAwesomeIcon
         icon={faMagnifyingGlass}
         className={className}
      />
   )
}


export { 
   Icon_MessagePlane, 
   Icon_Plus, 
   Icon_CircleUser, 
   Icon_EllipsisVertical ,
   Icon_Loading,
   Icon_Clear,
   Icon_Search
}