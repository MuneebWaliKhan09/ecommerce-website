import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import React from 'react'
import "../Home/home.css";
import { useDispatch, useSelector } from 'react-redux';
import "./search.css";
import { Link } from 'react-router-dom';
import { getProducts } from '../../Store/actions/productActions';

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const [name, setName] = useState([]);
    const [showSearch, setshowSearch] = useState('none');

    const dispatch = useDispatch();

    const { products, loading, error } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getProducts());
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
        const val = e.target.value.replace(/ /g, '').toLowerCase();

        if (val === '') {
            setName([])
            setshowSearch('none')
        }
        else {
            setName(products.filter((item) => {
                return item.name.toLowerCase().includes(val)
            }))
            setshowSearch('block')
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
                <div className={`searchOptions p-2 rounded d-${showSearch}`} >
                    {

                        name.map((items) => (
                            <Link className='text-decoration-none' key={items._id} to={`/product/${items._id}`}>
                                <ul className='d-flex align-items-center pe-3 border border-secondary rounded py-2  justify-content-between  gap-5'>
                                    <li>{items.name}</li>
                                    <img width={50} height={50} src={items.images[0].url} alt="" />
                                </ul>
                            </Link>
                        ))


                    }
                </div>
            </form>


        </>
    )
}

export default Search