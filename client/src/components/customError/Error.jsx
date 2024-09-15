import React from 'react'

const Error = () => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center' style={{width: "100%", height: "100vh", zIndex:"999"}}>
        <div>
            <span style={{fontSize:"7rem"}} className='bi bi-database-fill-exclamation text-danger'></span>
        </div>
        <h1 style={{fontSize:"1.8rem"}} className='text-danger'>Server Error !</h1>
    </div>
  )
}

export default Error