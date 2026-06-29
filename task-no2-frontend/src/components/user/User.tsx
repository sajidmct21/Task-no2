import { Navigate, Outlet } from "react-router-dom"
import UserSidebar from "./UserSidebar"


function User() {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!token) {
    return <Navigate to="/login" />
  }
  if (user.role !== 'user') {
    return <Navigate to={"/unauthorized"} />
  }
  return (
    <div>
      <div className="flex">

        <UserSidebar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default User