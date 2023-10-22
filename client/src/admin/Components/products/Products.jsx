import React, { useEffect, useState } from "react"
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from "react-redux"
import { allProducts } from "../../../Store/features/productSlice";
import { Box, CircularProgress } from "@mui/material";
import "./PR.css"

const Products = () => {
  const dispatch = useDispatch()
  const [Products, setProducts] = useState([])
  const products = useSelector((state) => state.app.products.products.products)
  const { loading } = useSelector((state) => state.app.products)




  useEffect(() => {
    dispatch(allProducts({}))
  }, [dispatch])

  useEffect(() => {
    const mapPr = products && products.length > 0 ? products.map((item) => {
      return {
        Id: `${item._id.substring(0, 10)}...`,
        product: item.name,
        price: item.price,
        category: item.category,
        ratings: item.ratings.toFixed(1),
        image: item.images && item.images[0] ? <img src={item.images[0].url} alt="product" style={{ height: "50px", width: "50px" }} /> : "",
      }
    }) : []

    setProducts(mapPr)
  }, [products])



  const columns = [
    {
      name: "Id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
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
        loading ? (
          <div>
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
              <CircularProgress sx={{ color: "black" }} size={40} thickness={5} />
            </Box>
          </div>

        ) : (

          <MUIDataTable
            title={"All Products"}
            data={Products}
            columns={columns}
            options={options}
          />
        )
      }
    </>

  )
}

export default Products