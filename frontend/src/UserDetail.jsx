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


function LOGIN() {
    const navigate = useNavigate();
    const [Login, setLogin] = useState(true);
    const [Signup, setSignup] = useState(false);
    const [fullName, setfullName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Cpassword, setCpassword] = useState('');
    const [IsEmailNotValid, setIsEmailNotValid] = useState(false);
    const [UserData, setUserData] = useState(() => {
        const savedCart = localStorage.getItem('userinfo');
        return savedCart ? JSON.parse(savedCart) : null;
      });
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
                    setTimeout(()=> {
                        navigate('/');
                    },500);
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
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        number: '',
        address: '',
        address2: '',
        city: '',
        postCode: '',
        country: '',
    });

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedData = JSON.parse(localStorage.getItem('userinfo'));

        if (storedData) {
            setFormData({
                id: storedData.id || '',
                name: storedData.name || '',
                email: storedData.email || '',
                number: storedData.number || '',
                address: storedData.address || '',
                address2: storedData.address2 || '',
                city: storedData.city || '',
                postCode: storedData.postCode || '',
                country: storedData.country || '',
            });
        }
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSave = async() => {
        if (formData?.number?.length > 0) {
            if (formData?.number?.length !== 10) {
                toast.error('Enter a valid number');
                return;
            }
        }
        await axios.post(`${process.env.REACT_APP_API_URL}/api/userdetails`, formData)
            .then((res) => {
                if (res?.data?.data1 === 'Success') {
                    toast.success("Account Data Updated Successfully");
                    localStorage.setItem('userinfo', JSON.stringify(res?.data?.data2));
                } else {
                    toast.error(res?.data?.data1);
                }

            })
            .catch(err => console.log(err));
    };
    const handleLogout = async () => {
        await localStorage.removeItem('userinfo');
        await localStorage.removeItem('cartProducts');
        toast.success('Logout sucessfully');
        navigate('/');
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
                                <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
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
                                    className="transition-all hover:font-bold hover:text-primary px-4 py-3 border-l-2 border-primary-lighter hover:border-primary font-hk text-grey-darkest"
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
                                    className="transition-all hover:font-bold hover:text-primary px-4 py-3 border-l-[3px] border-blue-500 hover:border-blue-700 font-hk font-bold text-primary border-primary"
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
                            <div className="bg-gray-100 py-10 px-6 sm:px-10">
                                <h1 className="font-hkbold mb-12 text-2xl text-secondary sm:text-left">
                                    Account Details
                                </h1>

                                <form>
                                    <div className="flex flex-col gap-5 md:flex-row md:gap-8">
                                        <div className="flex flex-col w-full">
                                            <input
                                                type="text"
                                                placeholder="Name Displayed"
                                                className="form-input mb-4 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] rounded-[8px] outline-none w-[100%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                                                id="nameDisplayed"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                className="form-input mb-4 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] rounded-[8px] outline-none w-[100%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Phone-number"
                                                className="form-input mb-4 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] rounded-[8px] outline-none w-[100%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                                                id="number"
                                                maxLength={10}
                                                value={formData.number}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="my-8">
                                        <h4 className="font-hkbold mb-2 text-xl text-secondary sm:text-left">
                                            Shipping Address
                                        </h4>
                                        <div className="flex flex-col gap-5 md:flex-row md:gap-8">
                                            <div className="flex flex-col w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Street"
                                                    className="form-input mb-4 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] rounded-[8px] outline-none w-[100%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                                                    id="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Street 2"
                                                    className="form-input mb-4 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] rounded-[8px] outline-none w-[100%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                                                    id="address2"
                                                    value={formData.address2}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <input
                                                    type="text"
                                                    placeholder="City"
                                                    className="form-input mb-4 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] rounded-[8px] outline-none w-[100%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                                                    id="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                />
                                                {/* <input
                                                    type="text"
                                                    placeholder="State"
                                                    className="form-input mb-4 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] rounded-[8px] outline-none w-[100%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                                                    id="state"
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                /> */}
                                                <input
                                                    type="text"
                                                    placeholder="Zip Code"
                                                    className="form-input hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] rounded-[8px] outline-none w-[100%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                                                    id="postCode"
                                                    value={formData.postCode}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label htmlFor="country" className="mb-2 block font-hk text-secondary">Country</label>
                                            <select
                                                id="country"
                                                className="form-select hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] rounded-[8px] outline-none w-[100%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 "
                                                value={formData.country}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Country</option>
                                                <option value="us">United States</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-primary hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-blue-500 min-h-[40px] h-[40px] rounded-[8px] outline-none w-[100%] text-white text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                                            aria-label="Save button"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
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
