import { NavLink } from "react-router-dom";

function UserSidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">

      <h2 className="text-2xl font-bold text-center py-6">
        User
      </h2>

      <nav className="flex flex-col">

        <NavLink
          to="/user"
          className="px-6 py-3 hover:bg-gray-700"
        >
          Dashboard
        </NavLink>

        <NavLink
          to='/user/profile'
          className="px-6 py-3 hover:bg-gray-700"
        >
          User's Profile
        </NavLink>

        <NavLink
          to="/user/create-quotation-request"
          className="px-6 py-3 hover:bg-gray-700"
        >
          Create Quotation Request
        </NavLink>


        <NavLink
          to="/user/get-all-quotations"
          className="px-6 py-3 hover:bg-gray-700"
        >
          All Quotations
        </NavLink>

      </nav>

    </aside>
  );
}

export default UserSidebar;