import React, { useState, useEffect } from 'react';
import Headers from './Components/Headers';
import Footer from './Components/Footer';
import 'boxicons/css/boxicons.min.css';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const coupons = [
    { label: 'give20', value: 20 },
    { label: 'give30', value: 30 },

  ];
  const [UserData, setUserData] = useState(() => {
    const savedCart = localStorage.getItem('userinfo');
    return savedCart ? JSON.parse(savedCart) : null;
  });
  const [showCart, setShowCart] = useState(true);
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);

  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [offers, setOffers] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postCode, setPostCode] = useState('');
  const [cartNote, setCartNote] = useState(() => localStorage.getItem('cartNote') || '');
  const [discountCode, setDiscountCode] = useState('');
  useEffect(() => {
    // Retrieve user data from localStorage
    const storedData = JSON.parse(localStorage.getItem('userinfo'));

    if (storedData) {
      setFirstName(storedData.name || '');
      setEmail(storedData.email || '');
      setNumber(storedData.number || '');
      setAddress(storedData.address || '');
      setAddress2(storedData.address2 || '');
      setCity(storedData.city || '');
      setPostCode(storedData.postCode || '');
      setCountry(storedData.country || '');
    };
  }, []);

  const [cartProducts, setCartProducts] = useState(() => {
    const savedCart = localStorage.getItem('cartProducts');
    return savedCart ? (localStorage.getItem('userinfo') ? [] : JSON.parse(savedCart)) : [];
  });

  const [subtotal, setSubtotal] = useState(0);
  const [couponApplied, setCouponApplied] = useState(0); // Example coupon value
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (localStorage.getItem('userinfo')) {
      handleGetCartItem(UserData.id);
    }
  }, []);
  useEffect(() => {
    const newSubtotal = cartProducts.reduce((acc, product) => acc + Number(product.Price) * product.quantity, 0);
    setSubtotal(newSubtotal?.toFixed(2));
    setTotal(newSubtotal?.toFixed(2) - couponApplied);

    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    localStorage.setItem('subtotal', JSON.stringify(newSubtotal));
    localStorage.setItem('total', JSON.stringify(newSubtotal - couponApplied));
  }, [cartProducts, couponApplied]);

  useEffect(() => {
    localStorage.setItem('offers', JSON.stringify(offers));
    localStorage.setItem('cartNote', cartNote);
  }, [offers, cartNote]);

  useEffect(() => {
    const savedSubtotal = localStorage.getItem('subtotal');
    const savedTotal = localStorage.getItem('total');
    if (savedSubtotal) setSubtotal(JSON.parse(savedSubtotal));
    if (savedTotal) setTotal(JSON.parse(savedTotal));
  }, []);

  const removeItem = async (productId) => {
    const updatedProducts = cartProducts.filter(product => product.id !== productId);
    setCartProducts(updatedProducts);
    if (localStorage.getItem('userinfo')) {
      const formdata = {
        userid: UserData?.id,
        products: updatedProducts
      }
      await axios.post(`${process.env.REACT_APP_API_URL}/api/updateCart`, formdata)
        .then((res) => {
          if (res?.data?.data1 === 'Cart updated successfully') {
            // toast.success(res?.data?.data1);
          } else {
            toast.error(res?.data?.data1);
          }

        })
        .catch(err => console.log(err));
    }
  };
  const applyCoupon = () => {
    const coupon = coupons.find(c => c.label === discountCode.toLowerCase());
    if (coupon) {
      setCouponApplied(((subtotal * coupon.value) / 100)?.toFixed(2));
      toast.success('Coupon applied successfully!');
    } else {
      toast('Coupon not found');
    }
  };
  const handleGetCartItem = async (idd) => {
    const formdata = {
      userid: idd,
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/api/getCartProducts`, formdata)
      .then((res) => {
        setCartProducts(res?.data?.products);
      })
      .catch(err => console.log(err));
  }
  const isAnyFieldEmpty = () => {
    return !email || !number || !firstName || !address || !address2 || !city || !country || !postCode;
  };
  const isButtonDisabled = isAnyFieldEmpty();
  const handleOrderPlaced = async () => {
    const formdata = {
      id: UserData?.id,
      name: firstName,
      email,
      number,
      address,
      address2,
      city,
      country,
      postCode,
      cartNote,
      cartProducts,
      total,
      subtotal,
      couponApplied,
      discountCode,
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/api/orderplaced`, formdata)
      .then((res) => {
        if (res?.data?.data1 === 'success') {
          toast.success('Order Placed Successfully, our team will contact you soon');
          localStorage.setItem('userinfo', JSON.stringify(res?.data?.data2));
          localStorage.removeItem(cartNote);
          localStorage.removeItem(offers);
          localStorage.removeItem(cartProducts);
          setTimeout(() => {
            navigate('/account');
          }, 2000);

        } else {
          toast.error(res?.data?.data1);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Headers />
      <div className="md:p-7 md:mx-[10rem] p-2  border-slate-300 mt-3 pt-10 sm:pt-12">
        <div className="flex flex-wrap items-center">
          <div
            onClick={() => { setShowCart(true); setShowCustomerInfo(false); setShowShippingInfo(false); setPaymentMethod(false); }}
            className={`transition-all cursor-pointer border-b border-transparent hover:border-blue-700 text-sm text-secondary hover:text-blue-700 ${showCart ? 'font-bold' : ''}`}
          >
            Cart
          </div>

          {!showCart && (
            <>
              <i className="bx bx-chevron-right text-sm text-secondary px-2"></i>
              <div
                onClick={() => { setShowCart(false); setShowCustomerInfo(true); setShowShippingInfo(false); setPaymentMethod(false); }}
                className={`transition-all cursor-pointer border-b border-transparent hover:border-blue-700 text-sm text-secondary hover:text-blue-700 ${showCustomerInfo ? 'font-bold' : ''}`}
              >
                Customer information
              </div>
            </>
          )}
          {showShippingInfo && (
            <>
              <i className="bx bx-chevron-right text-sm text-secondary px-2"></i>
              <div
                onClick={() => { setShowCart(false); setShowCustomerInfo(false); setShowShippingInfo(true); setPaymentMethod(false); }}
                className={`transition-all cursor-pointer border-b border-transparent hover:border-blue-700 text-sm text-secondary hover:text-blue-700 ${showShippingInfo ? 'font-bold' : ''}`}
              >
                Shipping method
              </div>
            </>
          )}
        </div>
        {showCart && (
          <div className="flex flex-col-reverse justify-between pb-16 sm:pb-20 lg:flex-row lg:pb-24">
            <div className="lg:w-3/5">
              <div className="pt-10">
                <h1 className="pb-3 text-center text-2xl text-secondary sm:text-left">
                  Cart Items
                </h1>
                <div className="pt-8">
                  <div className="hidden sm:block">
                    <div className="flex justify-between border-b border-slate-300er">
                      <div className="w-1/2 pl-8 pb-2 sm:pl-12 lg:w-3/5 xl:w-1/2">
                        <span className="text-sm uppercase text-secondary">
                          Product Name
                        </span>
                      </div>
                      <div className="w-1/4 pb-2 text-right sm:mr-2 sm:w-1/6 md:mr-18 lg:mr-12 lg:w-1/5 xl:mr-18 xl:w-1/4">
                        <span className="text-sm uppercase text-secondary">
                          Quantity
                        </span>
                      </div>
                      <div className="w-1/4 pb-2 text-right md:pr-10 lg:w-1/5 xl:w-1/4">
                        <span className="text-sm uppercase text-secondary">
                          Price
                        </span>
                      </div>
                    </div>
                  </div>

                  {cartProducts.map((product) => (
                    <div key={product.id} className="mb-0 hidden flex-row items-center justify-between border-b border-slate-300 py-3 md:flex">
                      <i
                        className="bx bx-x mr-6 cursor-pointer text-2xl text-slate-700 sm:text-3xl"
                        onClick={() => removeItem(product.id)}
                      ></i>
                      <div className="flex w-1/2 flex-row items-center border-b-0 border-slate-300 pt-0 pb-0 text-left lg:w-3/5 xl:w-1/2">
                        <div className="relative mx-0 w-20 pr-0">
                          <div className="flex h-20 items-center justify-center rounded">
                            <div className="aspect-w-1 aspect-h-1 w-full">
                              <img
                                src={require('./Components/photo/' + product.id + '.png')}
                                alt={product.Title}
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </div>
                        <a href={`/products/${product?.Type}/${product?.id}`} className="mt-2 ml-4 text-small text-gray-500">
                          {product.Category !== null ? product.Category : product.Title}
                        </a>
                      </div>
                      <div className="w-full border-b-0 border-slate-300 pb-0 text-center sm:w-1/5 xl:w-1/4">
                        <div className="mx-auto mr-8 xl:mr-4">
                          <div className="flex justify-center">
                            <input
                              id="quantity-form-desktop"
                              className="form-quantity form-input w-16 rounded-r-none py-0 px-2 text-center hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white resize-none rounded-[8px] outline-none disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500"
                              min="1"
                              value={product.quantity}
                              onChange={(e) => {
                                const updatedProducts = cartProducts.map((p) =>
                                  p.id === product.id ? { ...p, quantity: Number(e.target.value) } : p
                                );
                                setCartProducts(updatedProducts);
                              }}
                            />
                            <div className="flex flex-col">
                              <span
                                className="flex-1 cursor-pointer rounded-tr border border-l-0 border-slate-300er bg-white px-1"
                                onClick={() => {
                                  const updatedProducts = cartProducts.map((p) =>
                                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                                  );
                                  setCartProducts(updatedProducts);
                                }}
                              >
                                <i className="bx bxs-up-arrow pointer-events-none text-xs text-blue-700"></i>
                              </span>
                              <span
                                className="flex-1 cursor-pointer rounded-br border border-t-0 border-l-0 border-slate-300er bg-white px-1"
                                onClick={() => {
                                  const updatedProducts = cartProducts.map((p) =>
                                    p.id === product.id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
                                  );
                                  setCartProducts(updatedProducts);
                                }}
                              >
                                <i className="bx bxs-down-arrow pointer-events-none text-xs text-blue-700"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/4 pr-10 pb-4 text-right lg:w-1/5 xl:w-1/4 xl:pr-10">
                        <span className="text-secondary">${product.Price}</span>
                      </div>
                    </div>
                  ))}

                  {cartProducts.map((product) => (
                    <div key={product.id} className="mb-5 flex items-center justify-center border-b border-slate-300 pb-5 md:hidden">
                      <div className="relative w-1/3">
                        <div className="aspect-w-1 aspect-h-1 w-full">
                          <img
                            src={require('./Components/photo/' + product.id + '.png')}
                            alt={product.Title}
                            className="object-cover"
                          />
                        </div>
                        <div
                          className="absolute top-0 right-0 -mt-2 -mr-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white shadow"
                          onClick={() => removeItem(product.id)}
                        >
                          <i className="bx bx-x text-xl text-slate-700"></i>
                        </div>
                      </div>
                      <div className="pl-4">
                        <a href={`/products/${product?.Type}/${product?.id}`} className="mt-2 font-bold text-small text-gray-500">
                          {product.Category !== null ? product.Category : product.Title}
                        </a>
                        <span className="block text-secondary">${product.Price}</span>

                        <div className="mt-2 flex w-2/3 sm:w-5/6">
                          <input
                            id="quantity-form-mobile"
                            className="form-quantity form-input w-12 rounded-r-none py-1 px-2 text-center hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white resize-none rounded-[8px] outline-none disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500"
                            min="1"
                            value={product.quantity}
                            onChange={(e) => {
                              const updatedProducts = cartProducts.map((p) =>
                                p.id === product.id ? { ...p, quantity: Number(e.target.value) } : p
                              );
                              setCartProducts(updatedProducts);
                            }}
                          />
                          <div className="flex flex-row">
                            <span
                              className="flex flex-1 cursor-pointer items-center justify-center border border-l-0 border-slate-300er bg-white px-2"
                              onClick={() => {
                                const updatedProducts = cartProducts.map((p) =>
                                  p.id === product.id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
                                );
                                setCartProducts(updatedProducts);
                              }}
                            >
                              <i className="bx bxs-down-arrow pointer-events-none text-xs text-blue-700"></i>
                            </span>
                            <span
                              className="flex flex-1 cursor-pointer items-center justify-center rounded-r border border-l-0 border-slate-300er bg-white px-2"
                              onClick={() => {
                                const updatedProducts = cartProducts.map((p) =>
                                  p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                                );
                                setCartProducts(updatedProducts);
                              }}
                            >
                              <i className="bx bxs-up-arrow pointer-events-none text-xs text-blue-700"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
            <div className="sm:mx-auto mt-16 sm:w-2/3 md:w-full lg:mx-0 lg:mt-0 lg:w-1/3 shadow-md">
              <div className="bg-slate-100 py-8 px-8">
                <h4 className="pb-3 text-center text-2xl text-secondary sm:text-left">
                  Cart Total
                </h4>
                <div>
                  <p className="pt-1 pb-2 text-secondary">Cart Note</p>
                  <p className="pb-4 text-sm text-secondary">
                    Special instructions for us
                  </p>
                  <label htmlFor="cart_note" className="relative block h-0 w-0 overflow-hidden">
                    Cart Note
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Enter your text"
                    className="form-textarea hover:!ring-4 w-[100%] shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[60px] resize-y rounded-[8px] outline-none disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-4"
                    id="cart_note"
                    value={cartNote}
                    onChange={(e) => setCartNote(e.target.value)}
                  ></textarea>
                </div>
                <div className="pt-4">
                  <p className="pt-1 pb-4 text-secondary">Add Coupon</p>
                  <div className="flex justify-between">
                    <label
                      htmlFor="discount_code"
                      className="relative block h-0 w-0 overflow-hidden"
                    >
                      Discount Code
                    </label>
                    <input
                      type="text"
                      placeholder="Discount code"
                      className="form-input w-3/5 xl:w-2/3 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y rounded-[8px] outline-none disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                      id="discount_code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <button
                      className="p-2 text-center uppercase hover:bg-blue-700 hover:text-white font-semibold rounded-xl border border-blue-500 text-blue-600 ml-4 w-2/5 lg:ml-2 xl:ml-4 xl:w-1/3"
                      aria-label="Apply button"
                      onClick={() => { applyCoupon(); }}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="mb-12 pt-4">
                  <p className="pt-1 pb-2 text-secondary">Cart Total</p>
                  <div className="flex justify-between border-b border-slate-300er pb-1">
                    <span className="text-secondary">Subtotal</span>
                    <span className="text-secondary">${subtotal}</span>
                  </div>
                  {couponApplied > 0 && (
                    <div className="flex justify-between border-b border-slate-300er pt-2 pb-1">
                      <span className="text-secondary">Coupon applied</span>
                      <span className="text-secondary">-${couponApplied}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3">
                    <span className="text-secondary">Total</span>
                    <span className="text-secondary">${total}</span>
                  </div>
                </div>
                {localStorage.getItem('userinfo') && (
                  <div
                    onClick={() => {
                      if (cartProducts.length > 0) {
                        setShowCart(false);
                        setShowCustomerInfo(true);
                        setShowShippingInfo(false);
                        setPaymentMethod(false);
                      } else {
                        toast.error('Add product in cart to move forward');
                      }
                    }}
                    disabled={cartProducts.length === 0}
                    className="btn cursor-pointer p-4 hover:bg-blue-500 text-center disabled:!bg-slate-400 rounded-xl uppercase text-white bg-blue-700 font-semibold flex items-center justify-center w-[100%]"
                  >
                    Proceed to checkout
                  </div>
                )}
                {localStorage.getItem('userinfo') === null && (
                  <a
                    href='/account'
                    className="btn cursor-pointer p-4 hover:bg-blue-500 text-center rounded-xl uppercase text-white bg-blue-700 font-semibold flex items-center justify-center w-[100%]"
                  >
                    login
                  </a>
                )}

              </div>
            </div>
          </div>
        )}
        {showCustomerInfo && (
          <div className="flex flex-col justify-between pb-16 sm:pt-12 sm:pb-20 lg:flex-row lg:pb-24">
            <div className="lg:w-2/3 lg:pr-16 xl:pr-20 items-start">
              <div className="pt-10 md:pt-12">
                <div className="flex flex-col-reverse items-center justify-between sm:flex-row">
                  <h1 className="text-xl font-medium text-secondary md:text-2xl">
                    Contact information
                  </h1>
                  {/* <p className="text-secondary">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500">
                      Log in
                    </a>
                  </p> */}
                </div>
                <div className="pt-4 md:pt-5">
                  <div className="flex flex-col justify-between">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="form-input hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y rounded-[8px] outline-none w-[100%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Number"
                      className="form-input mb-4 mt-3 sm:mb-5 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y rounded-[8px] outline-none w-[100%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                      id="number"
                      value={number}
                      maxLength={10}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center pt-4">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      id="offers"
                      checked={offers}
                      onChange={(e) => setOffers(e.target.checked)}
                    />
                    <p className="pl-3 text-sm text-secondary">
                      Keep me up to date on news and exclusive offers
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4 pb-10">
                <h4 className="text-center text-xl font-medium text-secondary sm:text-left md:text-2xl">
                  Shipping address
                </h4>
                <div className="pt-4 md:pt-5">
                  <div className="flex justify-between">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-input mb-4 mr-2 sm:mb-5 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y rounded-[8px] outline-none w-[50%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                      id="first_name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Your address"
                    className="form-input mb-4 sm:mb-5 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y rounded-[8px] outline-none w-[100%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Apartment, Suite, etc"
                    className="form-input mb-4 sm:mb-5 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y rounded-[8px] outline-none w-[100%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                    id="address2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="form-input mb-4 sm:mb-5 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y rounded-[8px] outline-none w-[100%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <div className="flex justify-between">
                    <input
                      type="text"
                      placeholder="Country/Region"
                      className="form-input mb-4 mr-2 sm:mb-5 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y rounded-[8px] outline-none w-[50%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Post code"
                      className="form-input mb-4 ml-1 sm:mb-5 hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y rounded-[8px] outline-none w-[50%] disabled:bg-gray-300 text-sm placeholder:text-sm hover:!ring-blue-200 hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-3"
                      id="post_code"
                      value={postCode}
                      onChange={(e) => setPostCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between pt-8 sm:flex-row sm:pt-12">
                  <a
                    href="/cart"
                    className="group mb-3 flex items-center text-sm text-secondary transition-all hover:text-blue-500 group-hover:font-bold sm:mb-0"
                  >
                    <i className="bx bx-chevron-left -mb-1 pr-2 text-2xl text-secondary transition-colors group-hover:text-blue-500"></i>
                    Return to Cart
                  </a>
                  <button
                    // onClick={() => { setShowCart(false); setShowCustomerInfo(false); setShowShippingInfo(true); setPaymentMethod(false); }}
                    onClick={() => {
                      if (number?.length === 10) {
                        setShowCart(false);
                        setShowCustomerInfo(false);
                        setShowShippingInfo(true);
                        setPaymentMethod(false);
                      } else {
                        toast.error('Enter valid Phone-number');
                      }
                    }}
                    disabled={isButtonDisabled}
                    className="btn cursor-pointer p-4 hover:bg-blue-500 text-center rounded-xl uppercase disabled:bg-slate-400  text-white bg-blue-700 font-semibold flex items-center justify-center"
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-slate-100 sm:w-2/3 md:w-1/2 lg:mt-0 lg:w-1/3 shadow-md">
              <div className="p-8">
                <h3 className="bold pb-3 text-center text-2xl text-secondary sm:text-left">
                  Your Order
                </h3>
                <p className="bold text-center uppercase text-secondary sm:text-left">
                  PRODUCTS
                </p>
                <div className="mt-5 mb-8">
                  {cartProducts.map((product) => (
                    <div key={product.id} className="mb-5 flex items-center">
                      <div className="relative mr-3 w-20 sm:pr-0">
                        <div className="flex h-20 items-center justify-center rounded">
                          <img
                            src={require('./Components/photo/' + product.id + '.png')}
                            alt={`${product.Title}`}
                            className="h-16 w-12 object-cover object-center"
                          />
                          <span className="absolute top-0 right-0 -mt-2 -mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 px-2 text-xs leading-none text-white">
                            {product.quantity}
                          </span>
                        </div>
                      </div>
                      <p className="text-lg text-secondary">{product.Title}</p>
                    </div>
                  ))}
                </div>
                <h4 className="bold pt-1 pb-2 text-secondary">Cart Totals</h4>
                <div className="flex justify-between border-b border-grey-darker py-3">
                  <span className="leading-none text-secondary">Subtotal</span>
                  <span className="leading-none text-secondary">${subtotal}</span>
                </div>
                {couponApplied > 0 && (
                  <div className="flex justify-between border-b border-slate-300er pt-2 pb-1">
                    <span className="text-secondary">Coupon applied</span>
                    <span className="text-secondary">-${couponApplied}</span>
                  </div>
                )}
                <div className="flex justify-between py-3">
                  <span className="bold leading-none text-secondary">Total</span>
                  <span className="bold leading-none text-secondary text-right">${total}<br /> + Delivery fee (based on distance)</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {showShippingInfo && (
          <div className="flex flex-col justify-between pb-16 sm:pt-12 sm:pb-20 lg:flex-row lg:pb-24">
            <div className="lg:w-2/3 lg:pr-16 xl:pr-20 items-start">
              <div className="pt-10 md:pt-12">
                <div className="flex flex-col-reverse items-center justify-between sm:flex-row">
                  <h1 className="text-xl font-medium text-secondary md:text-2xl">
                    Shipping address
                  </h1>
                </div>
              </div>
              <div className="pt-4 pb-10">
                <div className="border p-3 shadow-md flex flex-col rounded-lg">
                  <div className="flex flex-row border-b pb-2">
                    <p className="w-[20%] px-2 text-center">
                      Contact
                    </p>
                    <p className="w-[60%] px-2 text-start">
                      {email}
                    </p>
                    <p onClick={() => { setShowCart(false); setShowCustomerInfo(true); setShowShippingInfo(false); setPaymentMethod(false); }} className="w-[20%] cursor-pointer justify-end item-end px-2 text-center underline border-blue-700 text-blue-500">
                      Change
                    </p>
                  </div>
                  <div className="flex flex-row pt-2">
                    <p className="w-[20%] px-2 text-center">
                      Ship to
                    </p>
                    <p className="w-[60%] px-2 text-start">
                      {address}, {city}, {country}, {postCode}
                    </p>
                    <p onClick={() => { setShowCart(false); setShowCustomerInfo(true); setShowShippingInfo(false); setPaymentMethod(false); }} className="w-[20%] cursor-pointer justify-end item-end px-2 text-center underline border-blue-700 text-blue-500">
                      Change
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between pt-8 sm:flex-row sm:pt-12">
                  <a
                    href="/cart"
                    className="group mb-3 flex items-center text-sm text-secondary transition-all hover:text-blue-500 group-hover:font-bold sm:mb-0"
                  >
                    <i className="bx bx-chevron-left -mb-1 pr-2 text-2xl text-secondary transition-colors group-hover:text-blue-500"></i>
                    Return to Cart
                  </a>
                  <div onClick={() => { handleOrderPlaced(); }} className="btn cursor-pointer p-4 hover:bg-blue-500 text-center rounded-xl uppercase text-white bg-blue-700 font-semibold flex items-center justify-center">
                    Place Order
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-slate-100 sm:w-2/3 md:w-1/2 lg:mt-0 lg:w-1/3 shadow-md">
              <div className="p-8">
                <h3 className="bold pb-3 text-center text-2xl text-secondary sm:text-left">
                  Your Order
                </h3>
                <p className="bold text-center uppercase text-secondary sm:text-left">
                  PRODUCTS
                </p>
                <div className="mt-5 mb-8 ">
                  {cartProducts.map((product) => (
                    <div key={product.id} className="mb-5 flex items-center">
                      <div className="relative mr-3 w-20 sm:pr-0">
                        <div className="flex h-20 items-center justify-center rounded">
                          <img
                            src={require('./Components/photo/' + product.id + '.png')}
                            alt={`${product.Title} `}
                            className="h-16 w-12 object-cover object-center"
                          />
                          <span className="absolute top-0 right-0 -mt-2 -mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 px-2 text-xs leading-none text-white">
                            {product.quantity}
                          </span>
                        </div>
                      </div>
                      <p className="text-lg text-secondary">{product.Title}</p>
                    </div>
                  ))}
                </div>
                <h4 className="bold pt-1 pb-2 text-secondary">Cart Totals</h4>
                <div className="flex justify-between border-b border-grey-darker py-3">
                  <span className="leading-none text-secondary">Subtotal</span>
                  <span className="leading-none text-secondary">${subtotal}</span>
                </div>
                {couponApplied > 0 && (
                  <div className="flex justify-between border-b border-slate-300er pt-2 pb-1">
                    <span className="text-secondary">Coupon applied</span>
                    <span className="text-secondary">-${couponApplied}</span>
                  </div>
                )}
                <div className="flex justify-between py-3">
                  <span className="bold leading-none text-secondary">Total</span>
                  <span className="bold leading-none text-secondary text-right">${total}<br /> + Delivery fee (based on distance)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default Login;
