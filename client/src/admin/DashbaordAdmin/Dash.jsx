import React, { useContext, useEffect, useState } from 'react'
import "./dash.css";
import { BrowserRouter, Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Messages from '../Components/message/Messages';
import Orders from '../Components/order/Orders';
import Payments from '../Components/payments/Payments';
import Products from '../Components/products/Products';
import Categories from '../Components/Categories/Categories';
import AddProduct from '../crudOperation/AddProduct/AddProduct';
import HomeAdmin from '../Components/Home/HomeAdmin';
import DrawersCustom from './MenuSmall/DrawersCustom';
// import RegisterAdmin from '../RegisterAdmin/RegisterAdmin';
// import Users from './UsersAdmins/Users';
import UpdatePr from '../crudOperation/AddProduct/UpdatePr/UpdatePr';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// menu on side
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';

// breadcrumbs
import Breadcrumb from 'react-bootstrap/Breadcrumb';


const Dash = ({ navigate }) => {
  const navigater = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);



  const [currentRoute, setCurrentRoute] = useState('');

  const routes = [
    { path: '/admin/dashboard', label: 'Home' },
    { path: '/admin/dashboard/products', label: 'Products' },
    { path: '/admin/dashboard/categories', label: 'Categories' },
    { path: '/admin/dashboard/orders', label: 'Orders' },
    { path: '/admin/dashboard/payments', label: 'Payments' },
    { path: '/admin/dashboard/messages', label: 'Messages' },
  ];

  useEffect(() => {
    setCurrentRoute(window.location.pathname);
  }, [navigate]);




  // if (isLoading) {
  //   return <div>
  //     <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
  //       <CircularProgress />
  //     </Box>
  //   </div>;
  // }









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
              <span className='bi bi-list'></span>
              <Link to='categories' title='Category'>Category</Link>
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
                active={currentRoute === route.path}
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
                <Route path='/categories' element={<Categories />} />
                <Route path='/messages' element={<Messages />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/payments' element={<Payments />} />
                <Route path='/products' element={<Products />} />
                <Route path='/addproduct' element={<AddProduct />} />
                <Route path='/updateproduct/:id' element={<UpdatePr />} />
              </Routes>

            </main>

          </div>

        </div>

      </aside>

    </div>

  )
}

export default Dash