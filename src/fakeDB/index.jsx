import {
   Icon_Earth,
   Icon_Question,
   Icon_HalfStroke,
   Icon_CreatorTool,
   Icon_Coin,
   Icon_Gear,
   Icon_User,
} from "../assets/Icons";

const searchItems = [
   { label: "You might like 1" },
   { label: "You might like 2" },
   { label: "You might like 3" },
   { label: "You might like 4" },
   { label: "You might like 5" },
   { label: "You might like 6" },
];

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
];

const userDefaultSugItems = [
   { userId: "user1111", caption: "cap1111" },
   { userId: "user1111", caption: "cap1111" },
   { userId: "user1111", caption: "cap1111" },
   { userId: "user1111", caption: "cap1111" },
   { userId: "user1111", caption: "cap1111" },
   { userId: "user1111", caption: "cap1111" },
   { userId: "user1111", caption: "cap1111" },
   { userId: "user1111", caption: "cap1111" },
   { userId: "user1111", caption: "cap1111" },
   { userId: "user1111", caption: "cap1111" },
];

const actionItems_languages = [
   { label: "English" },
   { label: "Tiếng Việt" },
   { label: "中文" },
   { label: "日本語" },
   { label: "한국어" },
   { label: "Español" },
   { label: "Français" },
   { label: "Deutsch" },
   { label: "Português" },
   { label: "Italiano" },
   { label: "Русский" },
   { label: "العربية" },
   { label: "हिन्दी" },
   { label: "বাঙালি" },
   { label: "اردو" },
   { label: "ລາວ" },
   { label: "ខ្មែរ" },
   { label: "မြန်မာ" },
   { label: "Filipino" },
   { label: "Indonesia" },
];

const actionItems_loggedOut = [
   {
      label: "Creator tools",
      icon: Icon_CreatorTool,
      to: "/creatortools",
   },
   {
      label: "English",
      icon: Icon_Earth,
      children: actionItems_languages,
   },
   {
      label: "Feedback and help",
      icon: Icon_Question,
      to: "/feedback",
   },
   {
      label: "Dark mode",
      icon: Icon_HalfStroke,
      children: [
         {
            label: "Use Device theme",
            children: [
               {
                  label: "label 1",
                  to: "/link",
               },
               {
                  label: "label 2",
               },
            ],
         },
         {
            label: "Dark mode",
         },
         {
            label: "Light mode",
         },
      ],
   },
];

const actionItems_loggedIn = [
   {
      label: "View profile",
      icon: Icon_User,
      to: "/profile",
   },
   {
      label: "Get coins",
      icon: Icon_Coin,
      to: "/getcoins",
   },
   {
      label: "Creator tools",
      icon: Icon_CreatorTool,
      to: "/creatortools",
   },
   {
      label: "Setting",
      icon: Icon_Gear,
      to: "/settings",
   },
   {
      label: "English",
      icon: Icon_Earth,
      children: actionItems_languages
   },
   {
      label: "Feedback and help",
      icon: Icon_Question,
      to: "/feedback",
   },
   {
      label: "Dark mode",
      icon: Icon_HalfStroke,
      children: [
         {
            label: "Use Device theme",
         },
         {
            label: "Dark mode",
         },
         {
            label: "Light mode",
         },
      ],
   },
];

export {
   searchItems,
   defaultSearchItems,
   userDefaultSugItems,
   actionItems_loggedOut,
   actionItems_loggedIn,
};
