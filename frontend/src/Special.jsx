import React, { useState, useEffect } from "react";
import Headers from './Components/Headers';
import Footer from './Components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { TbJewishStar, TbListDetails } from "react-icons/tb";
import { FaStar } from "react-icons/fa";


function Special() {
  const navigate = useNavigate();
  return (
    <div >
      <div>
        <Headers
        />
      </div>
      <div className="bg-cover bg-no-repeat bg-center  " style={{ backgroundImage: `url(${require('./Components/home1.png')})` }}>
        <div className="flex flex-col items-center justify-center mx-auto bg-black bg-opacity-50 py-20" >
          <p className="text-3xl text-white font-medium sm:mb-4  uppercase">
          Premier Mattress
          </p>
          <div className="">
            <a href="#" className="bg-primary   text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary">Wide variety of styles</a>
          </div>
        </div>
      </div>
      <div className="flex justify-center item-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:p-3 my-5 mx-auto  w-full rounded-lg shadow-md text-center flex justify-center items-center  font-semibold text-2xl text-gray-500 border border-slate-300 mt-3 p-2 m-3 h-[200px]">
            <a href="/charityevent" className="py-5">Furniture Store Charity Event</a>
          </div>
          <div className="md:p-3 my-5 mx-auto w-full rounded-lg shadow-md text-center flex justify-center items-center font-semibold text-2xl text-gray-500 border border-slate-300 mt-3 p-2 m-3">
            <a href="/acima" className="py-5">Acima</a>
          </div>
          <div className="md:p-3 my-5 mx-auto w-full rounded-lg shadow-md text-center flex justify-center items-center font-semibold text-2xl text-gray-500 border border-slate-300 mt-3 p-2 m-3">
           <a href="/goldenelegant" className="py-5"> Golden Elegant</a>
          </div>
        </div>

      </div>
      <div><Footer /> </div>
    </div >
  )
}

export default Special
