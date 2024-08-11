import React from 'react'
import Home from '../Home'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import NotFound from '../PageNotFound.jsx'

import About from '../About.jsx'
import Contact from '../Contact.jsx'
import Review from '../Review.jsx'
import Special from '../Special.jsx'
import Cart from '../Cart.jsx'
import Login from '../Login.jsx'
import Productlist from '../productlist.jsx'
import PoductDetail from '../PoductDetail.jsx'
import Charity from '../Charity.jsx'
import Acima from '../Acima.jsx'
import GoldenElegant from '../GoldenElegant'
import UserDetail from '../UserDetail.jsx'
import Wishlist from '../Wishlist.jsx'
import ResetPassword from '../ResetPassword.jsx'


const AllRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/review' element={<Review/>}></Route>
      <Route path='/special' element={<Special/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/account' element={<Login/>}></Route>
      <Route path='/products/:id' element={<Productlist/>}></Route>
      <Route path='/products/:id/:pid' element={<PoductDetail/>}></Route>
      <Route path='/charityevent' element={<Charity/>}></Route>
      <Route path='/acima' element={<Acima/>}></Route>
      <Route path='/goldenelegant' element={<GoldenElegant/>}></Route>
      <Route path='/account/account-details' element={<UserDetail/>}></Route>
      <Route path='/account/wishlist' element={<Wishlist/>}></Route>
      <Route path='/resetpassword/:id' element={<ResetPassword/>}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
