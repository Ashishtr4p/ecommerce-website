import React, { useState, useEffect } from "react";
import Header from './Components/Headers';
import Footer from './Components/Footer';
import { useNavigate } from 'react-router-dom';
import { TbJewishStar, TbListDetails } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import 'tailwindcss/tailwind.css';
import toast, { Toaster } from 'react-hot-toast';
import RequestEstimate from './Components/requestEstimate';
import axios from "axios";

function App() {
  const categories = [
    { key: 'category-1', name: 'Bedroom', url: '/products/bedroom' },
    { key: 'category-2', name: 'Mattress', url: '/products/mattress' },
    { key: 'category-3', name: 'Living Room', url: '/products/livingroom' },
    { key: 'category-4', name: 'Dining Room', url: '/products/dining' },
    { key: 'category-5', name: 'Appliances', url: '/products/applicances' },
    { key: 'category-6', name: 'Rustic', url: '/products/rustic' },
  ];
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState(() => {
    const savedCart = localStorage.getItem('cartProducts');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const pageData = [
      {
        id: "493f4960-5a21-41dd-ae71-757b2a4141ab",
        Image_Src: "https://signaturefurnitureoutlet.com/bmz_cache/1/1552fc1a18653e4358265c8ce32c0195.image.800x568.jpg",
        Title: "BOULDER CREEK",
        Brand: null,
        Price: 0,
        SKU: "boulder-creek",
        Category: null,
        Date: "Sunday 21 April, 2024",
        RealPrice: 0,
        Type: "amish",
        SubType: "Amish",
        Description: "\n\t\t\t\t\t\t\t\t<p class=text><strong>Dimensions:</strong><br>\n Dresser - 60 x 22.5 x 44.25<br>\nSliding Door Chifferobe 5 Drawer - 47 x 23.5 x 71<br>\nBlanket Chest - 44 x 22.5 x 22<br>\n6 Drawer Chest - 41 x 22.5 x 54.75<br>\nBeveled Mirror - 42.75 x 1.5 x 34.25<br>\n3 Drawer Nightstand - 22.75 x 18 x 29.75\n\n<br><br><em>Hand-Made in the USA</em></p>\n\t\t\t\t\t\t\t\t<!--bof Product URL -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--eof Product URL -->\n\t\t\t\t\t\t\t\t<!--bof Quantity Discounts table -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--eof Quantity Discounts table -->\n\t\t\t\t\t\t\t",
        quantity: 1
      },
      {
        "id": "f46ae822-c070-4328-9974-85d2405164c7",
        "Image_Src": "https://signaturefurnitureoutlet.com/bmz_cache/2/29c97cd7afdad7d173853d46b89cb55e.image.800x577.jpg",
        "Title": "EMPIRE",
        "Brand": null,
        "Price": 0,
        "SKU": "empire",
        "Category": null,
        "Date": "Sunday 21 April, 2024",
        "RealPrice": 0,
        "Type": "amish",
        "SubType": "Amish",
        "Description": "\n\t\t\t\t\t\t\t\t<p class=text><strong>Dimensions:</strong>\n<br>10 Drawer Dresser - 71 x 23.75 x 44.25<br>\nSliding Door Chifferobe 5 drawer, 2 door - 52.5 x 25.75 x 75.25<br>\n2 Drawer Media Chest - 55 x 19.25 <br>\n9 Drawer Chest - 45 x 23.75 x 61<br>\nBeveled Mirror - 62.5 x 4 x 34.75<br>\n3 Drawer Nightstand - 30 x 19.25 x 34.75\n\n<br><br><em>Hand-Made in the USA</em></p>\n\t\t\t\t\t\t\t\t<!--bof Product URL -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--eof Product URL -->\n\t\t\t\t\t\t\t\t<!--bof Quantity Discounts table -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--eof Quantity Discounts table -->\n\t\t\t\t\t\t\t",
        "quantity": 1
      },
      {
        "id": "a6f31838-fb8c-4190-98d6-c3176ba7daef",
        "Image_Src": "https://signaturefurnitureoutlet.com/bmz_cache/8/832dcc5a3b74edf14a88290f679f5640.image.800x533.jpg",
        "Title": "FINLAND",
        "Brand": null,
        "Price": 0,
        "SKU": "finland",
        "Category": null,
        "Date": "Sunday 21 April, 2024",
        "RealPrice": 0,
        "Type": "amish",
        "SubType": "Amish",
        "Description": "\n\t\t\t\t\t\t\t\t<p class=text><strong>Dimensions:</strong><br>\n9 Drawer Dresser - 59 x x 21.75 x 43.25<br>\nSliding Door Chifferobe 5 drawer, 2 door - 45 x 22.75 x 70.75<br>\nBlanket Chest - 44 x 21.75 x 21.25<br>\n6 Drawer Chest - 40 x 21.75 x 54.25<br>\nBeveled Mirror - 41.75 x 2.5 x 35<br>\n3 Drawer Nightstand\t- 20 x 17 x 29\n\n<br><br><em>Hand-Made in the USA</em></p>\n\t\t\t\t\t\t\t\t<!--bof Product URL -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--eof Product URL -->\n\t\t\t\t\t\t\t\t<!--bof Quantity Discounts table -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--eof Quantity Discounts table -->\n\t\t\t\t\t\t\t",
        "quantity": 1
      },
      {
        id: "dede266c-c06b-4f17-9627-02b808bdff29",
        Image_Src: "https://signaturefurnitureoutlet.com/bmz_cache/3/3ca011d38b04a1b41375424be7c7b28d.image.800x451.jpg",
        Title: "BURLINGTON WOOD",
        Brand: "Amish JR",
        Price: 0,
        SKU: "Burlington Wood",
        Category: null,
        Date: "Monday 15 July, 2024",
        RealPrice: 0,
        Type: "amish",
        SubType: "Amish",
        Description: "\n\t\t\t\t\t\t\t\t<p class=text>Hand crafted hardwood Amish furniture. Made in the USA</p>\n\t\t\t\t\t\t\t\t<!--bof Product URL -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--eof Product URL -->\n\t\t\t\t\t\t\t\t<!--bof Quantity Discounts table -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--eof Quantity Discounts table -->\n\t\t\t\t\t\t\t",
        quantity: 1
      }
  ];
  
  const [isModalOpen, setModalOpen] = useState(false);
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
            if(res?.data?.data1 === 'Product added to cart') { 
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
  const [UserData, setUserData] = useState(() => {
    const savedCart = localStorage.getItem('userinfo');
    return savedCart ? JSON.parse(savedCart) : null;
  });
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
    <div className=" h-[100vh] w-[100vw]">
      <Header />

      {/* Banner */}
      <div className="bg-cover bg-no-repeat bg-center  " style={{ backgroundImage: `url(${require('./Components/home1.png')})` }}>
        <div className="flex flex-col items-center justify-center mx-auto bg-black bg-opacity-50 py-36" >
          <p className="text-2xl text-white font-medium sm:mb-4 text-center capitalize">
            We Sell Amish Handcrafted Furniture
          </p>
          <div className="mt-12">
            <a href="/products/amish" className="bg-primary  border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary">Shop Now</a>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container md:mx-auto  py-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6 pl-7">Shop by Category</h2>
        <div className="grid md:grid-cols-3 md:gap-3 grid-cols-2 gap-1 px-2">
          {categories.map((category, index) => (
            <div key={index} className="relative rounded-sm overflow-hidden group ">
              <img src={require('./images/category/' + category.key + '.jpg')} alt={`category ${index + 1}`} className="w-full" />
              <a href={category.url} className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-70 transition">
                {category.name}
                <br/>
                <smal className="bg-primary text-white px-8 py-5 text-sm md:block hidden">
                  View Our Section
                </smal>
              </a>
              
            </div>
          ))}
        </div>
      </div>

      {/* New Arrival */}
      <div className="container md:mx-auto px-2 pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6 pl-7">Top New Arrival</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2">
          {/* {['product1', 'product4', 'product2', 'product3'].map((product, index) => (
            <div key={index} className="bg-white  rounded overflow-hidden group shadow-xl ease-in duration-150 hover:scale-110">
              <div className="relative">
                <img src={require('./images/products/' + product + '.jpg')} alt={`product ${index + 1}`} className="w-full" />
                <div className="absolute top-0 left-0 rotate-[-30deg] ">
                  <FaStar className='text-red-700 sm:h-[85px] sm:w-[85px] h-[46px] w-[52px]' />
                </div>
                <div className="absolute sm:top-7 sm:left-7 z-[999] top-3 left-4 flex items-center justify-center rotate-[-30deg]">
                    <span className="text-white sm:text-[12px] text-[8px] text-center font-semibold"><span className="font-semibold ">Sale</span> <br/>{`  `} - 49%</span>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                  <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="view product">
                    <TbListDetails />
                  </a>
                  <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="add to wishlist">
                    <TbJewishStar />
                  </a>
                </div>
              </div>
              <div className="pt-4 pb-3 px-4">
                <a href="#">
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">Guyer Chair</h4>
                </a>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl text-primary font-semibold">$45.00</p>
                  <p className="text-sm text-gray-400 line-through">$55.90</p>
                </div>
                <div className="flex items-center">
                  <div className="flex gap-1 text-sm text-yellow-400">
                    {[...Array(5)].map((_, starIndex) => (
                      <span key={starIndex}><i className="fa-solid fa-star"></i></span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
              </div>
              <a href="#" className="block w-full py-1 text-center text-white bg-blue-500 border border-primary rounded-b hover:bg-blue-500 hover:text-white transition">Add to cart</a>
            </div>
          ))} */}
          {pageData?.map((product, index) => (
            <div
              key={product.SKU}
              className="bg-white rounded-lg overflow-hidden group shadow-xl ease-in duration-150 hover:scale-110"
            >
              <div className="relative">
                <img
                  src={require('./Components/photo/' + product.id + '.png')}
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
                    href={`/products/${product?.Type}/${product?.id}`}
                    className="text-white text-lg w-9 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-gray-800 transition"
                    title="view product"
                  >
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
                <a href={`/products/${product?.Type}/${product?.id}`}>
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
                
                {/* <div className="flex items-center">
                  <div className="flex gap-1 text-sm text-yellow-400">
                    {[...Array(5)].map((_, starIndex) => (
                      <span key={starIndex}>
                        <FaStar />
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div> */}
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


      <div className="md:px-[5rem] px-5"><RequestEstimate /> </div>
      <Footer />
      <Toaster />
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
    </div>
  );
}

export default App;
