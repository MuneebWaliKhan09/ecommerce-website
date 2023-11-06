import React, { useEffect, useState } from "react"
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from "react-redux"
import { DeleteProduct, allProducts, clearErrorAdminProduct } from "../../../Store/features/productSlice";
import { Box, CircularProgress } from "@mui/material";
import "./PR.css"
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Products = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()
  const [Products, setProducts] = useState([])
  const { AllPRODUCTS } = useSelector((state) => state.app.products.products)
  const { loading } = useSelector((state) => state.app.products)
  const { loadingAdminProduct, errorAdminProduct, msgAdminProduct } = useSelector(state => state.app.AuthorizedProductFunc)




  useEffect(() => {
    dispatch(allProducts({}))
  }, [dispatch])



  useEffect(() => {
    const mapPr = AllPRODUCTS && AllPRODUCTS.length > 0 ? AllPRODUCTS.map((item) => {
      return {
        Id: `${item._id}`,
        product: item.name,
        price: item.price,
        stock: item.stock === 0 ? <span className="text-danger">Out Of Stock</span> : item.stock,
        category: item.category,
        ratings: item.ratings.toFixed(1),
        image: item.images && item.images[0] ? <img src={item.images[0].url} alt="product" style={{ height: "50px", width: "50px" }} /> : "",
      }
    }) : []

    setProducts(mapPr)
  }, [AllPRODUCTS])


  const handleDelete = (prId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?")
    if (confirm) {
      dispatch(DeleteProduct(prId))
    }
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

  const columns = [
    {
      name: "Id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        display: false,
        download: false
      }
    },
    {
      name: "product",
      label: "Product",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "image",
      label: "Image",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "stock",
      label: "Stock",
      options: {
        filter: false,
        sort: false,
      }
    },

    {
      name: "category",
      label: "Category",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "ratings",
      label: "Ratings",
      options: {
        filter: true,
        sort: true,
      }
    },

    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,

        customBodyRender: (value, tableMeta) => {
          const prId = tableMeta.rowData[0]

          return (
            <>
              <Link to={`/product/${prId}`}>
                <button className="btn btn-info btn-sm rounded-pill px-3 py-2 me-4 mb-2" title="Edit Product" aria-label="Edit Product" data-bs-toggle="tooltip" data-bs-placement="top" type="button" id="tooltip-top-start" style={{ backgroundColor: "rgb(59 186 211)" }}>
                  <span className="bi bi-eye text-white"></span>
                </button>
              </Link>

              <Link to={`/admin/dashboard/updateproduct/${prId}`}>
                <button className="btn btn-warning btn-sm rounded-pill px-3 py-2 me-4 mb-2" title="Edit Product" aria-label="Edit Product" data-bs-toggle="tooltip" data-bs-placement="top" type="button" id="tooltip-top-start" style={{ backgroundColor: "rgb(255 185 27)" }}>
                  <span className="bi bi-pencil text-white"></span>
                </button>
              </Link>

              <a onClick={() => handleDelete(prId)}>
                <button className="btn btn-danger btn-sm rounded-pill px-3 py-2 me-2 mb-2" title="Delete Product" aria-label="Delete Product" data-bs-toggle="tooltip" data-bs-placement="top" type="button" id="tooltip-top-start" style={{ backgroundColor: "red" }}>
                  <span className="bi bi-trash "></span>
                </button>
              </a>
            </>
          )
        }
      },

    }
  ];




  const options = {
    filterType: 'checkbox',
    responsive: 'simple', // Enable responsiveness
    customSort: (data, colIndex, order) => {
      if (colIndex === 1 || colIndex === 3 || colIndex === 4 || colIndex === 5) {
        // Modify this condition for the "Product" column (column index 1)
        return data.sort((a, b) => {
          if (a.data[colIndex] < b.data[colIndex]) {
            return order === 'asc' ? -1 : 1;
          }
          if (a.data[colIndex] > b.data[colIndex]) {
            return order === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }

      return data;
    },


    selectableRows: "none"
  };


  return (
    <>
      {
        loading || loadingAdminProduct ? (
          <div>
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
              <CircularProgress sx={{ color: "black" }} size={40} thickness={5} />
            </Box>
          </div>

        ) : (
          <>
            <div className="d-flex justify-content-end  align-center w-100 py-4 px-1">
              <Link>
                <button className="btn btn-primary py-1 px-3">
                  Add Product +
                </button>
              </Link>
            </div>
            <MUIDataTable
              title={"All Products"}
              data={Products}
              columns={columns}
              options={options}
            />
          </>
        )
      }
    </>

  )
}

export default Products