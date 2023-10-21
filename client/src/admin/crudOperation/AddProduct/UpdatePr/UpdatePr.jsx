import React from 'react'

const UpdatePr = () => {
  return (
    <div className='container w-100 h-100 d-flex justify-content-center align-items-center mt-lg-5 flex-column col-12 '>



      <form className='form-control p-0 border border-2 border-primary'>
        <p class="form-title text-center text-md Addtitle p-2">Update Product</p>

        <div className='container p-4 m-2 d-flex flex-column gap-5'>

          <div >
            <label for="formFile" class="form-label">Product Id :</label>
            <input type="number" class="form-control" placeholder='Product Id' onKeyUp={{}} name="id" /><p></p>
          </div>

          <div >
            <label for="formFile" class="form-label">Product Title :</label>
            <input type="text" class="form-control" placeholder='Product Title' name="title" /><p></p>
          </div>

          <div >
            <label for="formFile" class="form-label">Product Description :</label>
            <input class="form-control" type='text' aria-label="With textarea" name='description' placeholder='Description..' /><p></p>
          </div>

          <div>
            <label for="formFile" class="form-label">Product Price :</label>
            <div className='d-flex align-items-center'>
              <span class="input-group-text"> $</span>
              <input type="number" class="form-control" name='price' placeholder='Product Price' />
            </div>
            <p></p>
          </div>

          <div>
            <label for="formFile" class="form-label">Product Image :</label>
            <input class="form-control" name='photo' type='file' /><p></p>
          </div>

          <div>
            <label for="formFile" class="form-label">Choose Category :</label>
            <input as='select' className='form-select' name='category'>
              <option value="">Select Category..</option>
              {/* {
              category.map((category, index) => (
                <option key={index}>{category.name}</option>
              ))
            } */}
            </input>
            <p></p>
          </div>

          <div>
            <label for="formFile" class="form-label">Product Ratings ⭐ :</label>
            <div className='d-flex align-items-center'>
              <span class="input-group-text">⭐</span>
              <input type="number" class="form-control" name='rating' />
            </div>
            <p></p>
          </div>

          <button type="submit" class="btn btn-primary">
            Add Product
          </button>

        </div>


      </form>



    </div>
  )
}

export default UpdatePr

