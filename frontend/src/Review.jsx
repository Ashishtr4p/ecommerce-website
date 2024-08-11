import React, { useEffect } from 'react';
import Headers from './Components/Headers';
import Footer from './Components/Footer';

function About() {
  return (
    <div className="">
      <Headers />
      <div className='p-4'>
        <div className='text-center font-bold p-4 flex flex-col items-center justify-center'>
          <span style={{ fontSize: '25px' }}>REVIEWS</span>
        </div>
      </div>
      <div id="salescaptain-review-widget"></div>
      <Footer />
    </div>
  );
}

export default About;
