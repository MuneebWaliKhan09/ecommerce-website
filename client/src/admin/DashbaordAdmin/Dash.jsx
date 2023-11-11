import React, { useContext, useEffect, useState } from 'react'
import "./dash.css";
import { BrowserRouter, Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Messages from '../Components/message/Messages';
import Orders from '../Components/order/Orders';
import Payments from '../Components/payments/Payments';
import Products from '../Components/products/Products';
import Users from '../Components/Users/Users';
import AddProduct from '../crudOperation/AddProduct/AddProduct';
import HomeAdmin from '../Components/Home/HomeAdmin';
import DrawersCustom from './MenuSmall/DrawersCustom';
import UpdatePr from '../crudOperation/AddProduct/UpdatePr/UpdatePr';
import UpdateUser from "../Components/Users/updateUser/UpdateUser"


// breadcrumbs
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import UpdateOrder from '../Components/order/updateOrder/UpdateOrder';
import User from '../Components/Users/user/User';


const Dash = ({ navigate }) => {


  const [currentRoute, setCurrentRoute] = useState('');
  const [currentLable, setCurrentLable] = useState('');

  const routes = [
    { path: '/admin/dashboard', label: 'Home' },
    { path: currentRoute, label: currentLable },
  ];

  useEffect(() => {
    const pathname = window.location.pathname
    const newpath = pathname.substr(17, Infinity)
    const parts = newpath.split('/');
    setCurrentLable(parts[0])
    setCurrentRoute(pathname)

  }, [navigate]);



  return (
    <div>
      <aside className='grid-cont'>
        <div className='grid1'>
          <ul>
            <h5>
              <Link to='/admin/dashboard' className='bi bi-person-fill-lock text-light'></Link>
            </h5>

            <li className='d-flex align-items-center gap-3'>
              <span className='bi bi-house'></span>
              <Link to='/admin/dashboard' title='Home'>Home</Link>
            </li>
            <li className='d-flex align-items-center gap-3'>
              <span className='bi bi-cart'></span>
              <Link to='products' title='Products'>Products</Link>
            </li>
            <li className='d-flex align-items-center gap-3'>
              <span className='bi bi-people'></span>
              <Link to='users' title='Users'>Users</Link>
            </li>
            <li className='d-flex align-items-center gap-3'>
              <span className='bi bi-file-earmark'></span>
              <Link to='orders' title='Orders'>Orders</Link>
            </li>
            <li className='d-flex align-items-center gap-3'>
              <span className='bi bi-credit-card'></span>
              <Link to='payments' title='Payments'>Payments</Link>
            </li>
            <li className='d-flex align-items-center gap-3'>
              <span className='bi bi-chat'></span>
              <Link to='messages' title='Messages'>Messages</Link>
            </li>
          </ul>
        </div>

        <div className='grid2'>
          <div className='brand'>
            {/* // mobile screen drawer menu */}
            <div className='MobileMenu'>
              <DrawersCustom />
            </div>

            <h1>Dash-board</h1>

          </div>

          <Breadcrumb>
            {routes.map((route, index) => (
              <Breadcrumb.Item
                key={index}
                as={Link}
                to={route.path}
                active={currentLable !== route.label ? currentLable : currentLable === "Home"}
              >
                {route.label}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>

          <div className='main_Text'>

            <main className='maindash'>

              {window.location.pathname === '/admin/dashboard' && (
                <div>
                  <HomeAdmin />
                </div>
              )}
              <Outlet />

              <Routes>
                <Route path='/users' element={<Users />} />
                <Route path='/messages' element={<Messages />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/payments' element={<Payments />} />
                <Route path='/products' element={<Products />} />
                <Route path='/addproduct' element={<AddProduct />} />
                <Route path='/updateproduct/:id' element={<UpdatePr />} />
                <Route path='/allOrders' element={<Orders />} />
                <Route path='/updateorder/:id' element={<UpdateOrder />} />
                <Route path='/users' element={<Users />} />
                <Route path='/singleuser/:id' element={<User />} />
                <Route path='/updateuser/:id' element={<UpdateUser />} />

              </Routes>

            </main>

          </div>

        </div>

      </aside>

    </div>

  )
}

export default Dash