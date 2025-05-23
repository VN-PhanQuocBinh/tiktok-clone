import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import { publicRoutes } from "./routes";

import { DefaultLayout, HeaderOnlyLayout, SidebarOnlyLayout } from "./layouts";
import { LAYOUT_TYPE } from "./constants";

import { AuthProvider } from "./contexts/AuthContext";
import { AuthModalProvider } from "./contexts/AuthModalContext";
import { UIProvider } from "./contexts/UIContext/UIContext";

function App() {
   return (
      <BrowserRouter>
         <AuthProvider>
            <UIProvider>
               <AuthModalProvider>
                  <Routes>
                     {publicRoutes.map((route, index) => {
                        let Layout;

                        switch (route.layout) {
                           case LAYOUT_TYPE.NO_LAYOUT:
                              Layout = Fragment;
                              break;
                           case LAYOUT_TYPE.HEADER_ONLY:
                              Layout = HeaderOnlyLayout;
                              break;
                           case LAYOUT_TYPE.DEFAULT:
                              Layout = DefaultLayout;
                              break;
                           case LAYOUT_TYPE.SIDEBAR_ONLY:
                              Layout = SidebarOnlyLayout;
                              break;
                           default:
                              throw Error("Unknown Layout: " + route.layout);
                        }

                        const Page = route.element;
                        return (
                           <Route
                              exact
                              key={index}
                              path={route.path}
                              element={
                                 <Layout>
                                    <Page />
                                 </Layout>
                              }
                           />
                        );
                     })}
                  </Routes>
               </AuthModalProvider>
            </UIProvider>
         </AuthProvider>
      </BrowserRouter>
   );
}

export default App;
