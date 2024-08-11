import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Headers from './Components/Headers';
import Footer from './Components/Footer';
import Request from './Components/requestEstimate';
import { useNavigate } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import axios from 'axios';
import 'boxicons/css/boxicons.min.css';
import { TbJewishStar, TbListDetails } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";
import ReactImageMagnify from 'react-image-magnify';

function Charity() {
    const navigate = useNavigate();


    return (
        <div>
            <div><Headers /> </div>

            <div className="md:p-7 md:mx-[5rem] p-2  border-slate-300 mt-3 pt-10 sm:pt-12">
                <div className="flex flex-wrap items-center">
                    <a
                        href="/"
                        className={`transition-all cursor-pointer border-b border-transparent hover:border-blue-700 text-sm text-secondary hover:text-blue-700 `}
                    >
                        Home
                    </a>
                    <i className="bx bx-chevron-right text-sm text-secondary px-2"></i>
                    <a
                        href="/special"
                        className={`transition-all cursor-pointer border-b border-transparent hover:border-blue-700 text-sm text-secondary hover:text-blue-700 `}
                    >
                        Special
                    </a>
                    <i className="bx bx-chevron-right text-sm text-secondary px-2"></i>
                    <p
                        className={`transition-all cursor-pointer border-b border-transparent hover:border-blue-700 text-sm text-secondary hover:text-blue-700 `}
                    >
                        Furniture Store Charity Event
                    </p>
                </div>

            </div>





            <div className="md:p-3 py-5 md:mx-[5rem] rounded-lg  text-center flex-col font-semibold text-2xl text-gray-500  m-3">
                Furniture Store Charity Event
                <div className=" text-slate-800 text-sm text-left mt-4 md:px-7 max-w-[90vw] overflow-x-auto">
                    <div className=" text-gray-500">
                        <div className="max-w-4xl mx-auto p-4">
                            <h1 className="text-2xl font-bold text-center text-gray-900 my-4">Discount Furniture Store Charity Event - Signature Furniture Outlet</h1>
                            <p>
                                <a
                                    rel="nofollow noopener noreferrer"
                                    target="_blank"
                                    href="http://signaturefurnitureoutlet.com/"
                                    className="text-blue-500 hover:underline"
                                >
                                    Signature Furniture Outlet
                                </a>, an Oak Cliff furniture store since 1988, is known for providing quality, affordable home furnishings in the Dallas area for over 28 years. We want to give back to the community and it's why we are donating 5% of total sales to charity for the rest of this 2022 year.
                            </p>
                            <br />
                            <p>Here are examples of charities we will donate to:</p>
                            <ul className="list-disc pl-5 my-2">
                                <li>Shriners Hospital for Children</li>
                                <li>St. Jude Hospital</li>
                                <li>Local charities within the Oak Cliff areas</li>
                            </ul>
                            <br />
                            <p>
                                Whether you purchase a couch, chair, mattress or a complete bedroom set, your purchase of any and all furniture and/or accessories will be given back to local and global communities for these final months. Also, we are providing financial help for aspiring lawyers now in college. The purpose is to show these students that they too have an opportunity to prosper in their country and remain close to their friends and family eliminating the need to migrate to the United States for minimum wage jobs away from their family.
                            </p>
                            <br />
                            <p>
                                Since 1988, Signature Furniture Outlet has serviced the South Dallas, Oak Cliff, and East Dallas areas, supporting the local economy by purchasing all of its inventory from local made in the USA manufacturers. At Signature Furniture, we offer some of the most popular brands such as:
                            </p>
                            <ul className="list-disc pl-5 my-2">
                                <li>Standard Furniture</li>
                                <li>Tempur Pedic Mattress Co.</li>
                                <li>Sealy Mattress Co.</li>
                                <li>Style Line</li>
                                <li>Coaster Furniture</li>
                                <li>Ashley Furniture</li>
                                <li>PFC Furniture</li>
                                <li>Elements Furniture</li>
                                <li>Plus many others offered at discount</li>
                            </ul>
                            <br />
                            <p>
                                At Signature Furniture Outlet, we offer complete bedroom and living room sets, formal{' '}
                                <a
                                    rel="nofollow noopener noreferrer"
                                    target="_blank"
                                    href="http://www.livingroomfurnituredallastx.com/"
                                    className="text-blue-500 hover:underline"
                                >
                                    dining room sets
                                </a>, full living room sets, etc. We also offer accent accessories that will complement your rustic, contemporary, country or traditional decor. Examples of accessories we offer are:
                            </p>
                            <ul className="list-disc pl-5 my-2">
                                <li>Wall Art</li>
                                <li>Lamps</li>
                                <li>Coat Racks</li>
                                <li>Grandfather Clocks</li>
                                <li>Room Dividers</li>
                                <li>Rugs</li>
                                <li>Organizers</li>
                                <li>Ottomans</li>
                                <li>Plus many more.</li>
                            </ul>
                            <br />
                            <p>
                                We at Signature Furniture Outlet understand these times are challenging considering the present economy and it's why we are offering in-house finance options so you can make affordable payments. We also have lease-to-own options if you prefer. We can be found at 3214 Falls Drive in Dallas Texas. You will find affordable furniture for every room. If you have any questions please call us at your convenience at (214) 330-8066, Monday - Saturday 10am-7pm or Sunday 1-5pm. We look forward to hearing from you soon.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div><Footer /> </div>
        </div>
    )
}

export default Charity
