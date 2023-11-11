import React, { useEffect, useState } from "react"
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from "react-redux"
import { DeleteUser, AllUsers, clearErrorAdminUser } from "../../../Store/features/productSlice";
import { Box, CircularProgress } from "@mui/material";
import "../products/PR.css"
import "./users.css"
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Users = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()

  const { loadingAdminUser, errorAdminUser, msgAdminUser, users } = useSelector(state => state.app.AuthorizedUserFunc)

  useEffect(() => {
    dispatch(AllUsers())
  }, [dispatch])


  const handleDelete = (prId) => {
    const confirm = window.confirm("Are you sure you want to delete this user?")
    if (confirm) {
      dispatch(DeleteUser(prId))
    }
  }


  useEffect(() => {
    if (errorAdminUser) {
      enqueueSnackbar(errorAdminUser, { variant: "error" });
    }

    if (msgAdminUser) {
      enqueueSnackbar(msgAdminUser, { variant: "success" })
      navigate('/admin/dashboard/users')
    }

    return () => {
      dispatch(clearErrorAdminUser())
    }

  }, [msgAdminUser, errorAdminUser, dispatch])

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        display: false,
        download: false
      }
    },
    {
      name: "username",
      label: "Username",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: false,
      }
    },

    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,

        customBodyRender: (value, tableMeta) => {
          const userId = tableMeta.rowData[0]

          return (
            <>
              <Link to={`/admin/dashboard/singleuser/${userId}`}>
                <button className="btn btn-info btn-sm rounded-pill px-3 py-2 me-4 mb-2" title="Veiw User" aria-label="Edit Product" data-bs-toggle="tooltip" data-bs-placement="top" type="button" id="tooltip-top-start" style={{ backgroundColor: "rgb(59 186 211)" }}>
                  <span className="bi bi-eye text-white"></span>
                </button>
              </Link>

              <Link to={`/admin/dashboard/updateuser/${userId}`}>
                <button className="btn btn-warning btn-sm rounded-pill px-3 py-2 me-4 mb-2" title="Edit User" aria-label="Edit Product" data-bs-toggle="tooltip" data-bs-placement="top" type="button" id="tooltip-top-start" style={{ backgroundColor: "rgb(255 185 27)" }}>
                  <span className="bi bi-pencil text-white"></span>
                </button>
              </Link>

              <a onClick={() => handleDelete(userId)}>
                <button className="btn btn-danger btn-sm rounded-pill px-3 py-2 me-2 mb-2" title="Delete User" aria-label="Delete Product" data-bs-toggle="tooltip" data-bs-placement="top" type="button" id="tooltip-top-start" style={{ backgroundColor: "red" }}>
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
         loadingAdminUser ? (
          <div>
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
              <CircularProgress sx={{ color: "black" }} size={40} thickness={5} />
            </Box>
          </div>

        ) : (
          <>
            <MUIDataTable
              title={"All Users"}
              data={users}
              columns={columns}
              options={options}
            />
          </>
        )
      }

    </>
  )
}

export default Users