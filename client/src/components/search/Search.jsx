import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import React from 'react'
import "../Home/home.css";
import { useDispatch, useSelector } from 'react-redux';
import "./search.css";
import { Link } from 'react-router-dom';
import { allProducts } from '../../Store/features/productSlice';

const Search = ({setSearchLoading}) => {
    const [keyword, setKeyword] = useState("");
    const [name, setName] = useState([]);
    const [showSearch, setshowSearch] = useState('none');

    const dispatch = useDispatch();

    const { AllPRODUCTS, loading, error } = useSelector((state) => state.app.products.products)

    useEffect(() => {
        setSearchLoading(loading)
        dispatch(allProducts({}));
    }, [dispatch, setSearchLoading, loading]);

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
            setName(AllPRODUCTS && AllPRODUCTS.filter((item) => {
                return item.name.toLowerCase().includes(val)
            }))
            setshowSearch('block')
        }
    }

    return (
        <>
            <form className='input-group searchMenu input-group-lg'  onSubmit={searchHandler}>

                <input type="text" onKeyUp={fetchData} className='form-control searchp p-3' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Products Here...' />
                <div className={`searchOptions p-2 rounded d-${showSearch}`} style={{zIndex:"1000"}} >
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