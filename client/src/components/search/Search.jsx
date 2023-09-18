import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import React from 'react'
import "../Home/home.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Store/productSlice';
import "./search.css";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const [name, setName] = useState([]);
    const [showSearch, setshowSearch] = useState('none');

    const dispatch = useDispatch();

    const { products, loading, error } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    }

    const fetchData = (e) => {
        const val = e.target.value.replace(/ /g, '');

        for (var product of products.products) {
            if (product.name.includes(val)) {
                setName(product.name);
                setshowSearch('block');
            }
            else{
                setName("");
                setshowSearch('');
            }
        }
    }


    return (
        <>
            <form className='input-group searchMenu input-group-lg' onSubmit={searchHandler}>
                {/* <div className='input-group catDrop' style={{ width: 190 }}>
                <select className='form-select'>
                  <option value="">All</option>
    
                </select>
              </div> */}

                <input type="text" onKeyUp={fetchData} className='form-control search' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Products Here...' />
                <button type='submit' className='btn btn-warning text-light searchBtn'>
                    Search
                    <span className='bi bi-chevron-right'></span>
                </button>
                <div className={`searchOptions rounded d-${showSearch}`} >

                </div>
            </form>


        </>
    )
}

export default Search