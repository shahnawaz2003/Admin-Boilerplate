// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

const App = () => {
  return (
    <Routes>
      {routes.flatMap(({ layout, pages }) => {
        const Layout =
          layout === "dashboard"
            ? DashboardLayout
            : layout === "auth"
            ? AuthLayout
            : React.Fragment;

        return pages.flatMap((page) => {
          // Render route directly if no children
          if (!page.children) {
            return (
              <Route
                key={page.path}
                path={page.path}
                index={page.index}
                element={<Layout>{page.element}</Layout>}
              />
            );
          }

          // If the route has children, render them all
          return page.children.map((child) => (
            <Route
              key={child.path}
              path={child.path}
              element={<Layout>{child.element}</Layout>}
            />
          ));
        });
      })}
    </Routes>
  );
};

export default App;
