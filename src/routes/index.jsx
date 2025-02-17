import Home from "../pages/Home";
import Following from "../pages/Following";
import Chat from "../pages/Chat";
import Profile from "../pages/Profile";

import { LAYOUT_TYPE } from "../constants";

import routesConfig from "../config/routes";

const publicRoutes = [
  {
    path: routesConfig.home,
    element: Home,
    layout: LAYOUT_TYPE.DEFAULT
  },
  {
    path: routesConfig.following,
    element: Following,
    layout: LAYOUT_TYPE.NO_LAYOUT
  },
  {
    path: routesConfig.chat,
    element: Chat,
    layout: LAYOUT_TYPE.HEADER_ONLY
  },
  {
    path: routesConfig.profile,
    element: Profile,
    layout: LAYOUT_TYPE.SIDEBAR_ONLY
  }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
