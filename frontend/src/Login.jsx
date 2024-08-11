import React, { useState, useEffect } from "react";
import Headers from './Components/Headers';
import Footer from './Components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { TbJewishStar, TbListDetails } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import 'tailwindcss/tailwind.css';
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";

function LOGIN() {
    const navigate = useNavigate();
    const [Login, setLogin] = useState(true);
    const [Signup, setSignup] = useState(false);
    const [fullName, setfullName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Cpassword, setCpassword] = useState('');
    const [IsEmailNotValid, setIsEmailNotValid] = useState(false);
    const [Wishlist, setWishlist] = useState([]);
    const [cartProducts, setCartProducts] = useState(() => {
        const savedCart = localStorage.getItem('cartProducts');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [UserData, setUserData] = useState(() => {
        const savedCart = localStorage.getItem('userinfo');
        return savedCart ? JSON.parse(savedCart) : null;
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const handleSubmitSignup = async () => {
        if (fullName.length < 3) {
            toast.error('Enter valid name')
            return;
        }
        if (IsEmailNotValid) {
            toast.error('Enter valid Email')
            return;
        }
        if (Password !== Cpassword) {
            toast.error('Password not matched')
            return;
        }
        const formdata = {
            email: Email,
            password: Password,
            name: fullName,
        }
        await axios.post(`${process.env.REACT_APP_API_URL}/api/signup`, formdata)
            .then((res) => {
                if (res?.data?.data1 === 'Success') {
                    toast.success("Account Created Successfully");
                    setLogin(true);
                    setSignup(false);
                    setfullName('');
                    setPassword('');
                    setCpassword('');
                } else {
                    toast.error(res?.data?.data1);
                }

            })
            .catch(err => console.log(err));
    }
    const handleSubmitLogin = async () => {
        if (IsEmailNotValid) {
            toast.error('Enter valid Email')
            return;
        }
        const formdata = {
            email: Email,
            password: Password,
        }
        await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, formdata)
            .then((res) => {
                if (res?.data?.data1 === 'Success') {
                    toast.success("Logged In");
                    setLogin(false);
                    setSignup(false);
                    localStorage.setItem('userinfo', JSON.stringify(res?.data?.data2));
                      navigate('/');
                } else {
                    toast.error(res?.data?.data1);
                }

            })
            .catch(err => console.log(err));

    }
    const emailValidation = () => {
        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (Email.match(regEx)) {
            setIsEmailNotValid(false);
        } else {
            setIsEmailNotValid(true);
        }
    };
    useEffect(() => {

        handleWishListProducts();
    }, [Login]);
    const handleWishListProducts = async () => {
        const formdata = {
            userid: UserData?.id,
        }
        await axios.post(`${process.env.REACT_APP_API_URL}/api/orderedlist`, formdata)
            .then((res) => {
                if (res?.data?.data1 === 'fetched') {
                    setWishlist(res?.data?.products);
                }

            })
            .catch(err => console.log(err));

    }
    const handleAddToCart = async (newProduct) => {
        const existingProduct = cartProducts.find(product => product.id === newProduct.id);

        if (existingProduct) {
            const updatedCartProducts = cartProducts.map(product =>
                product.id === newProduct.id
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            );
            setCartProducts(updatedCartProducts);
            localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
            if (localStorage.getItem('userinfo')) {
                const formdata = {
                    userid: UserData?.id,
                    products: updatedCartProducts
                }
                await axios.post(`${process.env.REACT_APP_API_URL}/api/updateCart`, formdata)
                    .then((res) => {
                        if (res?.data?.data1 === 'Cart updated successfully') {
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
            if (localStorage.getItem('userinfo')) {
                const formdata = {
                    userid: UserData?.id,
                    products: updatedCartProducts
                }
                await axios.post(`${process.env.REACT_APP_API_URL}/api/updateCart`, formdata)
                    .then((res) => {
                        if (res?.data?.data1 === 'Cart updated successfully') {
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
  const handleLogout = async () => {
    await localStorage.removeItem('userinfo');
    await localStorage.removeItem('cartProducts');
    toast.success('Logout sucessfully');
    navigate('/');
  }
  const handleForgetPassword = async () => {
    if(Email.length === 0){
      toast.error('Enter a valid email');
      return;
    }
    const formdata = {
      email: Email,
  }
  await axios.post(`${process.env.REACT_APP_API_URL}/api/forgetpassword`, formdata)
      .then((res) => {
          if (res?.data?.data1 === 'success') {
              toast.success('Reset link send to your email');
          } else {
              toast.error(res?.data?.data1);
          }

      })
      .catch(err => console.log(err));
  }
  
    return (
        <div >
            <div>
                <Headers />
            </div>
            {localStorage.getItem('userinfo') === null && Signup && (
                <div class="bg-slate-100  flex flex-col ">
                    <div class="container  sm:min-w-[500px] w-[360px] mx-auto flex-1 flex flex-col items-center justify-center px-2 my-10">
                        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 class="mb-8 text-3xl text-center font-bold">Sign up</h1>
                            <input
                                type="text"
                                class="block hover:!ring-4  shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
                      rounded-[8px] outline-none  w-[100%]  disabled:bg-gray-300 text-sm placeholder:text-sm
                      hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 w-full p-3 rounded mb-4"
                                name="fullname"
                                value={fullName}
                                onChange={(e) => { setfullName(e.target.value); }}
                                placeholder="Full Name" />

                            <input
                                type="text"
                                class="block hover:!ring-4  shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
                      rounded-[8px] outline-none  w-[100%]  disabled:bg-gray-300 text-sm placeholder:text-sm
                      hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 w-full p-3 rounded mb-4"
                                name="email"
                                value={Email}
                                onChange={(e) => { setEmail(e.target.value); }}
                                onKeyUp={(e) => emailValidation(e)}
                                placeholder="Email" />

                            <input
                                type="password"
                                class="block hover:!ring-4  shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
                      rounded-[8px] outline-none  w-[100%]  disabled:bg-gray-300 text-sm placeholder:text-sm
                      hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 w-full p-3 rounded mb-4"
                                name="password"
                                value={Password}
                                onChange={(e) => { setPassword(e.target.value); }}
                                placeholder="Password" />
                            <input
                                type="text"
                                class="block hover:!ring-4  shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
                      rounded-[8px] outline-none  w-[100%]  disabled:bg-gray-300 text-sm placeholder:text-sm
                      hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 w-full p-3 rounded mb-4"
                                name="confirm_password"
                                value={Cpassword}
                                onChange={(e) => { setCpassword(e.target.value); }}
                                placeholder="Confirm Password" />

                            <button
                                type="submit"
                                onClick={() => { handleSubmitSignup(); }}
                                class="w-full text-center py-3  rounded-lg bg-blue-500 font-bold cursor-pointer text-white hover:bg-blue-700 focus:outline-none my-1"
                            >Create Account</button>

                            <div class="text-center text-sm text-grey-dark mt-4">
                                By signing up, you agree to the
                                <span class="no-underline border-b border-grey-dark text-grey-dark px-1">
                                    Terms of Service
                                </span> and
                                <span class="no-underline border-b border-grey-dark text-grey-dark px-1" >
                                    Privacy Policy
                                </span>
                            </div>
                        </div>

                        <div class="text-grey-dark mt-6">
                            Already have an account?
                            <span class="no-underline border-b border-blue-500  cursor-pointer text-blue-500 px-2" onClick={() => { setLogin(true); setSignup(false); }}>
                                Log in
                            </span>.
                        </div>
                    </div>
                </div>
            )}
            {Login && localStorage.getItem('userinfo') === null && (
                <div class="bg-slate-100  flex flex-col ">
                    <div class="container sm:min-w-[500px] w-[360px] mx-auto flex-1 flex flex-col items-center justify-center px-2 my-10">
                        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full gap-3">
                            <h1 class="mb-8 text-3xl text-center font-bold">Login</h1>
                            <input
                                type="text"
                                class="block hover:!ring-4  shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
                      rounded-[8px] outline-none  w-[100%]  disabled:bg-gray-300 text-sm placeholder:text-sm
                      hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 w-full p-3 rounded my-4"
                                name="email"
                                value={Email}
                                onChange={(e) => { setEmail(e.target.value); }}
                                onKeyUp={(e) => emailValidation(e)}
                                placeholder="Email" />

                            <input
                                type="password"
                                class="block hover:!ring-4  shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
                      rounded-[8px] outline-none  w-[100%]  disabled:bg-gray-300 text-sm placeholder:text-sm
                      hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 w-full p-3 rounded my-4"
                                name="password"
                                value={Password}
                                onChange={(e) => { setPassword(e.target.value); }}
                                placeholder="Password" />
                            <div class="flex items-center justify-between">
                                <div class="flex items-start py-4">
                                    <div class="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="remember" class="text-slate-700 hover:text-slate-500">Remember me</label>
                                    </div>
                                </div>
                                <div onClick={() => { handleForgetPassword(); }}  class="text-sm cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</div>
                            </div>
                            <button
                                type="submit"
                                onClick={() => { handleSubmitLogin(); }}
                                class="w-full text-center py-3  rounded-lg bg-blue-500 font-bold cursor-pointer text-white hover:bg-blue-700 focus:outline-none my-1"
                            >Login</button>
                        </div>

                        <div class="text-grey-dark mt-6">
                            Don't have an account?
                            <span class="no-underline border-b border-blue-500 cursor-pointer text-blue-500 px-2" onClick={() => { setLogin(false); setSignup(true); }}>
                                Signup
                            </span>.
                        </div>
                    </div>
                </div>
            )}
            {localStorage.getItem('userinfo') && (
                <div className=" border-t border-grey-dark  md:px-[7rem] px-5">
                    <div className="flex flex-col justify-between pt-10 pb-16 sm:pt-12 sm:pb-20 lg:flex-row lg:pb-24">
                        <div className="lg:w-1/4">
                            <p className="pb-6 font-butler text-2xl text-secondary sm:text-3xl lg:text-4xl">
                                My Account
                            </p>
                            <div className="flex flex-col pl-3">
                                <a
                                    href="/account"
                                    className="transition-all hover:font-bold hover:text-primary px-4 py-3 border-l-[3px] border-blue-500 hover:border-blue-700 font-hk font-bold text-primary border-primary"
                                >
                                    Dashboard
                                </a>
                                <a
                                    href="/account/wishlist"
                                    className="transition-all hover:font-bold hover:text-primary px-4 py-3 border-l-2 border-primary-lighter hover:border-primary font-hk text-grey-darkest"
                                >
                                    Wishlist
                                </a>
                                <a
                                    href="/account/account-details"
                                    className="transition-all hover:font-bold hover:text-primary px-4 py-3 border-l-2 border-primary-lighter hover:border-primary font-hk text-grey-darkest"
                                >
                                    Account Details
                                </a>
                            </div>
                            <p
                                onClick={() => { handleLogout(); }}
                                className="mt-8 inline-block bg-blue-500 rounded border border-primary px-8 cursor-pointer py-3 font-hk font-bold text-primary transition-all hover:bg-blue-700 text-white"
                            >
                                Log Out
                            </p>
                        </div>

                        <div className="mt-12 lg:mt-0 lg:w-3/4">
                            <div className="bg-gray-100 py-8 px-5 md:px-8">
                                <h1 className="font-hkbold pb-6 text-center text-2xl text-secondary sm:text-left">
                                    Order List
                                </h1>
                                <div className="hidden sm:block">
                                    <div className="flex justify-between pb-3">
                                        <div className="w-1/3 pl-4 md:w-2/5">
                                            <span className="font-hkbold text-sm uppercase text-secondary">Product Name</span>
                                        </div>
                                        <div className="w-1/4 text-center xl:w-1/5">
                                            <span className="font-hkbold text-sm uppercase text-secondary">Quantity</span>
                                        </div>
                                        <div className="mr-3 w-1/6 text-center md:w-1/5">
                                            <span className="font-hkbold text-sm uppercase text-secondary md:pl-9">Price</span>
                                        </div>
                                        <div className="w-3/10 text-center md:w-1/5">
                                            <span className="font-hkbold pr-8 text-sm uppercase text-secondary md:pr-16 xl:pr-8">Order</span>
                                        </div>
                                    </div>
                                </div>

                                {Wishlist?.map((order, index) => (
                                    <div key={index} className="mb-3 flex flex-col items-center justify-between rounded bg-white px-4 py-5 shadow sm:flex-row sm:py-4">
                                        <div className="flex w-full flex-col border-b border-grey-dark pb-4 text-center sm:w-1/3 sm:border-b-0 sm:pb-0 sm:text-left md:w-2/5 md:flex-row md:items-center">
                                            <span className="font-hkbold block pb-2 text-center text-sm uppercase text-secondary sm:hidden">Product Name</span>
                                            <div className="relative mx-auto w-20 sm:mx-0 sm:mr-3 sm:pr-0">
                                                <div className="aspect-w-1 aspect-h-1 w-full">
                                                    <img src={require('./Components/photo/' + order?.id + '.png')}  alt="product image" className="object-cover" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                            <a href={`/products/${order?.Type}/${order?.id}`} className="mt-2 font-hk text-base text-secondary">{order.Title}</a>
                                            {order?.date !== undefined && (
                                                <p className="text-sm">Order Date: {order?.date}</p>
                                            )}

                                            </div>
                                        </div>
                                        <div className="w-full border-b border-grey-dark pb-4 text-center sm:w-1/5 sm:border-b-0 sm:pb-0">
                                            <span className="font-hkbold block pt-3 pb-2 text-center text-sm uppercase text-secondary sm:hidden">Quantity</span>
                                            <span className="font-hk text-secondary">{order?.quantity}</span>
                                        </div>
                                        <div className="w-full border-b border-grey-dark pb-4 text-center sm:w-1/6 sm:border-b-0 sm:pr-6 sm:pb-0 sm:text-right xl:w-1/5 xl:pr-16">
                                            <span className="font-hkbold block pt-3 pb-2 text-center text-sm uppercase text-secondary sm:hidden">Price</span>
                                            <span className="font-hk text-secondary">{order.Price}</span>
                                        </div>
                                        <div className="w-full text-center sm:w-3/10 sm:text-right md:w-1/4 xl:w-1/5">
                                            <div className="pt-3 sm:pt-0 ">
                                                <p className="font-hkbold block pb-2 text-center text-sm uppercase text-secondary sm:hidden">{` `}</p>
                                                <span onClick={() => { handleAddToCart(order); }} className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-semibold border border-primary-light px-4 py-3 inline-block rounded font-hk text-primary">
                                                    Buy Again
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
            <div><Footer /> </div>
            <Toaster />
        </div >
    )
}

export default LOGIN
