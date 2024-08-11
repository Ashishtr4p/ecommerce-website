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
import toast, { Toaster } from 'react-hot-toast';
import { FaHeart } from "react-icons/fa";

function Productdetail() {
    const navigate = useNavigate();
    const { id, pid } = useParams();
    const [imageData, setImageData] = useState([]);
    const [loading, setloading] = useState(true);
    const [data1, setdata1] = useState([]);
    const [data2, setdata2] = useState([]);
    const [cartProducts, setCartProducts] = useState(() => {
        const savedCart = localStorage.getItem('cartProducts');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [UserData, setUserData] = useState(() => {
        const savedCart = localStorage.getItem('userinfo');
        return savedCart ? JSON.parse(savedCart) : null;
    });
    const [isModalOpen, setModalOpen] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             let FormData = {
    //                 idd: pid,
    //                 Type: id
    //             }



    //             const imageDataResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/fetchimage/id`, FormData);

    //             setImageData(imageDataResponse.data.data1);
    //             setTotalPrice(Number(imageDataResponse.data.data1?.Price));
    //             setdata1(imageDataResponse.data.data2);
    //             setdata2(imageDataResponse.data.data3);

    //         } catch (error) {
    //             console.error(error);
    //         } finally {
    //         }
    //     };

    //     fetchData();
    // }, [pid, id]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let formData = {
                    idd: pid,
                    Type: id
                };

                const imageDataResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/fetchimage/id`, formData);

                const image = imageDataResponse.data.data1;
                setImageData(image);
                setTotalPrice(Number(image?.Price));

                const items = imageDataResponse.data.data2;
                setdata1(items);

                setdata2(imageDataResponse.data.data3);

                // Automatically select items that match imageData.id
                const defaultSelectedItems = items.filter(item => item.id === image.id);
                setSelectedItems(defaultSelectedItems);
                setTotalPrice(Number(image?.Price));
                setloading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [pid, id]);

    const handlepropertyselect = (id, pid) => {
        navigate(`/products/${id}/${pid}`);
        window.scrollTo(0, 0);
    }
    const handleAddToCart = async(newProduct) => {
        const existingProduct = cartProducts.find(product => product.id === newProduct.id);

        if (existingProduct) {
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
        setModalOpen(true);
    }
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();

    const handleCheckboxChange = (item, checked) => {
        if (checked) {
            setSelectedItems([...selectedItems, item]);
            setTotalPrice(totalPrice + Number(item.Price));
        } else {
            setSelectedItems(selectedItems.filter(i => i.id !== item.id));
            setTotalPrice(totalPrice - Number(item.Price));
        }
    };
    const handleAddToCartSelectedItem = async(newProducts) => {
        const updatedCartProducts = [...cartProducts];

        newProducts.forEach(newProduct => {
            const existingProduct = updatedCartProducts.find(product => product.id === newProduct.id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                updatedCartProducts.push({ ...newProduct, quantity: 1 });
            }
        });

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
    };
    // if (loading) {
    //     return (
    //         <div className=" inset-0 flex items-center justify-center  pointer-events-auto">
    //             <div className="w-full h-full items-center flex justify-center animate-spin">
    //                 <BiLoader size={30} />
    //             </div>
    //         </div>
    //     );
    // }
    
    const handleAddToWishlist = async (productid) => {
        if (localStorage.getItem('userinfo')) {
            const formdata = {
                userid: UserData?.id,
                Pid: productid,
            }
            await axios.post(`${process.env.REACT_APP_API_URL}/api/addtowishlist`, formdata)
                .then((res) => {
                    if (res?.data?.data1 === 'Product added to wishlist') {
                        toast.success(res?.data?.data1);
                    } else {
                        toast.error(res?.data?.data1);
                    }

                })
                .catch(err => console.log(err));
        } else {
            toast.error('Please login to use this feature')
        }
    }
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
                        href={`/products/${id}`}
                        className={`transition-all cursor-pointer border-b border-transparent hover:border-blue-700 text-sm text-secondary hover:text-blue-700 `}
                    >
                        {id}
                    </a>
                    <i className="bx bx-chevron-right text-sm text-secondary px-2"></i>
                    <p
                        className={`transition-all cursor-pointer border-b border-transparent hover:border-blue-700 text-sm text-secondary hover:text-blue-700 `}
                    >
                        {imageData?.Title}
                    </p>
                </div>
                <div class="  p-3 mt-5">
                    {/* <button
                        className="mb-2 px-4  text-slate-900 rounded-md hover:bg-blue-500  hover:text-white focus:outline-none focus:ring focus:ring-green-400"
                        onClick={() => {
                            window.history.back();
                            window.scrollTo(0, 0);
                        }}
                    >
                        Go Back
                    </button> */}
                    <div className="md:grid md:grid-cols-2 gap-10">
                        <div>
                            <div className="img-box-a">
                                <img src={require('./Components/photo/' + pid + '.png')} alt="ImageData" className="w-full max-h-[400px] md:max-h-[600px] rounded-lg shadow-md" title={imageData.Image_Title} />
                            </div>
                            {/* <ReactImageMagnify {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: imageData?.Image_Src,
                                    height: 600
                                },
                                largeImage: {
                                    src: imageData?.Image_Src,
                                    width: 1200,
                                    height: 1800
                                },
                                isHintEnabled: true
                            }} /> */}
                        </div>
                        <div className="pt-4">
                            <div className="min-w-0 lg:col-span-3 md:mt-2 space-y-3">
                                <div className="justify-between flex">
                                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                        <span className="capitalize">Model</span>:<span>{imageData.SKU}</span>
                                    </div>
                                    <p
                                        onClick={() => {
                                            handleAddToWishlist(imageData?.id);
                                        }}
                                        className="text-red-500 text-lg w-9 h-8 rounded-full hover:bg-red-500 hover:text-white flex items-center justify-center  transition"
                                        title="add to wishlist"
                                    >
                                        <FaHeart />
                                    </p>
                                </div>
                                <div>
                                    <h1 className="!text-3xl !text-left uppercase font-semibold">{imageData.Title}</h1>
                                </div>

                                {imageData.Price === 0 && (
                                    <div className="flex items-baseline mb-1 space-x-2 mt-4 text-lg">
                                        <p className="text-xl text-red-500 font-semibold">Price Not available</p>
                                    </div>
                                )}
                                {imageData.Price > 0 && (
                                    <div className="mt-4 text-lg text-gray-500 ">
                                        <span className="text-xl text-red-600 line-through px-3">${imageData.RealPrice?.toFixed(2)}</span>
                                        <span className="font-semibold text-slate-600 text-2xl">${totalPrice?.toFixed(2)} </span>
                                    </div>
                                )}
                                <div>
                                    <div className="hidden md:block mb-1 font-semibold text-sm gap-2 text-gray-500 border-t border-b border-slate-400 p-3 w-fit max-w-[100%] overflow-x-auto">
                                        Manufactured by: <span className="font-bold text-gray-600 pl-3">{imageData.Brand}</span>
                                        <br />
                                        This product was added to our catalog on <span className="font-bold text-gray-600 pl-3">{imageData.Date}</span>
                                    </div>
                                </div>

                                <ul className="flex flex-col m-0 p-0 text-sm">
                                    {data1.length > 1 && (
                                        <div>
                                            <h1 className=" !text-left uppercase font-semibold">{imageData?.Type}</h1>
                                        </div>
                                    )}
                                    {data1.length > 1 && data1.map((item) => (
                                        <li key={item.id}>
                                            <label className="md:p-2 lg:p-2 p-1 flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                                                    onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                                                />
                                                <span className="ml-2">{item.Category}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    disabled={selectedItems.length > 0 ? false : true}
                                    onClick={() => handleAddToCartSelectedItem(selectedItems)}
                                    className="py-3 px-4 text-xl space-x-2 flex item-center justify-center self-center hover:bg-blue-700 text-white bg-blue-500 disabled:bg-gray-400 rounded-md ">
                                    <IoCartOutline size={27} className="mr-2" />  ADD TO CART
                                </button>
                                

                            </div>
                        </div>
                    </div>


                </div>

            </div>





            <div className="md:p-3 py-5 md:mx-[5rem] rounded-lg shadow-md text-center flex-col font-semibold text-2xl text-gray-500 border border-slate-300 mt-3 p-2 m-3">
                Specifications
                <div dangerouslySetInnerHTML={{ __html: imageData.Description }} className=" text-slate-800 text-sm text-left mt-4 md:px-7 max-w-[90vw] overflow-x-auto"></div>
            </div>

            <div className="md:p-7 md:mx-[5rem] p-2 text-center font-semibold text-xl text-gray-500 border-slate-300 mt-3 pt-10 sm:pt-7">
                Similar Products
            </div>
            <div className=" p-5 flex  item-center justify-center">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {data2.map((product) => (
                        <div key={product.SKU} className="bg-white  rounded-lg overflow-hidden group shadow-xl ease-in duration-150 hover:scale-110">
                            <div className="relative">
                                {/* <img src={require('./images/products/' + product + '.jpg')} alt={`product ${index + 1}`} className="w-full" /> */}
                                <img src={require('./Components/photo/' + product?.id + '.png')} alt={product.Brand} className=" md:h-[25vh]  w-full h-[220px]" />
                                {product.Price !== product.RealPrice && (
                                    <div className="absolute top-0 left-0 rotate-[-30deg] ">
                                        <FaStar className='text-red-700 h-[85px] w-[85px] ' />
                                    </div>
                                )}
                                {product.Price !== product.RealPrice && (
                                    <div className="absolute top-7 left-7 z-[9] flex items-center justify-center rotate-[-30deg]">
                                        <span className="text-white text-[12px] text-center font-semibold">
                                            <span className="font-semibold">Sale</span>
                                            <br />
                                            {`- ${Math.round(((Number(product.RealPrice) - Number(product.Price)) / Number(product.RealPrice)) * 100)}%`}
                                        </span>
                                    </div>
                                )}



                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <a href={`/products/${id}/${product?.id}`} className="text-white text-lg w-9 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-gray-800 transition" title="view product">
                                        <TbListDetails />
                                    </a>
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
                                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">{product.Title}</h4>
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
                                            <span key={starIndex}><FaStar /></span>
                                        ))}
                                    </div>
                                    <div className="text-xs text-gray-500 ml-3">(150)</div>
                                </div>
                                {/* <div dangerouslySetInnerHTML={{ __html: product.Description }}></div> */}
                            </div>
                            <div
                                onClick={() => { handleAddToCart(product); }}
                                className="block w-full py-1 cursor-pointer text-center text-black font-medium   border border-primary rounded-b hover:bg-blue-500 hover:text-white transition"
                            >Add to cart</div>
                        </div>

                    ))}
                </div>
            </div>








            <div className="md:px-[5rem] px-5"><Request /> </div>
            <div><Footer /> </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-[010] flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                    <div className="relative p-4 w-fit max-w-md ">
                        <div className="relative bg-green-300 rounded-lg shadow w-fit">
                            <button
                                type="button"
                                onClick={() => { setModalOpen(false); }}
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

                                <h3 className="mt-5 mb-2 text-lg font-semibold  text-green-700 dark:text-green-700">
                                    Successfully added Product(s) to the cart ..
                                </h3>
                                <button
                                    onClick={() => { setModalOpen(false); }}
                                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                >
                                    Continue Shopping
                                </button>
                                <button
                                    onClick={() => { navigate('/cart'); }}
                                    className="text-white bg-blue-600 hover:bg-blue-800 ml-4 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                >
                                    Move to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Toaster />
        </div>
    )
}

export default Productdetail
