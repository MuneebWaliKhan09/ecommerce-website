import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOrder, adminOrders, clearErrorAdminProduct } from '../../../Store/features/productSlice';
import { Link, useNavigate } from 'react-router-dom';
import { enqueueSnackbar, useSnackbar } from 'notistack';

const Orders = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.app.AuthorizedProductFunc.orders);
  const { loadingAdminProduct, errorAdminProduct, msgAdminProduct } = useSelector(state => state.app.AuthorizedProductFunc)


  useEffect(() => {
    dispatch(adminOrders());
  }, [dispatch]);

  const handleDelete = (prId) => {
    const confirm = window.confirm("Are you sure you want to delete this order?")
    if (confirm) {
      dispatch(DeleteOrder(prId))
    }
  }

  const columns = [
    {
      name: '_id',
      label: 'Order ID',
    },
    {
      name: 'createdAt',
      label: 'Order Date',
      options: {
        customBodyRender: (value) => (
          <span>{new Date(value).toLocaleString()}</span>
        )
      }
    },
    {
      name: 'totalPrice',
      label: 'Total Amount',
    },
    {
      name: 'orderStatus',
      label: 'Order Status',
      options: {
        customBodyRender: (value) => (
          <span
            style={{
              display: 'inline-block',
              padding: '6px 13px',
              borderRadius: '999px',
              backgroundColor: getStatusColor(value), // Define a function to set the badge color based on the status
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            {value}
          </span>
        ),
      },
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
              <Link to={`/order/${prId}`}>
                <button className="btn btn-info btn-sm rounded-pill px-3 py-2 me-4 mb-2" title="Veiw Order" aria-label="Edit Product" data-bs-toggle="tooltip" data-bs-placement="top" type="button" id="tooltip-top-start" style={{ backgroundColor: "rgb(59 186 211)" }}>
                  <span className="bi bi-eye text-white"></span>
                </button>
              </Link>

              <Link to={`/admin/dashboard/updateorder/${prId}`}>
                <button className="btn btn-warning btn-sm rounded-pill px-3 py-2 me-4 mb-2" title="Edit Order" aria-label="Edit Product" data-bs-toggle="tooltip" data-bs-placement="top" type="button" id="tooltip-top-start" style={{ backgroundColor: "rgb(255 185 27)" }}>
                  <span className="bi bi-pencil text-white"></span>
                </button>
              </Link>

              <a onClick={() => handleDelete(prId)}>
                <button className="btn btn-danger btn-sm rounded-pill px-3 py-2 me-2 mb-2" title="Delete Order" aria-label="Delete Product" data-bs-toggle="tooltip" data-bs-placement="top" type="button" id="tooltip-top-start" style={{ backgroundColor: "red" }}>
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
    responsive: 'simple',
    selectableRows: 'none',
  };


  function getStatusColor(status) {
    // Define colors for different statuses
    switch (status) {
      case 'Processing':
        return '#007bff'; // Blue for Processing
      case 'Delivered':
        return 'seagreen'; // Teal for Delivered
      default:
        return '#6c757d'; // Gray for other statuses
    }
  }



  useEffect(() => {
    if (errorAdminProduct) {
      enqueueSnackbar(errorAdminProduct, { variant: "error" });
    }

    if (msgAdminProduct) {
      enqueueSnackbar(msgAdminProduct, { variant: "success" })
      navigate('/admin/dashboard/orders')
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }

    return () => {
      dispatch(clearErrorAdminProduct())
    }

  }, [msgAdminProduct, errorAdminProduct, dispatch])

  return (
    <>
      {loadingAdminProduct ? (
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
            <CircularProgress sx={{ color: 'black' }} size={40} thickness={5} />
          </Box>
        </div>
      ) : (
        <MUIDataTable
          title="All Orders"
          data={orders}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default Orders;
