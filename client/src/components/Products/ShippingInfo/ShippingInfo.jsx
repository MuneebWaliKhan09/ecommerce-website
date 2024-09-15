import React, { useState } from 'react'
import { Country, State, City } from "country-state-city";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shippingInfoAdd } from '../../../Store/features/productSlice';

const ShippingInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pinCode, setPinCode] = useState();
    const [phoneNo, setPhoneNo] = useState();


    const handleSubmit = (e) => {
        e.preventDefault()
        const data = { address, city, state, country, pinCode, phoneNo }
        dispatch(shippingInfoAdd(data));
        navigate('/confirm-order')
    }


    return (
        <>
            <div className="container mt-4">
                <h1 className="mb-4">Step 1: Shipping Information</h1>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Step 1: Shipping Information</h5>
                                <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" id="address" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="country">Country</label>
                                        <select className="form-control" required
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        >
                                            <option value="">Country</option>
                                            {Country && Country.getAllCountries().map((items) => (
                                                <option value={items.isoCode} key={items.isoCode}>
                                                    {items.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {country && (

                                        <div className="form-group col-md-6">
                                            <label htmlFor="state">State</label>

                                            <select className="form-control" required
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                            >
                                                <option value="">State</option>
                                                {State && State.getStatesOfCountry(country).map((st) => (
                                                    <option value={st.isoCode} key={st.isoCode}>
                                                        {st.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    {state && (
                                        <div className="form-group col-md-6">
                                            <label htmlFor="state">City</label>

                                            <select className="form-control" required
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            >
                                                <option value="">City</option>
                                                {City && City.getCitiesOfState(country, state).map((ct) => (
                                                    <option value={ct.name} key={ct.name}>
                                                        {ct.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input onChange={(e) => setPhoneNo(e.target.value)} value={phoneNo} type="number" className="form-control" id="phone" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="postalCode">Pin Code</label>
                                        <input onChange={(e) => setPinCode(e.target.value)} value={pinCode} type="number" className="form-control" id="pinCode" />
                                    </div>
                                    <button type='submit' className='btn btn-primary mt-5 w-100'>
                                        Submit
                                        <span className='cart-text text-white m-2' role='button'><i class="bi bi-arrow-right-circle-fill"></i></span>
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShippingInfo

