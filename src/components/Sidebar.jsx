import { Link, useLocation } from "react-router-dom";
import { routes } from "../routes";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 bg-gray-100 h-screen shadow p-4">
      <h2 className="text-lg font-bold mb-6">Admin Panel</h2>

      {routes
        .find((r) => r.layout === "dashboard")
        ?.pages.filter((p) => p.showInSidebar)
        .map((route) => {
          if (route.dropdown) {
            return (
              <div key={route.name} className="mb-2">
                <div className="flex items-center gap-2 font-medium text-gray-700">
                  {route.icon}
                  {route.name}
                </div>
                <div className="ml-5 mt-1 flex flex-col gap-1">
                  {route.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={`text-sm ${
                        pathname === child.path
                          ? "text-blue-600 font-semibold"
                          : "text-gray-600 hover:text-blue-500"
                      }`}
                    >
                    {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={route.path}
              to={route.path}
              className={`flex items-center gap-2 mb-2 p-2 rounded ${
                pathname === route.path
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              {route.icon}
              {route.name}
            </Link>
          );
        })}
    </aside>
  );
};

export default Sidebar;
