import { NavLink } from "react-router-dom";

function Sidebar() {
  const id = localStorage.getItem("id");
  // const id = user.id;
  // console.log(id);

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">

      <h2 className="text-2xl font-bold text-center py-6">
        Vendor
      </h2>

      <nav className="flex flex-col">

        <NavLink
          to="/vendor"
          className="px-6 py-3 hover:bg-gray-700"
        >
          Dashboard
        </NavLink>

        <NavLink
          to='/vendor/profile'
          className="px-6 py-3 hover:bg-gray-700"
        >
          Create Profile
        </NavLink>

        <NavLink
          to={`/vendor/details/${id}`}
          className="px-6 py-3 hover:bg-gray-700"
        >
          Vendor Details
        </NavLink>


        {/* <NavLink
          to="/admin/vendorList"
          className="px-6 py-3 hover:bg-gray-700"
        >
          Vendors
        </NavLink> */}

      </nav>

    </aside>
  );
}

export default Sidebar;