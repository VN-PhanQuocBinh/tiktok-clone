const LAYOUT_TYPE = {
   DEFAULT: "default",
   HEADER_ONLY: "header_only",
   SIDEBAR_ONLY: "sidebar_only",
   NO_LAYOUT: "no_layout", 
}

const DROPDOWN_ITEM_TYPE = {
   DEFAULT: "default",
   BULLETED: 'bulleted',
   SEARCH_RESULT: "search_result",
   ACTIONS: "actions",
   ACTIONS_HEADER: "actions_header",
   USER: "user-suggest",
   USER_SUGGESTED: "user-suggested",
   NAV_MORE_ITEM: "nav-more-item"
}

const AUTH_TYPE = {
   LOGIN_OPTIONS: "login_options",
   SIGNUP_OPTIONS: "signup_options",
   LOGIN: "login",
   SIGNUP: "signup",
   LOGOUT_CONFIRM: "logout_confirm"
};

const ACTION_VIDEOS_TYPE = {
   INIT_VIDEOS_CACHE: "init_videos_cache",
   UPDATE_VIDEOID: "update_videoid",
   CLOSE_COMMENT: "close_comment",
   OPEN_COMMENT: "open_comment",
   CACHING_COMMENTS: "caching_comments",
   SET_VOLUME: "set_volume",
   CACHING_VIDEOS: "caching_videos",
   TOGGLE_LIKE_VIDEO: "toggle_like_video"
};


const MODAL_TYPES = {
   CONFIRM_DELETE_COMMENT: "confirm_delete_comment",
   ALERT: "alert",
   AUTH_MODALS: "auth_modals",
   CONFIRM_LOGOUT: "confirm_logout"
}

const ACTION_MODAL_TYPES = {
   CLOSE_MODAL: "close_modal",
   OPEN_CONFIRM_DELETE_COMMENT: "open_confirm_delete_comment",
   OPEN_ALERT: "open_alert",
   OPEN_AUTH_MODALS: "auth_modals",
   OPEN_CONFIRM_LOGOUT: "confirm_logout"
}


export { 
   LAYOUT_TYPE,
   DROPDOWN_ITEM_TYPE,
   AUTH_TYPE,
   ACTION_VIDEOS_TYPE,
   MODAL_TYPES,
   ACTION_MODAL_TYPES,
}