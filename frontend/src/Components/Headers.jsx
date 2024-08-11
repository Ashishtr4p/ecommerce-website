import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { IonIcon } from '@ionic/react';
import { menu, close } from 'ionicons/icons';
import { FaRegUser } from 'react-icons/fa6';
import { IoCartOutline } from 'react-icons/io5';
import { GoTriangleRight } from 'react-icons/go';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MdOutlineEmail, MdAddCall } from "react-icons/md";
import Logo from './card.png';
import sofaIcon from '../images/icons/sofa.svg';
import terraceIcon from '../images/icons/terrace.svg';
import bedIcon from '../images/icons/bed.svg';
import officeIcon from '../images/icons/office.svg';
import outdoorIcon from '../images/icons/outdoor-cafe.svg';
import mattressIcon from '../images/icons/bed-2.svg';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Retrieve the cart from local storage every 2 seconds
      const storedCart = JSON.parse(localStorage.getItem('cartProducts')) || [];
      setCartCount(storedCart.length);
    }, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run only on mount and unmount

  return (
    <div className=" text-[16px]   h-fit   shadow-md ">
      <header className="bg-white">
        <div className="justify-center items-center py-1 bg-blue-500 text-white md:text-[14px]  text-[12px] flex ">
          <div className="flex">
            <MdOutlineEmail size={17} className="slef-center font-semibold cursor-pointer mt-[3px]" />
            <span className="pl-1 font-semibold slef-center text-justify cursor-pointer">furniture.outlet@ymail.com</span>
          </div>
          <div className="flex ml-5">
            <MdAddCall size={15} className="slef-center font-semibold cursor-pointer mt-[3px]" />
            <a href="tel:+12143308066" className="pl-1 font-semibold  text-justify cursor-pointer">214-330-8066</a>
          </div>
        </div>
        <nav className="flex justify-between items-center w-[92%] mx-auto py-2">
          <a href="/">
            <img className="w-[200px] md:w-[320px]  py-1 cursor-pointer" src={Logo} alt="Logo" />
          </a>
          <div className={`nav-links duration-500 md:static absolute sm:bg-white  md:min-h-fit min-h-[40vh] left-0 ${menuOpen ? 'top-[10.5%] bg-blue-400 z-[20]' : 'top-[-100%]'} md:w-auto w-full flex items-center px-5`}>
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-3">
              <li><a className={` cursor-pointer hover:border-b border-slate-800 uppercase flex ${menuOpen ? 'hover:border-[1px] font-semibold hover:border-white p-2 rounded-xl text-white' : ' hover:text-gray-500  text-[17px] font-semibold text-gray-800  '} `} href="/special">Premier Mattress</a></li>

              <li className="relative group">
                <a className={` cursor-pointer uppercase hover:border-b border-slate-800  flex ${menuOpen ? 'hover:border-[1px] font-semibold hover:border-white p-2 rounded-xl  text-white' : ' hover:text-gray-500 text-[17px] font-semibold text-gray-800 '} `} >
                  Collections
                  <GoTriangleRight size={15} className="self-center" />
                </a>
                <div className="absolute z-[9999]  w-[300px] rounded-lg left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
                  <div className="grid grid-cols-2 gap-4 px-3">
                  <a href="/products/amish" className="flex items-center px-3 py-3 hover:bg-gray-100 transition">
                      <img src={bedIcon} alt="Bed" className="w-5 h-5 object-contain" />
                      <span className="ml-2 text-gray-600 text-sm">Amish</span>
                    </a>
                  
                    <a href="/products/livingroom" className="flex items-center px-3 py-3 hover:bg-gray-100 transition">
                      <img src={officeIcon} alt="Office" className="w-5 h-5 object-contain" />
                      <span className="ml-2 text-gray-600 text-sm">living room</span>
                    </a>
                    <a href="/products/dining" className="flex items-center px-3 py-3 hover:bg-gray-100 transition">
                      <img src={outdoorIcon} alt="Outdoor" className="w-5 h-5 object-contain" />
                      <span className="ml-2 text-gray-600 text-sm">Dining</span>
                    </a>
                    <a href="/products/bedroom" className="flex items-center px-3 py-3 hover:bg-gray-100 transition">
                      <img src={bedIcon} alt="Bed" className="w-5 h-5 object-contain" />
                      <span className="ml-2 text-gray-600 text-sm">Bedroom</span>
                    </a>
                    <a href="/products/mattress" className="flex items-center px-3 py-3 hover:bg-gray-100 transition">
                      <img src={mattressIcon} alt="Mattress" className="w-5 h-5 object-contain" />
                      <span className="ml-2 text-gray-600 text-sm">Mattress</span>
                    </a>
                    <a href="/products/applicances" className="flex items-center px-3 py-3 hover:bg-gray-100 transition">
                      <img src={sofaIcon} alt="Sofa" className="w-5 h-5 object-contain" />
                      <span className="ml-2 text-gray-600 text-sm">Appliances</span>
                    </a>
                    <a href="/products/rustic" className="flex items-center px-3 py-3 hover:bg-gray-100 transition">
                      <img src={terraceIcon} alt="Terrace" className="w-5 h-5 object-contain" />
                      <span className="ml-2 text-gray-600 text-sm">Rustic</span>
                    </a>
                    <a href="/products/youth" className="flex items-center px-3 py-3 hover:bg-gray-100 transition">
                      <img src={terraceIcon} alt="Terrace" className="w-5 h-5 object-contain" />
                      <span className="ml-2 text-gray-600 text-sm">Youth</span>
                    </a>
                    <a href="/products/grill" className="flex items-center px-3 py-3 hover:bg-gray-100 transition">
                    <img src={officeIcon} alt="Office" className="w-5 h-5 object-contain" />
                      <span className="ml-2 text-gray-600 text-sm">Grill</span>
                    </a>
                  </div>
                </div>
              </li>
              <li><a className={` cursor-pointer  hover:border-b border-slate-800 flex ${menuOpen ? 'hover:border-[1px] hover:border-white p-2 font-semibold rounded-xl text-white' : ' hover:text-gray-500  text-[17px] font-semibold text-gray-800  '} `} href="/review">REVIEWS</a></li>
              <li><a className={` cursor-pointer hover:border-b border-slate-800 flex ${menuOpen ? 'hover:border-[1px] hover:border-white p-2 font-semibold rounded-xl text-white' : ' hover:text-gray-500   text-[17px] font-semibold text-gray-800 '} `} href="/about">ABOUT </a></li>
              <li><a className={` cursor-pointer hover:border-b border-slate-800 flex ${menuOpen ? 'hover:border-[1px] hover:border-white p-2 font-semibold rounded-xl text-white' : ' hover:text-gray-500  text-[17px] font-semibold text-gray-800  '} `} href="/contact">CONTACT</a></li>
            </ul>
          </div>
          <div className=" relative flex items-center gap-1 px-1">
            <button onClick={() => { navigate('/account') }} className="bg-[#a6c1ee] text-white px-2 py-2 rounded-full hover:bg-[#87acec]" title="Login">
              <FaRegUser className="md:text-[30px] md:p-1" />
            </button>

            <button onClick={() => { navigate('/cart') }} className="bg-[#a6c1ee] text-white px-2 py-2 rounded-full hover:bg-[#87acec]" title="Cart">
              {/* <span className='absolute top-[-8px] rounded-[100%] bg-slate-400 text-white text-[12px] font-semibold px-1.5 '>{cartCount}</span> */}
              <IoCartOutline className="md:text-[30px] md:p-1" />
            </button>
            <IonIcon icon={menuOpen ? close : menu} className="text-3xl cursor-pointer md:hidden" onClick={toggleMenu} />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default App;
