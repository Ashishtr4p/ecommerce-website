import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import myImage from './card.png';
import myImage5 from './card/card.png';

function Footer() {
  return (
    
    <div className="px-4 pt-16 lg:px-8 bg-black text-white border-t">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4 container mx-auto">
        <div className="sm:col-span-2">
          <a href="/" className="block" >
            <img src={myImage} alt="Los Angeles" className='h-[120px] bg-white p-2 rounded' />
          </a>
          <div className="mt-6 lg:max-w-sm">
            <div className='flex space-x-2 mt-3'>
              
            <img src={myImage5} className='rounded bg-white ' alt="Los Angeles" style={{ height: '20px' }} />
            </div>
          </div>
        </div>
        <div className="p-2 flex flex-wrap">
          <a href="/" className="text-white mb-1 mr-4">
            Home
          </a>
          <a href="/about" className="text-white mb-1 mr-4">
            Company
          </a>
          {/* Add the mb-1 class to add margin-bottom between links */}
          <a href="/contact" className="text-white mb-1 mr-4">
            Contact
          </a>
          <a href="/review" className="text-white mb-1 mr-4">
            Reviews
          </a>
        </div>
        <div>
          <span className="text-base font-bold tracking-wide text-white">Social</span>
          <div className="flex items-center mt-1 space-x-3">
            <a
              href="#"
              className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a
              href="#"
              className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="#"
              className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <i className="bi bi-yelp"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row container mx-auto">
        <p className="text-sm text-white">
        Copyright © 2024 website name . All rights reserved.
        </p>
        
      </div>
    </div>
  )
}

export default Footer;
