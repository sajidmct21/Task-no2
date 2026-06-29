import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import User from './components/user/User'
import Admin from './components/admin/Admin'
import Vendor from './components/vendor/Vendor'
import Unauthorized from './components/Unauthorized'
import NotFound from './components/NotFound'
import Register from './components/admin/Register'
import UserList from './components/user/UserList'
import VendorList from './components/vendor/VendorList'
import VendorDetails from './components/vendor/VendorDetails'
import Profile from './components/vendor/Profile'
import UserDetails from './components/user/UserDetails'
import QuotationRequest from './components/user/QuotationRequest'
import AllQuotationRequest from './components/common/AllQuotationRequest'
import AssignVendor from './components/admin/AssignVendor'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />

        //  user Route
        <Route path='/user' element={<User />}>
        <Route path='profile' element={<UserDetails/>}/>
        <Route path='create-quotation-request' element={<QuotationRequest/>}/>
        <Route path='get-all-quotations' element={<AllQuotationRequest/>}/>
        </Route>

        //  Admin Route
        <Route path='/admin' element={<Admin />}>
          <Route path="register" element={<Register />} />
          <Route path="userList" element={<UserList />} />
          <Route path="vendorList" element={<VendorList />} />
          <Route path="vendor-assignment" element={<AssignVendor />} />
        </Route>

      //  Vendor Route
        <Route path='/vendor' element={<Vendor />} >
          <Route path="profile" element={<Profile />} />
          <Route path="details/:id" element={<VendorDetails />} />
        </Route>
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
