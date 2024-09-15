import React, { useEffect, useState } from 'react'
import "./Add.css";
import { allProducts } from '../../../Store/features/productSlice';
import { useDispatch, useSelector } from 'react-redux';

import { CreateProduct, clearErrorAdminProduct } from '../../../Store/features/productSlice'
import { useNavigate } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'
import { useSnackbar } from 'notistack';

const categories = [
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

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [images, setimages] = useState('');
  const [stock, setStock] = useState(0);


  const { loadingAdminProduct, errorAdminProduct, msgAdminProduct } = useSelector(state => state.app.AuthorizedProductFunc)


  const handleAdd = (e) => {
    e.preventDefault()
    const data = new FormData()

    data.append('name', name)
    data.append('description', description)
    data.append('price', price)
    data.append('category', category)
    data.append('images', images)
    data.append('stock', stock)

    dispatch(CreateProduct(data))
  }



  useEffect(() => {
    if (errorAdminProduct) {
      enqueueSnackbar(errorAdminProduct, { variant: "error" });
    }

    if (msgAdminProduct) {
      enqueueSnackbar(msgAdminProduct, { variant: "success" })
      navigate('/admin/dashboard/products')
    }

    return () => {
      dispatch(clearErrorAdminProduct())
    }

  }, [msgAdminProduct, errorAdminProduct, dispatch])



  useEffect(() => {
    dispatch(allProducts({}))
  }, [dispatch])



  if (loadingAdminProduct) {
    return <div>
      <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
        <CircularProgress sx={{ color: "black" }} size={40} thickness={5} />
      </Box>
    </div>
  }



  return (

    <div className='container w-100 h-100 d-flex justify-content-center mobileScreen px-0 py-0 align-items-center mt-lg-5 flex-column col-12 '>

      <form className='form-control p-0 border border-2 border-primary' onSubmit={handleAdd}>
        <p className="form-title text-center text-md Addtitle p-2">Add Product</p>

        <div className='container p-4 m-2 d-flex flex-column gap-5'>
          <div >
            <label htmlFor="formFile" className="form-label">Product Title :</label>
            <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" placeholder='Product Title' name="name" /><p></p>
          </div>

          <div >
            <label htmlFor="formFile" className="form-label">Product Description :</label>
            <input className="form-control" onChange={(e) => setDescription(e.target.value)} type='text' aria-label="With textarea" name='description' placeholder='Description..' /><p></p>
          </div>

          <div>
            <label htmlFor="formFile" className="form-label">Product Price :</label>
            <div className='d-flex align-items-center'>
              <span className="input-group-text"> $</span>
              <input type="number" onChange={(e) => setPrice(e.target.value)} className="form-control" name='price' placeholder='Product Price' />
            </div>
            <p></p>
          </div>

          <div>
            <label htmlFor="formFile" className="form-label">Product Image :</label>
            <div>
              {
                images && (
                  <img src={URL.createObjectURL(images)} alt='' height={50} width={50} />
                )
              }
            </div>
            <input className="form-control" onChange={(e) => setimages(e.target.files[0])} name='images' type='file' /><p></p>
          </div>
          <div>
            <label htmlFor="formFile" className="form-label">Product Stock :</label>
            <div className='d-flex align-items-center'>
              <input type="number" onChange={(e) => setStock(e.target.value)} className="form-control" name='stock' placeholder='Product Stock' />
            </div>
            <p></p>
          </div>

          <div>
            <label htmlFor="formFile" className="form-label">Choose Category :</label>
            <select className='form-select' name='category' onChange={(e) => setCategory(e.target.value)} >
              <option value="">Select Category..</option>
              {
                categories && categories.map((cat, index) => (
                  <option value={cat} key={index}>{cat}</option>
                ))
              }
            </select>
            <p></p>
          </div>

          {/* <div>
            <label htmlFor="formFile" className="form-label">Product Ratings ⭐ :</label>
            <div className='d-flex align-items-center'>
              <span className="input-group-text">⭐</span>
              <input type="number" className="form-control" name='rating' />
            </div>
            <p></p>
          </div> */}

          <button type="submit" className="btn btn-primary">
            Add Product
          </button>

        </div>


      </form>



    </div>
  )
}

export default AddProduct