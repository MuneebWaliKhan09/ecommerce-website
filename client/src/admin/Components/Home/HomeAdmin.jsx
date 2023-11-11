import "./home.css"
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { allProducts } from "../../../Store/features/productSlice";
import { Bar } from "react-chartjs-2"
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, Tooltip, Legend, scales } from "chart.js";

ChartJs.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const HomeAdmin = () => {
    const dispatch = useDispatch()
    const [catGredient, setCatGredint] = useState(0)
    const [PrGredent, setPrGredent] = useState(0)


    const { totalProducts, totalCategories, allCategories, AllPRODUCTS } = useSelector((state) => state.app.products.products)



    const datapoints = allCategories && allCategories.length > 0 && allCategories.map((category) => {
        return AllPRODUCTS && AllPRODUCTS.length > 0 && AllPRODUCTS.reduce((acc, item) => {
            if (item.category === category) {
                return acc + 1;
            }
            return acc;
        }, 0);
    });

    const data = {
        labels: allCategories,
        datasets: [
            {
                label: "Products count per category",
                data: datapoints,
                borderWidth: 1,
                backgroundColor: "#6990b9ad"
            },
        ],
    }

    const options = {
        // indexAxis: 'x', // Display bars vertically (y-axis)
        scales: {
            y: {
                beginAtZero: true,
                suggestedMin: 0, // Set the minimum value for the y-axis
                suggestedMax: Math.max(...datapoints), // Set the maximum value for the y-axis
                ticks: {
                    stepSize: 1, // Set the step size to 1 to display integer values
                },
            }
        }
    }

    useEffect(() => {
        dispatch(allProducts({}))
        setPrGredent(totalProducts)
        setCatGredint(totalCategories)

    }, [totalProducts, totalCategories, AllPRODUCTS, allCategories])



    return (
        <>

            <div className="">
                <div className="d-flex align-items-center gap-3 mb-5 mt-3 rounded-3 pt-3 pb-2 ps-3" style={{ backgroundColor: "orange" }}>
                    <h3><i className="bi bi-speedometer2 text-light" style={{ fontSize: "35px" }}></i></h3>
                    <h2 className="text-light">Dash-board Main</h2>
                </div>

                <div className="page-title-actions">

                    <div className="row">
                        <div className="col-md-6 col-xl-4">
                            <div className="card mb-3 widget-content">
                                <div className="widget-content-outer">
                                    <div className="widget-content-wrapper bg1 p-2 pe-3 d-flex align-items-center justify-content-between">
                                        <div className="widget-content-left">
                                            <div className="widget-heading" style={{ fontWeight: "600", fontSize: "23px" }}>Total Orders</div>
                                            <div className="widget-subheading">Last year expenses</div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers  totalOrders" style={{ fontSize: "24px" }}>1896</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-xl-4">
                            <div className="card mb-3 widget-content">
                                <div className="widget-content-outer">
                                    <div className="widget-content-wrapper bg2 p-2 pe-3 d-flex align-items-center justify-content-between">
                                        <div className="widget-content-left">
                                            <div className="widget-heading" style={{ fontWeight: "600", fontSize: "23px" }}>Products Sold</div>
                                            <div className="widget-subheading">Revenue streams</div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers totalOrders" style={{ fontSize: "24px" }}>$3M</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-xl-4">
                            <div className="card mb-3 widget-content">
                                <div className="widget-content-outer">
                                    <div className="widget-content-wrapper bg3 p-2 pe-3 d-flex align-items-center justify-content-between">
                                        <div className="widget-content-left">
                                            <div className="widget-heading" style={{ fontWeight: "600", fontSize: "23px" }}>Followers</div>
                                            <div className="widget-subheading">People Interested</div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers totalOrders" style={{ fontSize: "24px" }}>45,9%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="widget-content-left fsize-1">
                            <div className="text-muted opacity-6">Income Target</div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="card-shadow-success mb-3 widget-chart widget-chart2 text-left card">
                                <div className="widget-content">
                                    <div className="widget-content-outer p-2 bg4">
                                        <div className="widget-content-wrapper ">
                                            <div className="widget-content-left pr-2 fsize-1">
                                                <div className="widget-numbers mt-0 fsize-3 " style={{ fontSize: "24px" }}>54%</div>
                                            </div>
                                            <div className="widget-content-right w-100">
                                                <div className="progress-bar-xs progress">
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        aria-valuenow="54"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                        style={{ width: '54%' }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="widget-content-left fsize-1 ">
                                            <div className="opacity-6" style={{ fontWeight: "600" }}>Expenses Target</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="card-shadow-warning mb-3 widget-chart widget-chart2 text-left card">
                                <div className="widget-content">
                                    <div className="widget-content-outer p-2 bg5">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left pr-2 fsize-1">
                                                <div className="widget-numbers mt-0 fsize-3 " style={{ fontSize: "24px" }}>32%</div>
                                            </div>
                                            <div className="widget-content-right w-100">
                                                <div className="progress-bar-xs progress">
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        aria-valuenow="32"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                        style={{ width: '32%' }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="widget-content-left fsize-1">
                                            <div className=" opacity-6" style={{ fontWeight: "600" }}>Spendings Target</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="card-shadow-info mb-3 widget-chart widget-chart2 text-left card">
                                <div className="widget-content">
                                    <div className="widget-content-outer p-2 bg6">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left pr-2 fsize-1">
                                                <div className="widget-numbers mt-0 fsize-3 " style={{ fontSize: "24px" }}>89%</div>
                                            </div>
                                            <div className="widget-content-right w-100">
                                                <div className="progress-bar-xs progress">
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        aria-valuenow="89"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                        style={{ width: '89%' }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="widget-content-left fsize-1">
                                            <div className=" opacity-6" style={{ fontWeight: "600" }}>Totals Target</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                <div>
                    <h2 className="pt-3 mb-5 text-danger  p-3 text-light rounded-3" style={{ backgroundColor: "#315aa3" }}>Products and Categories Details : </h2>

                    <div className="set-size circular charts-container flex-wrap d-flex justify-content-center align-items-center" style={{ gap: "40px" }}>




                        <div className="container p-1 pt-2 pb-2  ps-0 pe-0 " style={{ width: "300px" }}>
                            <div className="circular-progress" style={{ background: `conic-gradient(#7d2ae8 ${(PrGredent / 100) * 360}deg, #ededed 0deg)` }}>
                                <span className={`progress-value text-primary`}>{PrGredent}</span>
                            </div>
                            <span className="text text-dark">Total Products</span>
                        </div>


                        <div className="container p-1 pt-2 pb-2  ps-0 pe-0 " style={{ width: "300px" }}>
                            <div className="circular-progress" style={{ background: `conic-gradient(#7d2ae8 ${(catGredient / 100) * 360}deg, #ededed 0deg)` }}>
                                <span className={`progress-value text-primary`}>{catGredient}</span>
                            </div>
                            <span className="text text-dark">Total Categories</span>
                        </div>




                    </div>

                </div>
                <br /><br /><br />


                <h2 className="pt-3 mb-5 text-danger  p-3 text-light rounded-3" style={{ backgroundColor: "#7a488b" }}>Products in each Category : </h2>


                <div className="max-w-100 w-100">


                    {/* user bar chart here */}
                    <div className="chart-container">
                        <Bar data={data} options={options} />
                    </div>

                </div>







            </div>

        </>


    );
};

export default HomeAdmin







