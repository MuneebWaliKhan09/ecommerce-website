import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateProduct, clearErrorAdminProduct, productsDetails } from '../../../../Store/features/productSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'
import { useSnackbar } from 'notistack';

const UpdatePr = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  const { product, loading } = useSelector(state => state.app.products)
  const { loadingAdminProduct, errorAdminProduct, msgAdminProduct } = useSelector(state => state.app.AuthorizedProductFunc)

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [images, setimages] = useState('');
  const [stock, setStock] = useState(0);


  useEffect(() => {
    dispatch(productsDetails(params.id))
  }, [params.id])


  const handleUpdate = (e) => {
    e.preventDefault()
    const data = new FormData()

    data.append('name', name)
    data.append('description', description)
    data.append('price', price)
    data.append('category', category)
    data.append('images', images)
    data.append('stock', stock)

    dispatch(UpdateProduct({ id: params.id, data: data }))
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

    if (product) {

      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setCategory(product.category)
      setStock(product.stock)
    }

  }, [product])





  if (loadingAdminProduct) {
    return <div>
      <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
        <CircularProgress sx={{ color: "black" }} size={40} thickness={5} />
      </Box>
    </div>
  }

  return (
    <div className='container w-100 h-100 d-flex justify-content-center mobileScreen px-0 py-0 align-items-center mt-lg-5 flex-column col-12 '>

      {
        loading ? (
          <div>
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
              <CircularProgress sx={{ color: "black" }} size={40} thickness={5} />
            </Box>
          </div>
        )
          : (

            <form className='form-control p-0 border border-2 border-primary' encType='multipart/form-data' onSubmit={handleUpdate}>
              <p className="form-title text-center text-md Addtitle p-2">Update Product</p>

              <div className='container p-4 m-2 d-flex flex-column gap-5'>

                <div >
                  <label htmlFor="formFile" className="form-label">Product Title :</label>
                  <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder='Product Title' name="name" /><p></p>
                </div>

                <div >
                  <label htmlFor="formFile" className="form-label">Product Description :</label>
                  <input className="form-control" onChange={(e) => setDescription(e.target.value)} value={description} type='text' aria-label="With textarea" name='description' placeholder='Description..' /><p></p>
                </div>

                <div>
                  <label htmlFor="formFile" className="form-label">Product Price :</label>
                  <div className='d-flex align-items-center'>
                    <span className="input-group-text"> $</span>
                    <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} className="form-control" name='price' placeholder='Product Price' />
                  </div>
                  <p></p>
                </div>

                <div>
                  <label htmlFor="formFile" className="form-label">Product Image :</label>
                  <div>
                    {
                      product.images && product.images[0] && product.images[0].url && (
                        <img src={product.images[0].url} alt={product.name} height={50} width={50} />
                      )
                    }
                  </div>
                  <input className="form-control" onChange={(e) => setimages(e.target.files[0])} name='images' type='file' /><p></p>
                </div>

                <div>
                  <label htmlFor="formFile" className="form-label">Category :</label>
                  <input type="text" onChange={(e) => setCategory(e.target.value)} value={category} className="form-control" name='category' placeholder='Category' /><p></p>
                  <p></p>
                </div>

                <div>
                  <label htmlFor="formFile" className="form-label">Product Stock :</label>
                  <div className='d-flex align-items-center'>
                    <input type="number" onChange={(e) => setStock(e.target.value)} value={stock} className="form-control" name='stock' placeholder='Product Stock' />
                  </div>
                  <p></p>
                </div>

                <button type="submit" className="btn btn-primary">
                  Update Product
                </button>

              </div>


            </form>

          )
      }
    </div>
  )
}

export default UpdatePr

