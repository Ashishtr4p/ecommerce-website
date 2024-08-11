import React, { useState, useEffect } from "react";
import Headers from './Components/Headers';
import Footer from './Components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { TbJewishStar, TbListDetails } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import SelectOptions from "./Components/SelectOption";
import FilterComponent from './Components/FilterComponent';
import { IonIcon } from '@ionic/react';
import { menu, close } from 'ionicons/icons';
import toast, { Toaster } from 'react-hot-toast';
import RequestEstimate from './Components/requestEstimate';

function Productlist() {

  const { id } = useParams();
  const [imageData, setImageData] = useState([]);
  const [uniquebrand, setUniqueBrand] = useState([]);
  const [uniquewidth, setUniqueWidth] = useState([]);
  const [uniqueFiberType, setUniqueFiberType] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({
    Types: id,
    SubType: null,
    Brand: null,
    Price: { min: 0, max: 10000 },
  });
  const [filterModal, setfilterModal] = useState(false);
  const [Sortselected, setSortselected] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);
  const itemsPerPage = 12;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const calculateDiscount = (item) => {
    return ((item.RealPrice - item.Price) / item.RealPrice) * 100;
  };
  const [UserData, setUserData] = useState(() => {
    const savedCart = localStorage.getItem('userinfo');
    return savedCart ? JSON.parse(savedCart) : null;
  });
  const sortData = (data, sortOption) => {
    switch (sortOption) {
      case 'Discount':
        return [...data].sort((a, b) => calculateDiscount(b) - calculateDiscount(a));
      case 'h-l':
        return [...data].sort((a, b) => b.Price - a.Price);
      case 'l-h':
        return [...data].sort((a, b) => a.Price - b.Price);
      case 'acc':
        return [...data].sort((a, b) => {
          const nameA = a.Category !== null ? a.Category : a.Title;
          const nameB = b.Category !== null ? b.Category : b.Title;
          return nameA.localeCompare(nameB);
        });
      case 'dec':
        return [...data].sort((a, b) => {
          const nameA = a.Category !== null ? a.Category : a.Title;
          const nameB = b.Category !== null ? b.Category : b.Title;
          return nameB.localeCompare(nameA);
        });
      default:
        return data;
    }
  };

  const sortedData = sortData(imageData, Sortselected);
  const pageData = sortedData.slice(startIndex, endIndex);
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState(() => {
    const savedCart = localStorage.getItem('cartProducts');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [priceMin, setPriceMin] = useState(200);
  const [priceMax, setPriceMax] = useState(400);

  const onPriceChange = (values) => {
    setPriceMin(values[0]);
    setPriceMax(values[1]);
  };

  const MenuOption = [
    { label: 'Discount', value: 'Discount' },
    { label: 'Price- high to low', value: 'h-l' },
    { label: 'Price- low to high', value: 'l-h' },
    { label: 'A TO Z', value: 'acc' },
    { label: 'Z TO A', value: 'dec' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formdata = { idd: id };
        const imageDataResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/fetchimage`, formdata);
        setImageData(imageDataResponse.data.data1);
        setUniqueBrand(imageDataResponse.data.data2);
        setUniqueWidth(imageDataResponse.data.data3);
        setUniqueFiberType(imageDataResponse.data.data4);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handlePropertySelect = (id, category) => {
    navigate(`/products/${category}/${id}`);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(imageData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1 < totalPages ? currentPage + 1 : totalPages - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage > 0 ? currentPage - 1 : 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = currentPage; i < totalPages && i < currentPage + 4; i++) {
      buttons.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''} p-2`}>
          <button
            type="button"
            className={`btn ${currentPage === i ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handlePageClick(i)}
          >
            {i + 1}
          </button>
        </li>
      );
    }
    return buttons;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageDataResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/fetchimage/similarimage`, formData);
      setImageData(imageDataResponse.data.data1);
      setUniqueBrand(imageDataResponse.data.data2);
      setUniqueWidth(imageDataResponse.data.data3);
      onCloseMenu();
      setfilterModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setFormData({
      Types: id,
      SubType: null,
      Brand: null,
      Price: { min: 0, max: 10000 },
    });
  };

  const onToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const onCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleAddToCart = async(newProduct) => {
    const existingProduct = cartProducts.find(product => product.id === newProduct.id);

    if (existingProduct) {
      // If the product exists, update its quantity
      const updatedCartProducts = cartProducts.map(product =>
        product.id === newProduct.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setCartProducts(updatedCartProducts);
      localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
      if(localStorage.getItem('userinfo')){
        const formdata = {
          userid: UserData?.id,
          products: updatedCartProducts
        }
        await axios.post(`${process.env.REACT_APP_API_URL}/api/updateCart`, formdata)
          .then((res) => {
            if(res?.data?.data1 === 'Cart updated successfully') { 
              // toast.success(res?.data?.data1);
              setModalOpen(true);
            } else {
              toast.error(res?.data?.data1);
            }
            
          })
          .catch(err => console.log(err));
      } else {
        setModalOpen(true);
      }
    } else {
      // If the product does not exist, add it to the cart
      const updatedCartProducts = [...cartProducts, { ...newProduct, quantity: 1 }];
      setCartProducts(updatedCartProducts);
      localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
      if(localStorage.getItem('userinfo')){
        const formdata = {
          userid: UserData?.id,
          products: updatedCartProducts
        }
        await axios.post(`${process.env.REACT_APP_API_URL}/api/updateCart`, formdata)
          .then((res) => {
            if(res?.data?.data1 === 'Cart updated successfully') { 
              // toast.success(res?.data?.data1);
              setModalOpen(true);
            } else {
              toast.error(res?.data?.data1);
            }
            
          })
          .catch(err => console.log(err));
      } else {
        setModalOpen(true);
      }
    }
  }
  
  const handleAddToWishlist = async (productid) => {
    if(localStorage.getItem('userinfo')){
      const formdata = {
        userid: UserData?.id,
        Pid: productid,
      }
      await axios.post(`${process.env.REACT_APP_API_URL}/api/addtowishlist`, formdata)
        .then((res) => {
          if(res?.data?.data1 === 'Product added to wishlist') { 
            toast.success(res?.data?.data1);
          } else {
            toast.error(res?.data?.data1);
          }
          
        })
        .catch(err => console.log(err));
    } else{
      toast.error('Please login to use this feature')
    }
  }

  return (
    <div className="">
      <Headers />
      <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${require('./Components/home1.png')})` }}>
        <div className="flex flex-col items-center justify-center mx-auto bg-black bg-opacity-50 py-20">
          <p className="text-3xl text-white font-medium sm:mb-4 uppercases capitalize">
            {id}
          </p>
          <div className="">
            <a href="#" className="bg-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary">
              View Our Section
            </a>
          </div>
        </div>
      </div>
      <section className="py-10 relative">
        <div className="w-full md:max-w-[95%] mx-auto px-4 md:px-8">
          <div className="flex  justify-between w-full">
            <ul className=" hidden lg:block">
              <li className="flex items-center cursor-pointer outline-none group">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="stroke-indigo-600 transition-all duration-500 group-hover:stroke-indigo-600"
                    d="M19.7778 9.33333V9.33333C19.7778 8.09337 19.7778 7.47339 19.6415 6.96472C19.2716 5.58436 18.1934 4.50616 16.8131 4.1363C16.3044 4 15.6844 4 14.4444 4C12.963 4 11.4815 4 10 4C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12V12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20C11.3333 20 12.6667 20 14 20C15.6554 20 16.4831 20 17.1459 19.7588C18.2569 19.3544 19.1322 18.4791 19.5365 17.3681C19.7778 16.7053 19.7778 15.8776 19.7778 14.2222V14.2222M16.6667 14.2222H20.2222C21.2041 14.2222 22 13.4263 22 12.4444V11.1111C22 10.1293 21.2041 9.33333 20.2222 9.33333H16.6667C15.6848 9.33333 14.8889 10.1293 14.8889 11.1111V12.4444C14.8889 13.4263 15.6848 14.2222 16.6667 14.2222Z"
                    stroke="#4F46E5"
                    strokeWidth="1.5"
                  />
                </svg>
                <span className="font-normal text-lg leading-8 text-indigo-600 ml-2 mr-3 transition-all duration-500 group-hover:text-indigo-600">
                  Products From Signature Furniture 
                </span>
              </li>

            </ul>
            <IonIcon icon={filterModal ? close : menu} onClick={() => { setfilterModal(!filterModal); }} className="text-3xl text-slate-800 cursor-pointer  lg:hidden" />
            <div className="relative w-[200px] ">
              <svg
                className="absolute top-1/2 -translate-y-1/2 left-4 z-[1]"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5555 3.33203H3.44463C2.46273 3.33203 1.66675 4.12802 1.66675 5.10991C1.66675 5.56785 1.84345 6.00813 2.16004 6.33901L6.83697 11.2271C6.97021 11.3664 7.03684 11.436 7.0974 11.5068C7.57207 12.062 7.85127 12.7576 7.89207 13.4869C7.89728 13.5799 7.89728 13.6763 7.89728 13.869V16.251C7.89728 17.6854 9.30176 18.6988 10.663 18.2466C11.5227 17.961 12.1029 17.157 12.1029 16.251V14.2772C12.1029 13.6825 12.1029 13.3852 12.1523 13.1015C12.2323 12.6415 12.4081 12.2035 12.6683 11.8158C12.8287 11.5767 13.0342 11.3619 13.4454 10.9322L17.8401 6.33901C18.1567 6.00813 18.3334 5.56785 18.3334 5.10991C18.3334 4.12802 17.5374 3.33203 16.5555 3.33203Z"
                  stroke="black"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <select
                id="Offer"
                className="h-12 border border-gray-300 text-gray-900 pl-11 text-base font-normal leading-7 rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
                onChange={(e) => setSortselected(e.target.value)}
              >
                {MenuOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <svg
                className="absolute top-1/2 -translate-y-1/2 right-4 z-[1]"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
                  stroke="#111827"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <svg
            className="my-7 w-full"
            xmlns="http://www.w3.org/2000/svg"
            width="1216"
            height="2"
            viewBox="0 0 1216 2"
            fill="none"
          >
            <path d="M0 1H1216" stroke="#E5E7EB" />
          </svg>
          <div className="grid lg:grid-cols-[25%_75%]  grid-cols-1">
                      <div className=" hidden lg:block">
                          <FilterComponent
                              uniqueBrand={uniquebrand}
                              uniqueWidth={uniquewidth}
                              formData={formData}
                              setFormData={setFormData}
                              handleSubmit={handleSubmit}
                              id={id}
                              setSortselected={setSortselected}
                              MenuOption={MenuOption}
                          />
                      </div>
            
            <div className="w-[100%] md:px-5">
              {pageData?.length === 0 && (
                <div className="container uppercase text-lg font-normal text-gray-500 lg:text-xl md:mx-auto w-full text-center px-2 py-3">
                  No Product found
                </div>
              )}
              {pageData?.length > 0 && (
                <div className="container md:mx-auto px-2 py-3">
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 lg:gap-8 gap-4">
                    {pageData?.map((product, index) => (
                      <div
                        key={product.SKU}
                        className="bg-white rounded-lg overflow-hidden group shadow-xl ease-in duration-150 hover:scale-110"
                      >
                        <div className="relative">
                          <img
                            src={require('./Components/photo/' + product?.id + '.png')}
                            alt={product.Brand}
                            className="md:h-[25vh] w-full h-[220px]"
                          />
                          {product.Price !== product.RealPrice && (
                            <div className="absolute top-0 left-0 rotate-[-30deg]">
                              <FaStar className="text-red-700 h-[85px] w-[85px]" />
                            </div>
                          )}
                          {product.Price !== product.RealPrice && (
                            <div className="absolute top-7 left-7 z-[9] flex items-center justify-center rotate-[-30deg]">
                              <span className="text-white text-[12px] text-center font-semibold">
                                <span className="font-semibold">Sale</span>
                                <br />
                                {`- ${Math.round(
                                  ((Number(product.RealPrice) - Number(product.Price)) / Number(product.RealPrice)) *
                                    100
                                )}%`}
                              </span>
                            </div>
                          )}

                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            <a
                              href={`/products/${id}/${product?.id}`}
                              className="text-white text-lg w-9 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-gray-800 transition"
                              title="view product"
                            >
                              <TbListDetails />
                            </a>
                            {/* <a
                              href="#"
                              className="text-white text-lg w-9 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-gray-800 transition"
                              title="add to wishlist"
                            >
                              <TbJewishStar />
                            </a> */}
                            <p
                              onClick={() => {
                                handleAddToWishlist(product?.id);
                              }}
                              className="text-white text-lg w-9 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-gray-800 transition"
                              title="add to wishlist"
                            >
                              <TbJewishStar />
                            </p>
                          </div>
                        </div>
                        <div className="pt-4 pb-3 px-4">
                          <a href={`/products/${id}/${product?.id}`}>
                            <h4 className="uppercase font-medium text-[14px] mb-2 text-gray-800 hover:text-primary transition">
                              {product.Title}
                            </h4>
                          </a>
                          {product.Price === 0 && (
                            <div className="flex items-baseline mb-1 space-x-2">
                              <p className="text-xl text-red-500 font-semibold">Price Not available</p>
                            </div>
                          )}
                          {product.Price > 0 && (
                            <div className="flex items-baseline mb-1 space-x-2">
                              <p className="text-xl text-primary font-semibold">${product.Price}</p>
                              <p className="text-sm text-gray-400 line-through">${product.RealPrice}</p>
                            </div>
                          )}
                          <div className="flex items-center">
                            <div className="flex gap-1 text-sm text-yellow-400">
                              {[...Array(5)].map((_, starIndex) => (
                                <span key={starIndex}>
                                  <FaStar />
                                </span>
                              ))}
                            </div>
                            <div className="text-xs text-gray-500 ml-3">(150)</div>
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            handleAddToCart(product);
                          }}
                          className="block relative
                           bottom-0 w-full py-1 cursor-pointer text-center text-black font-medium border border-primary rounded-b hover:bg-blue-500 hover:text-white transition"
                        >
                          Add to cart
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {pageData?.length > 0 && (
                <div className="flex justify-center">
                  <nav className="pagination-a">
                    <ul className="pagination justify-content-center flex">
                      <li className="page-item p-2">
                        <button
                          type="button"
                          className="btn ml-2 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-xl"
                          onClick={handlePrevPage}
                        >
                          &laquo; Previous
                        </button>
                      </li>
                      {renderPaginationButtons()}
                      <li className="page-item p-2">
                        <button
                          type="button"
                          className="btn ml-2 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-xl"
                          onClick={handleNextPage}
                        >
                          Next &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {isModalOpen && (
        <div className="fixed inset-0 z-[010] flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-fit max-w-md ">
            <div className="relative bg-green-300 rounded-lg shadow w-fit">
              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                }}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h3 className="mt-5 mb-2 text-lg font-semibold text-green-700 dark:text-green-700">
                  Successfully added Product(s) to the cart ..
                </h3>
                <button
                  onClick={() => {
                    setModalOpen(false);
                  }}
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    navigate('/cart');
                  }}
                  className="text-white bg-blue-600 hover:bg-blue-800 ml-4 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Move to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {filterModal && (
              <div className="fixed inset-0 z-[010] flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                  <FilterComponent
                      uniqueBrand={uniquebrand}
                      uniqueWidth={uniquewidth}
                      formData={formData}
                      setFormData={setFormData}
                      handleSubmit={handleSubmit}
                      id={id}
                      setSortselected={setSortselected}
                      MenuOption={MenuOption}
                      setfilterModal={setfilterModal}
                      Type="modal"
                  />
              </div>
      )}
      <Toaster />
    </div>
  );
}

export default Productlist;
