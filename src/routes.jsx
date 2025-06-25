// src/routes.js
import Dashboard from "./pages/dashoard/Dashboard";
import ProductsPage from "./pages/dashoard/Products/ProductsPage";
import ProductDetail from "./pages/dashoard/Products/ProductsDetail";
import SignIn from "./pages/auth/SignIn";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaBoxOpen, FaUser } from "react-icons/fa6";
import ProtectedRoute from "./components/ProtectedRoute";

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        name: "Dashboard",
        path: "/",
        icon: <TbLayoutDashboard size={18} />,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        showInSidebar: true,
      },
      {
        name: "Posts",
        path: "/posts",
        icon: <FaUser size={18} />,
        element: (
          <ProtectedRoute>
            <ProductsPage/>
          </ProtectedRoute>
        ),
        showInSidebar: true,
      },

      {
        name: "Products",
        icon: <FaBoxOpen size={18} />,
        dropdown: true,
        showInSidebar: true,
        children: [
          {
            name: "Product Detail",
            path: "/product",
            element: (
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            ),
          },
        ],
        
      },
    ],
  },
  {
    layout: "auth",
    pages: [
      {
        name: "Sign In",
        path: "/sign-in",
        element: <SignIn />,
        showInSidebar: false,
      },
    ],
  },
];
