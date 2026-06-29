import { Navigate, Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

function Admin() {

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" />
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>

    </div>
    // <div>
    //   Admin Dashboard
    //   <div>
    //     <button onClick={toRegister}>Register</button>
    //   </div>
    //   <div>
    //     <Outlet />
    //   </div>

    // </div>

  )
}

export default Admin