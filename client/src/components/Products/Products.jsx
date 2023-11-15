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
import { allProducts } from '../../Store/features/productSlice';
import "./products.css";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Search from "../search/Search"

const categories = [
  "All Categories",
  "Laptop",
  "Home",
  "Fitness",
  "Kids",
  'Computers',
  ' Video Games',
  'Kitchen & Dining',
  'Cameras',
  "furniture",
  'Electronics',
];

const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const [category, setCategory] = useState('');
  const [minPrice] = useState(20);
  const [maxPrice] = useState(20000);
  const [price, setPrice] = useState([minPrice, maxPrice]);
  const [currentPage, setcurrentPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);

  const priceRanges = [
    { label: 'All Ranges', value: '0-0' },
    { label: '$100-$500', value: '100-500' },
    { label: '$100-$300', value: '100-300' },
    { label: '$400-$500', value: '400-500' },
    { label: '$700-$1200', value: '700-1200' },
    { label: '$1300-$20000', value: '1300-20000' }
    // Add more price range options as needed
  ];



  const { products, pages, pageNo, totalProducts, resultPerPage } = useSelector((state) => state.app.products.products)
  const { loading, error } = useSelector((state) => state.app.products)



  useEffect(() => {
    setSearchLoading(false)
    dispatch(allProducts({ currentPage: currentPage, category: category, minPrice: price[0], maxPrice: price[1], keyword: keyword }));
  }, [dispatch, currentPage, category, price[0], price[1], keyword, setSearchLoading]);



  if (category === 'All Categories') {
    setCategory('')
  }


  // price handler
  const priceHandler = (event) => {
    const eventVal = event.target.value;
    if (eventVal === '0-0') {
      setPrice([20, 20000])
    }
    else {
      // .split('-') is used to split the string into an array 
      //  This will result in an array like ['200', '500']
      const newPrice = event.target.value.split('-').map(Number);  // and map would map through these two values in array and convert it to number
      setPrice(newPrice);
    }

  };



  if (error) {
    return <Error />
  }




  return (
    <Fragment>
      {
        searchLoading ? (
          <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "999" }}>
            <Loader />
          </div>
        )
          : (
            <div>

              <div style={{ position: "relative" }} className='d-flex items-center p-3'>
                <Search setSearchLoading={setSearchLoading} />
                <div style={{ position: "absolute", right: 40, top: '30%' }}>
                  <span className='bi bi-search'></span>
                </div>
              </div>

              {/* filter by category */}
              <div className='input-group mx-3 my-4 catDrop' style={{ width: 190 }}>

                <FormControl>
                  <InputLabel style={{ fontSize: "12px", padding: "0px 0px 5px 0px", position: "absolute", top: "-9px" }} htmlFor="demo-select">Select Category</InputLabel>
                  <Select
                    labelId="demo-select-label"
                    id="demo-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Select Category"
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: '200px', // Set your desired max height here
                        },
                      },
                    }}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>


                {/* filter by price */}
                <FormControl >
                  <InputLabel htmlFor="demo-select">Select Price</InputLabel>
                  <Select
                    labelId="demo-select-label"
                    id="demo-select"
                    value={`${price[0]}-${price[1]}`}
                    onChange={priceHandler}
                    label="Select Price"
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: '200px', // Set your desired max height here
                        },
                      },
                    }}
                  >
                    {priceRanges.map((rang) => (
                      <MenuItem key={rang.value} value={rang.value}>
                        {rang.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

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
                    <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "999" }}>
                      <Loader />
                    </div>
                  ) :
                    (
                      products && !products.length ? (
                        <div className='text-danger'>
                          <h4>No Products Found !</h4>
                        </div>
                      ) : (

                        products && products.map((item) => (
                          <ProductCard items={item} key={item._id} />
                        ))
                      )

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
                      color="warning"/>
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
