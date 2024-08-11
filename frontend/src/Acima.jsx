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
                    <i className="bx bx-chevron-right text-sm text-secondary px-2"></i><a
                        href="/special"
                        className={`transition-all cursor-pointer border-b border-transparent hover:border-blue-700 text-sm text-secondary hover:text-blue-700 `}
                    >
                        Special
                    </a>
                    <i className="bx bx-chevron-right text-sm text-secondary px-2"></i>
                    <p
                        className={`transition-all cursor-pointer border-b border-transparent hover:border-blue-700 text-sm text-secondary hover:text-blue-700 `}
                    >
                        Furniture Store Acima
                    </p>
                </div>

            </div>





            <div className=" text-gray-800 ">
                {/* Get What You Need With Acima Section */}
                <div className="container mx-auto py-8 px-4">
                    <h1 className="text-3xl font-bold text-center mb-4">Get what you need with Acima.</h1>
                    <p className="text-center mb-6">
                        Signature Furniture Outlet has partnered with Acima to offer a flexible, lease-to-own solution that helps you take home the merchandise you need without using credit.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <div className="w-full md:w-1/2">
                            <img src="https://image.email.acimacredit.com/lib/fe5e15707c6200747615/m/3/img_1.png" alt="three people looking into tablet" className="w-full h-auto md:h-[500px]" />
                        </div>
                        <div className="w-full md:w-1/2 space-y-[40px]">
                            <div className="flex items-start space-x-4">
                                <img src="https://image.email.acimacredit.com/lib/fe5e15707c6200747615/m/3/arrow_icon.png" alt="" className="w-12 h-12" />
                                <div>
                                    <strong>Instant Shopping Power</strong>
                                    <p className="hidden md:block">Get approved to lease merchandise with a retail cash price of $300 to $4,000.**</p>
                                    <p className="block md:hidden">Get an instant approval decision that will allow you to lease merchandise with a retailer cash price up to $4,000.**</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <img src="https://image.email.acimacredit.com/lib/fe5e15707c6200747615/m/3/arrow_icon.png" alt="" className="w-12 h-12" />
                                <div>
                                    <strong className="hidden md:block">No Credit Alternative*</strong>
                                    <strong className="block md:hidden">An alternative to Credit</strong>
                                    <p>Shop for what you want without using credit or increasing your debt.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <img src="https://image.email.acimacredit.com/lib/fe5e15707c6200747615/m/3/arrow_icon.png" alt="" className="w-12 h-12" />
                                <div>
                                    <strong>Easy Payment Options</strong>
                                    <p>Make flexible payments that are conveniently scheduled with your payday.</p>
                                </div>
                            </div>
                            <div className="pl-4">
                                <a href="https://shopacima.com/SignatureFurnitureOutlet" target="_blank" className="inline-block bg-orange-500 font-semibold text-lg text-white py-3 px-4 rounded-full hover:bg-orange-700">Apply Now</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* //Get What You Need With Acima Section */}

                {/* Three Basic Requirements */}
                <div className="bg-[#050044] text-white py-8 px-3">
                    <div className="container mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4  py-8">Just a few basic requirements to get approved.</h2>
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            <div className="flex items-center space-x-4  py-8">
                                <img src="https://image.email.acimacredit.com/lib/fe5e15707c6200747615/m/3/tick_icon.png" alt="" className="w-12 h-12" />
                                <p>Active checking account with at least $1,000 of income per month</p>
                            </div>
                            <div className="flex items-center space-x-4  py-8">
                                <img src="https://image.email.acimacredit.com/lib/fe5e15707c6200747615/m/3/tick_icon.png" alt="" className="w-12 h-12" />
                                <p>3 months of income history with your current source of income</p>
                            </div>
                            <div className="flex items-center space-x-4  py-8">
                                <img src="https://image.email.acimacredit.com/lib/fe5e15707c6200747615/m/3/tick_icon.png" alt="" className="w-12 h-12" />
                                <p>Government-issued photo ID and SSN or Taxpayer ID Number</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* //Three Basic Requirements */}

                {/* Cards Section */}
                <div className="bg-gray-200 py-8">
                    <div className="container mx-auto text-center font-semibold">
                        <p className="text-[40px] font-bold mb-6 text-[#050044]">Choose the path to ownership that’s right for you.</p>
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
                                <img src="https://image.email.acimacredit.com/lib/fe5e15707c6200747615/m/3/bank_icon.png" alt="" className="w-20 h-20 mx-auto" />
                                <p className="font-bold mt-4 mb-2 ">Instant Shopping Power</p>
                                <p>You can purchase at any point during the lease for a significant discount. Do so within the first 90 days (3-months in CA) for the biggest savings.</p>
                            </div>
                            <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2 font-semibold">
                                <img src="https://image.email.acimacredit.com/lib/fe5e15707c6200747615/m/3/icon-benifits-agreement_icon.png" alt="" className="w-20 h-20 mx-auto" />
                                <p className="font-bold mt-4 mb-2 ">Complete the Lease</p>
                                <p>After all scheduled payments have been made as detailed in your agreement, the merchandise is yours to keep.</p>
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <a href="https://shopacima.com/SignatureFurnitureOutlet" target="_blank" className="inline-block bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-700">Apply Now</a>
                        </div>
                    </div>
                </div>
                {/* //Cards Section */}

                {/* Faq Section */}
                <div className="bg-white py-8">
                    <div className="container mx-auto">
                        <h3 className="text-center text-lg font-semibold">
                            For further information, please visit <a href="https://www.acima.com/support" target="_blank" className="text-orange-500 hover:underline">Acima’s FAQ</a>.
                        </h3>
                        <p className="mt-4 text-sm font-semibold text-gray-600">
                            *The advertised transaction is a rental purchase agreement (rent-to-own agreement, consumer rental-purchase agreement or a lease/lease-purchase agreement depending on your state) provided by Acima. You will not own the merchandise until the total amount necessary to acquire ownership is paid in full or you exercise your early purchase option. Ownership is optional. Approval subject to review and verification of your application. Not all applicants are approved. Approval amount based on retail price of host retailer. *“Shop without credit” means that this is not a credit, loan, or financing transaction. We consider multiple data points in reviewing your application and regularly approve customers with less than perfect credit history.<br /><br />
                            **"Get approved for up to $4,000” refers to the maximum amount Acima will spend to acquire goods from a retailer to provide to you, subject to a lease purchase transaction. The Acima cash price may include a markup over invoice price. Acquiring ownership by leasing costs more than the retailer’s cash price. See your lease for payment amounts and rental terms.
                        </p>
                    </div>
                </div>
                {/* //Faq Section */}
            </div>
            <div><Footer /> </div>
        </div>
    )
}

export default Charity
