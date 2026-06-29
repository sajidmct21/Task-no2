import { Navigate, Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"


function Vendor() {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user')|| '{}')
  if(!token){
    return <Navigate to="/login"/>
  }
  if(user.role !== 'vendor'){
    return <Navigate to={"/unauthorized"}/>
  }

  return (
    <div>
      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default Vendor