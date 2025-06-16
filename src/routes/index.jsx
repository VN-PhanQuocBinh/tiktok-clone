import Home from "../pages/Home";
import Following from "../pages/Following";
import Chat from "../pages/Chat";
import Profile from "../pages/Profile";

import Test from "../pages/Test";

import { LAYOUT_TYPE } from "../constants";

import config from "../config";

const publicRoutes = [
  {
    path: config.routes.home,
    element: Home,
    layout: LAYOUT_TYPE.SIDEBAR_ONLY
  },
  {
    path: config.routes.following,
    element: Following,
    layout: LAYOUT_TYPE.SIDEBAR_ONLY
  },
  {
    path: config.routes.chat,
    element: Chat,
    layout: LAYOUT_TYPE.HEADER_ONLY
  },
  {
    path: config.routes.profile,
    element: Profile,
    layout: LAYOUT_TYPE.SIDEBAR_ONLY
  },
  // {
  //   path: config.routes.test,
  //   element: Test,
  //   layout: LAYOUT_TYPE.NO_LAYOUT
  // }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
