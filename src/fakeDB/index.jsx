import { icon } from "@fortawesome/fontawesome-svg-core";
import {
   Icon_Earth,
   Icon_Question,
   Icon_HalfStroke,
   Icon_CreatorTool,
   Icon_Coin,
   Icon_Gear,
   Icon_User,
} from "../assets/Icons";

import {
   Icon_HomeRegular,
   Icon_HomeSolid,
   Icon_CompassSolid,
   Icon_CompassRegular,
   Icon_UserArrowSolid,
   Icon_UserArrowRegular,
   Icon_UserGroupSolid,
   Icon_UserGroupRegular,
   Icon_PlusSolid,
   Icon_MessageSolid,
   Icon_MessageRegular,
   Icon_PlaneSolid
} from "../assets/Icons"

import {
   Icon_QRcode,
   Icon_Facebook,
   Icon_Google,
   Icon_LINE,
   Icon_KakaoTalk,
   Icon_Apple,
} from "../assets/Icons"



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
      children: [
         {
            label: "LIVE shopping"
         }, 
         {
            label: "Promote post"
         },
         {
            label: "View Analytics"
         },
         {
            label: "LIVE Creator Hub"
         },
         {
            label: "LIVE Studio"
         }
      ]
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
   {
      label: "English",
      icon: Icon_Earth,
      children: actionItems_languages
   },
   {
      label: "Setting",
      icon: Icon_Gear,
      to: "/settings",
   },
   {
      label: "Feedback and help",
      icon: Icon_Question,
      to: "/feedback",
   },
   {
      label: "Log out",
      icon: Icon_Question,
      // to: "/",
   },
];

const navListData = [
   {
      label: "For you",
      icon: Icon_HomeRegular,
      activeIcon: Icon_HomeSolid, 
      to: "/"
   },
   {
      label: "Explore",
      icon: Icon_CompassSolid,
      activeIcon: Icon_CompassRegular,
      to: "/explore"
   },
   {
      label: "Following",
      icon: Icon_UserArrowSolid,
      activeIcon: Icon_UserArrowRegular,
      to: "/following"
   },
   {
      label: "Friends",
      icon: Icon_UserGroupSolid,
      activeIcon: Icon_UserGroupRegular,
      to: "/friends",
      loggedIn: true
   },
   {
      label: "Upload",
      icon: Icon_PlusSolid,
      activeIcon: null,
      to: "/upload"
   },
   {
      label: "Activity",
      icon: Icon_MessageSolid,
      activeIcon: Icon_MessageRegular,
      to: "/activity",
      loggedIn: true
   },
   {
      label: "Messages",
      icon: Icon_PlaneSolid,
      activeIcon: null,
      to: "/messages",
      loggedIn: true
   },
]

const loginMethods = [
   {
      label: "Use QR code",
      icon: Icon_QRcode,
      type: "qr"
   },
   {
      label: "Use phone / email / username",
      icon: Icon_User,
      type: "phone_email_name"
   },
   {
      label: "Continue with Facebook",
      icon: Icon_Facebook,
      type: "fb"
   },
   {
      label: "Continue with Google",
      icon: Icon_Google,
      type: "fb"
   },
   {
      label: "Continue with LINE",
      icon: Icon_LINE,
      type: "line"
   },
   {
      label: "Continue with KakaoTalk",
      icon: Icon_KakaoTalk,
      type: "kt"
   },
   {
      label: "Continue with Apple",
      icon: Icon_Apple,
      type: "ap"
   },
]

const signupMethods = [
   {
      label: "Use phone or email",
      icon: Icon_User,
      type: "phone_email"
   },
   {
      label: "Continue with Facebook",
      icon: Icon_Facebook,
      type: "fb"
   },
   {
      label: "Continue with Google",
      icon: Icon_Google,
      type: "gg"
   },
   {
      label: "Continue with LINE",
      icon: Icon_LINE,
      type: "line"
   },
   {
      label: "Continue with KakaoTalk",
      icon: Icon_KakaoTalk,
      type: "kt"
   }
]


export {
   searchItems,
   defaultSearchItems,
   userDefaultSugItems,
   actionItems_loggedOut,
   actionItems_loggedIn,
   navListData,
   loginMethods,
   signupMethods
};


