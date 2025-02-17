import Home from "../pages/Home";
import Following from "../pages/Following";
import Chat from "../pages/Chat";
import Profile from "../pages/Profile";

import { LAYOUT_TYPE } from "../constants";

const publicRoutes = [
  {
    path: "/",
    element: Home,
    layout: LAYOUT_TYPE.DEFAULT
  },
  {
    path: "/following",
    element: Following,
    layout: LAYOUT_TYPE.NO_LAYOUT
  },
  {
    path: "/chat",
    element: Chat,
    layout: LAYOUT_TYPE.HEADER_ONLY
  },
  {
    path: "/profile/:nickname?",
    element: Profile,
    layout: LAYOUT_TYPE.SIDEBAR_ONLY
  }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
