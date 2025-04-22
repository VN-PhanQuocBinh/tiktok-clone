import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon_Volume = (props) => {
   return (
      <svg
         {...props}
         width="24"
         height="24"
         viewBox="0 0 48 48"
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.3359 8.37236C22.3296 7.04325 25 8.47242 25 10.8685V37.1315C25 39.5276 22.3296 40.9567 20.3359 39.6276L10.3944 33H6C4.34314 33 3 31.6568 3 30V18C3 16.3431 4.34315 15 6 15H10.3944L20.3359 8.37236ZM21 12.737L12.1094 18.6641C11.7809 18.8831 11.3948 19 11 19H7V29H11C11.3948 29 11.7809 29.1169 12.1094 29.3359L21 35.263V12.737ZM32.9998 24C32.9998 21.5583 32.0293 19.3445 30.4479 17.7211C30.0625 17.3255 29.9964 16.6989 30.3472 16.2724L31.6177 14.7277C31.9685 14.3011 32.6017 14.2371 33.0001 14.6195C35.4628 16.9832 36.9998 20.3128 36.9998 24C36.9998 27.6872 35.4628 31.0168 33.0001 33.3805C32.6017 33.7629 31.9685 33.6989 31.6177 33.2724L30.3472 31.7277C29.9964 31.3011 30.0625 30.6745 30.4479 30.2789C32.0293 28.6556 32.9998 26.4418 32.9998 24ZM37.0144 11.05C36.6563 11.4705 36.7094 12.0995 37.1069 12.4829C40.1263 15.3951 42.0002 19.4778 42.0002 23.9999C42.0002 28.522 40.1263 32.6047 37.1069 35.5169C36.7094 35.9003 36.6563 36.5293 37.0144 36.9498L38.3109 38.4727C38.6689 38.8932 39.302 38.9456 39.7041 38.5671C43.5774 34.9219 46.0002 29.7429 46.0002 23.9999C46.0002 18.2569 43.5774 13.078 39.7041 9.43271C39.302 9.05421 38.6689 9.10664 38.3109 9.52716L37.0144 11.05Z"
         ></path>
      </svg>
   );
};

const Icon_VolumeXmark = (props) => {
   return (
      <svg
         {...props}
         width="24"
         height="24"
         viewBox="0 0 48 48"
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25 10.8685C25 8.47242 22.3296 7.04325 20.3359 8.37236L10.3944 15H6C4.34315 15 3 16.3431 3 18V30C3 31.6568 4.34314 33 6 33H10.3944L20.3359 39.6276C22.3296 40.9567 25 39.5276 25 37.1315V10.8685ZM29.2929 18.1213L35.1716 24L29.2929 29.8787C28.9024 30.2692 28.9024 30.9024 29.2929 31.2929L30.7071 32.7071C31.0976 33.0976 31.7308 33.0976 32.1213 32.7071L38 26.8284L43.8787 32.7071C44.2692 33.0976 44.9024 33.0976 45.2929 32.7071L46.7071 31.2929C47.0976 30.9024 47.0976 30.2692 46.7071 29.8787L40.8284 24L46.7071 18.1213C47.0976 17.7308 47.0976 17.0976 46.7071 16.7071L45.2929 15.2929C44.9024 14.9024 44.2692 14.9024 43.8787 15.2929L38 21.1716L32.1213 15.2929C31.7308 14.9024 31.0976 14.9024 30.7071 15.2929L29.2929 16.7071C28.9024 17.0976 28.9024 17.7308 29.2929 18.1213Z"
         ></path>
      </svg>
   );
};

const Icon_Play = (props) => {
   return <FontAwesomeIcon {...props} icon={faPlay} />;
};

const Icon_Pause = (props) => {
   return <FontAwesomeIcon {...props} icon={faPause} />;
};

const Icon_Heart = (props) => {
   return (
      <svg
         {...props}
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg"
      >
         <g clipPath="url(#HeartFill_clip0)">
            <g filter="url(#HeartFill_filter0_d)">
               <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.5 2.25C10.5 2.25 12 4.25 12 4.25C12 4.25 13.5 2.25 16.5 2.25C20 2.25 22.5 4.99999 22.5 8.5C22.5 12.5 19.2311 16.0657 16.25 18.75C14.4095 20.4072 13 21.5 12 21.5C11 21.5 9.55051 20.3989 7.75 18.75C4.81949 16.0662 1.5 12.5 1.5 8.5C1.5 4.99999 4 2.25 7.5 2.25Z"
               ></path>
            </g>
            <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M2.40179 12.1998C3.58902 14.6966 5.7592 16.9269 7.74989 18.75C9.5504 20.3989 10.9999 21.5 11.9999 21.5C12.9999 21.5 14.4094 20.4072 16.2499 18.75C19.231 16.0657 22.4999 12.5 22.4999 8.49997C22.4999 8.41258 22.4983 8.32566 22.4952 8.23923C20.5671 13.6619 13.6787 18.5 11.75 18.5C10.3127 18.5 5.61087 15.8131 2.40179 12.1998Z"
               fillOpacity="0.03"
            ></path>
         </g>
         <defs>
            <filter
               id="HeartFill_filter0_d"
               x="-0.9"
               y="1.05"
               width="25.8"
               height="24.05"
               filterUnits="userSpaceOnUse"
               colorInterpolationFilters="sRGB"
            >
               <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
               <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
               ></feColorMatrix>
               <feOffset dy="1.2"></feOffset>
               <feGaussianBlur stdDeviation="1.2"></feGaussianBlur>
               <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
               ></feColorMatrix>
               <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
               ></feBlend>
               <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
               ></feBlend>
            </filter>
            <clipPath id="HeartFill_clip0">
               <rect width="24" height="24" fill="white"></rect>
            </clipPath>
         </defs>
      </svg>
   );
};

const Icon_Comment = (props) => {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         fill="currentColor"
         viewBox="0 0 48 48"
      >
         <path
            fillRule="evenodd"
            d="M2 21.5c0-10.22 9.88-18 22-18s22 7.78 22 18c0 5.63-3.19 10.74-7.32 14.8a43.6 43.6 0 0 1-14.14 9.1A1.5 1.5 0 0 1 22.5 44v-5.04C11.13 38.4 2 31.34 2 21.5M14 25a3 3 0 1 0 0-6 3 3 0 0 0 0 6m10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6m13-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
            clipRule="evenodd"
         ></path>
      </svg>
   );
};

const Icon_Flag = (props) => {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         fill="currentColor"
      >
         <path
            fill="currentColor"
            d="M4 4.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15.13a1 1 0 0 1-1.555.831l-6.167-4.12a.5.5 0 0 0-.556 0l-6.167 4.12A1 1 0 0 1 4 19.63z"
         ></path>
         <path
            fill="currentColor"
            fillOpacity=".03"
            d="M4.032 4.144Q4 4.317 4 4.5v15.13a1 1 0 0 0 1.555.831l6.167-4.12a.5.5 0 0 1 .41-.066l-.427-.198a1.49 1.49 0 0 0-1.377.063c-.581.339-1.45.85-2.25 1.339-.59.359-1.427.695-2.187.962-.929.325-1.86-.387-1.86-1.37zm8.251 12.202 6.162 4.115A1 1 0 0 0 20 19.63V4.5a2 2 0 0 0-1.123-1.798c.21.254.334.58.33.936a117 117 0 0 1-.896 13.408c-.124.99-1.17 1.553-2.076 1.133z"
         ></path>
      </svg>
   );
};

const Icon_Share = (props) => {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         fill="currentColor"
      >
         <path
            fill="currentColor"
            fillRule="evenodd"
            d="M10.938 3.175a.674.674 0 0 1 1.138-.488l6.526 6.215c.574.547.554 1.47-.043 1.991l-6.505 5.676a.674.674 0 0 1-1.116-.508V13.49s-6.985-1.258-9.225 2.854c-.209.384-1.023.518-.857-1.395.692-3.52 2.106-9.017 10.082-9.017z"
            clipRule="evenodd"
         ></path>
         <path
            fill="#161823"
            fillRule="evenodd"
            d="m15.754 6.212 1.295 2.59a1.12 1.12 0 0 1-.268 1.349l-5.799 5.042s-.28 1.403.562 1.403 7.578-6.174 7.578-6.174.28-.842-.561-1.684c-.843-.842-2.807-2.526-2.807-2.526"
            clipRule="evenodd"
            opacity=".03"
         ></path>
         <path
            fill="url(#pc-share-078b3fae_a)"
            fillRule="evenodd"
            d="M10.937 6.23v7.297s-6.683-.942-8.777 2.246C.146 18.839.331 12.309 3.363 9.057s7.574-2.827 7.574-2.827"
            clipRule="evenodd"
            opacity=".09"
         ></path>
         <defs>
            <radialGradient
               id="pc-share-078b3fae_a"
               cx="0"
               cy="0"
               r="1"
               gradientTransform="rotate(-113.046 11.628 5.43)scale(8.93256 8.78076)"
               gradientUnits="userSpaceOnUse"
            >
               <stop></stop>
               <stop offset=".995" stopOpacity=".01"></stop>
               <stop offset="1" stopOpacity=".01"></stop>
            </radialGradient>
         </defs>
      </svg>
   );
};

const Icon_Check = (props) => {
   return (
      <svg
         {...props}
         fill="currentColor"
         viewBox="0 0 48 48"
         xmlns="http://www.w3.org/2000/svg"
         width="1em"
         height="1em"
      >
         <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M43 6.08c.7.45 1.06.67 1.25.98.16.27.23.59.2.9-.03.36-.26.72-.7 1.43L23.06 42.14a3.5 3.5 0 0 1-5.63.39L4.89 27.62c-.54-.64-.81-.96-.9-1.32a1.5 1.5 0 0 1 .09-.92c.14-.33.46-.6 1.1-1.14l1.69-1.42c.64-.54.96-.81 1.31-.9.3-.06.63-.04.92.09.34.14.6.46 1.15 1.1l9.46 11.25 18.11-28.7c.45-.72.68-1.07.99-1.26.27-.16.59-.23.9-.2.36.03.71.25 1.43.7L43 6.08Z"
         ></path>
      </svg>
   );
};

export {
   Icon_Volume,
   Icon_VolumeXmark,
   Icon_Play,
   Icon_Pause,
   Icon_Heart,
   Icon_Comment,
   Icon_Flag,
   Icon_Share,
   Icon_Check
};
