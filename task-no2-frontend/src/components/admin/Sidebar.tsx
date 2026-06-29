import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">

      <h2 className="text-2xl font-bold text-center py-6">
        Admin
      </h2>

      <nav className="flex flex-col">

        <NavLink
          to="/admin"
          className="px-6 py-3 hover:bg-gray-700"
        >
          Dashboard
        </NavLink>

        <NavLink
          to='/admin/register'
          className="px-6 py-3 hover:bg-gray-700"
        >
          Create a New User
        </NavLink>

        <NavLink
          to="/admin/userList"
          className="px-6 py-3 hover:bg-gray-700"
        >
          Users
        </NavLink>


        <NavLink
          to="/admin/vendorList"
          className="px-6 py-3 hover:bg-gray-700"
        >
          Vendors
        </NavLink>
        <NavLink
          to="/admin/vendor-assignment"
          className="px-6 py-3 hover:bg-gray-700"
        >
          Assign Vendors
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;