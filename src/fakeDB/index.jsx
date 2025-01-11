import { icon } from "@fortawesome/fontawesome-svg-core"
import { 
   faEarthAmericas,
   faCircleQuestion,
   faCircleHalfStroke,
   faHome,
   faCoins,
   faGear,
   faUser
} from "@fortawesome/free-solid-svg-icons"


const searchItems = [
   { label: "You might like 1" },
   { label: "You might like 2" },
   { label: "You might like 3" },
   { label: "You might like 4" },
   { label: "You might like 5" },
   { label: "You might like 6" },
]

const defaultSearchItems = [
   { label: "You might like 1" },
   { label: "You might like 2" },
   { label: "You might like 3" },
   { label: "You might like 4" },
   { label: "You might like 5" },
   { label: "You might like 6" },
   { label: "You might like 6" },
   { label: "You might like 6" },
   { label: "You might like 6" },
   { label: "You might like 6" },
   { label: "You might like 6" },
   { label: "You might like 6" },
   { label: "You might like 6" },
]

const userDefaultSugItems = [
   {userId: "user1111", caption: "cap1111"},
   {userId: "user1111", caption: "cap1111"},
   {userId: "user1111", caption: "cap1111"},
   {userId: "user1111", caption: "cap1111"},
   {userId: "user1111", caption: "cap1111"},
   {userId: "user1111", caption: "cap1111"},
   {userId: "user1111", caption: "cap1111"},
   {userId: "user1111", caption: "cap1111"},
   {userId: "user1111", caption: "cap1111"},
   {userId: "user1111", caption: "cap1111"},
]

const actionItems_loggedOut = [
   {
      label: "Creator tools", 
      icon: faHome,
      to: "/creatortools"
   },
   {
      label: "English", 
      icon: faEarthAmericas,
      children: [
         {
            label: "English"
         },
         {
            label: "Tiếng Việt"
         }
      ]
   },
   {
      label: "Feedback and help", 
      icon: faCircleQuestion,
      to: "/feedback"
   },
   {
      label: "Dark mode", 
      icon: faCircleHalfStroke,
      children: [
         {
            label: "Use Device theme",
            children: [
               {
                  label: "label 1",
                  to: "/link"
               },
               {
                  label: "label 2"
               }
            ]
         },
         {
            label: "Dark mode"
         }, 
         {
            label: "Light mode"
         }
      ]
   }
]

const actionItems_loggedIn = [
   {
      label: "View profile",
      icon: faUser,
      to: "/profile"
   },
   {
      label: "Get coins",
      icon: faCoins,
      to: "/getcoins"
   }, 
   {
      label: "Creator tools", 
      icon: faHome,
      to: "/creatortools"
   },
   {
      label: "Setting", 
      icon: faGear,
      to: "/settings"
   },
   {
      label: "English", 
      icon: faEarthAmericas,
      children: [
         {
            label: "English"
         },
         {
            label: "Tiếng Việt"
         }
      ]
   },
   {
      label: "Feedback and help", 
      icon: faCircleQuestion,
      to: "/feedback"
   },
   {
      label: "Dark mode", 
      icon: faCircleHalfStroke,
      children: [
         {
            label: "Use Device theme",
         },
         {
            label: "Dark mode"
         }, 
         {
            label: "Light mode"
         }
      ]
   }

]

export { 
   searchItems,
   defaultSearchItems,
   userDefaultSugItems,
   actionItems_loggedOut,
   actionItems_loggedIn
}