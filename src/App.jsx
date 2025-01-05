import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import { publicRoutes } from "./routes";

import { DefaultLayout, HeaderOnlyLayout } from "./components/Layouts";
import { LAYOUT_TYPE } from "./constants";

function App() {
  return (
    <BrowserRouter>
      <h1>React App - Tiktok Clone</h1>
      <button>Button</button>

      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout

          switch (route.layout) {
            case LAYOUT_TYPE.NO_LAYOUT:
              Layout = Fragment
              break
            case LAYOUT_TYPE.HEADER_ONLY:
              Layout = HeaderOnlyLayout
              break
            case LAYOUT_TYPE.DEFAULT:
              Layout = DefaultLayout
              break
            default:
              throw Error("Unknown Layout: " + route.layout)
          }

          const Page = route.element;
          return (
            <Route
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
    </BrowserRouter>
  );
}

export default App;
