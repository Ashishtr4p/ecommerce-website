import React from 'react';
import Headers from './Components/Headers';
import Footer from './Components/Footer';
import awards from './Components/home1.png';
import owner1 from './Components/contact1.png';
import owner2 from './Components/contact2.png';

function About() {
  return (
    <div className="">
      <div><Headers /> </div>
      <div className='py-4 md:py-8'>
        <div className='text-center font-bold  flex-col flex item-center justify-cente'>
          <span className="md:text-[25px] text-[17px]">ABOUT SIGNATURE FURNITURE OUTLET </span>
        </div>
      </div>
	  <section className="bg-blue-400 sm:h-[80vh] sm:max-h-[500px] sm:mb-[50px]">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 p-2">
              <img src={owner1} alt="Owner" className="sm:h-[90vh] sm:max-h-[550px] sm:relative sm:top-[-30px] rounded-[6%]" />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center" style={{ paddingInline: '5% 10%' }}>
              <div className=" text-white text-left">
                <p className="font-bold text-2xl">Commitment to excellence in Dallas , TX</p>
                <div className="mt-4">
                  <p>Signature Furniture Outlet of Dallas is proud to announce that we are now offering hand-made Amish Style furniture made in the USA. These bedroom groups are made of the best solid hardwood furniture making it built to last a life time. In addition to our solid hardwood furniture, we continue to offer the best most affordable bedroom, living room and dining room options in North Texas. If you are concerned about not having the funds to refurnish your home, not to worry, we offer payment options and will ensure it's within your budget. Call or come and see us soon. Thank you for choosing Signature Furniture Outlet of Dallas.</p>
                  <p className="font-semibold">Customer satisfaction guaranteed</p>
                  <p>We will lose sleep if our customers are not happy. Let us help you on your next project.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-400 sm:h-[80vh] sm:max-h-[500px] sm:mt-[50px]">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 flex items-center justify-center p-2" style={{ paddingInline: '5% 10%' }}>
              <div className="p-2 text-white text-left">
                <p className="font-bold text-2xl">Why should you choose us?</p>
                <div className="mt-4">
                  <p className="font-semibold">Signature Furniture OutleT does a great job</p>
                  In-House Design Consultants<br />
Commitment to Excellence<br />
Family Owned & Operated<br />
Knowledgeable Staff<br />
Large Selection of In-stock Products Available<br />
                   </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-2">
              <img src={owner2} alt="Owner" className="sm:h-[90vh] sm:max-h-[550px] sm:relative sm:top-[-30px] rounded-[6%]" />
            </div>
          </div>
        </div>
        </section>

      <div><Footer /> </div>
    </div>
  )
}

export default About
