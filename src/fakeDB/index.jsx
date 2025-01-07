import { 
   faEarthAmericas,
   faCircleQuestion,
   faCircleHalfStroke,
   faHome
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

const actionItems = [
   {label: "Creator tools", icon: faHome},
   {label: "English", icon: faEarthAmericas},
   {label: "Feedback and help", icon: faCircleQuestion},
   {label: "Dark mode", icon: faCircleHalfStroke}
]

export { 
   searchItems,
   defaultSearchItems,
   userDefaultSugItems,
   actionItems
}