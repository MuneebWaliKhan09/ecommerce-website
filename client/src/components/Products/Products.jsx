import React, { Fragment, useEffect, useState } from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import "../Home/home.css";
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard/ProductCard';
import Loader from "../CustomLoader/Loader"
import Error from "../customError/Error"
import { Link, useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getProducts } from '../../Store/actions/productActions';
import "./products.css";
import { MenuItem, Select } from '@mui/material';

const categories = [
  "All Categories",
  "Laptop",
  "Home",
  "Fitness",
  "Kids",
];

const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const [category, setCategory] = useState('');
  const [minPrice, setmaxPrice] = useState(0);
  const [maxPrice, setminPrice] = useState(1000);
  const [price, setPrice] = useState([minPrice, maxPrice]);
  const [currentPage, setcurrentPage] = useState(1);

  const priceRanges = [
    { label: 'All Ranges', value: '0-0' },
    { label: '$0-$100', value: '0-100' },
    { label: '$100-$300', value: '100-300' },
    { label: '$400-$500', value: '400-500' },
    { label: '$500-$1000', value: '400-1000' },
    // Add more price range options as needed
  ];




  const { products, loading, error, pages, pageNo, totalProducts, resultPerPage } = useSelector((state) => state.products)


  const priceHandler = (event) => {
    const eventVal = event.target.value;
    if (eventVal === '0-0') {
      setPrice([0, 1000])
    }
    else {
      // .split('-') is used to split the string into an array 
      //  This will result in an array like ['200', '500']
      const newPrice = event.target.value.split('-').map(Number);  // and map would map through these two values in array and convert it to number
      setPrice(newPrice);
      // setminPrice(newPrice[0]);
      // setmaxPrice(newPrice[1]);

    }

  };


  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, category, minPrice, maxPrice));
  }, [dispatch, keyword, currentPage, category, minPrice, maxPrice]);


  if (category === 'All Categories') {
    setCategory('')
  }





  console.log(category)
  if (error) {
    return <Error />
  }


  return (
    <Fragment>
      {
        loading ? (
          <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "999" }}>
            <Loader />
          </div>
        )
          : (
            <div>
              {/* filter by category */}
              <div className='input-group mx-1 catDrop' style={{ width: 190 }}>
                <select className='form-select' onChange={(e) => setCategory(e.target.value)}>
                  <option value='' selected disabled>Select a Category</option>
                  {
                    categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))
                  }
                </select>
                
                <Select
                  labelId="demo-select-label"
                  id="demo-select"
                  value={`${price[0]}-${price[1]}`}// Set the selected value based on your state
                  onChange={priceHandler}
                >
                  {priceRanges.map((rang) => (
                    <MenuItem key={rang.value} value={rang.value}>
                      {rang.label}
                    </MenuItem>
                  ))}
                </Select>

              </div>



              <main className='main'>

                <div className='Heading'>
                  <h1>Latest Products: </h1>
                </div>

                <div className='d-flex gap-3 align-items-center mx-1 catOutline'>
                  {category && <><h4>Selected Category:</h4><h5 className='text-primary'>[ {category.toLocaleUpperCase()} ]</h5></>}
                </div>

                <div className='LatestProducts'>
                  {loading ? (
                    <div>
                      <Loader />

                    </div>
                  ) :
                    (
                      products && products.map((item) => (
                        <ProductCard items={item} key={item._id} />
                      ))
                    )

                  }

                </div>

              </main>

              {/* pagination */}
              <div className='d-flex justify-content-center mb-5'>
                {
                  totalProducts > resultPerPage &&  // totalProducts means total products in the database// it means that ager poray products zyada hoye reslutPerPage say tho he pagination dekana

                  <Stack spacing={2}>
                    <Pagination
                      sx={{ '& .MuiPaginationItem-root': { fontSize: '20px' } }}
                      count={pages}   // pages we have
                      page={pageNo}  // current page no abhi jo load kerna hain
                      onChange={(e, pageNo) => setcurrentPage(pageNo)}
                      color="primary" />
                  </Stack>

                }

              </div>

            </div>
          )
      }

    </Fragment>


  );
};

export default Products
