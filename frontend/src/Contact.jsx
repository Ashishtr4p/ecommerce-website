import React from 'react';
import Headers from './Components/Headers';
import Footer from './Components/Footer';
import Request from './Components/requestEstimate';

function Contact() {
    return (
        <div className=" ">
            <div><Headers /> </div>
            <div className="text-center font-bold p-4 flex-col flex item-center justify-center">
                <span className="text-4xl">Contact us</span>
                <small className="  flex item-center justify-center">GET IN TOUCH WITH THE FLOORING PROFESSIONALS AT OLIVER FLOORING</small>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full md:w-8/12"><Request /></div>
                <div className="w-full md:w-4/12 p-4">
                    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold">Store Info</h2>
                            <p className="text-gray-600">Address</p>
                            <p className="text-gray-800">3213 Dawes Dr. Dallas, TX, 75211</p>
                            <a
                                href="https://maps.app.goo.gl/y23SvS7cfyuG1pRx7"
                                target="_blank"
                                className="btn btn-primary btn-lg active flex justify-center items-center py-2 px-4 bg-blue-500 text-white rounded-full mt-2"
                                role="button"
                                rel="noreferrer"
                            >
                                Get directions
                            </a>
                        </div>
                        <div>
                            <p className="text-gray-600">Phone</p>
                            <p className="text-gray-800">214-330-8066</p>
                        </div>
                        <div className="mb-4">
                            <a
                                href="tel:+12143308066"
                                className="btn btn-primary btn-lg active flex justify-center items-center py-2 px-4 bg-blue-500 text-white rounded-full mt-2"
                                role="button"
                            >
                                Call us
                            </a>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-600">Timings</p>
                            <p className="text-gray-800">
                                Mon-Sat: 10am-7pm<br />
                                Sun: 1-5pm
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-2">
                <div className="map-responsive">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1678.2220864316887!2d-96.8742312!3d32.7273945!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c213e66fee361%3A0xdd58fe1845f471cf!2sSignature%20Furniture!5e0!3m2!1sen!2sin!4v1721717647370!5m2!1sen!2sin"
                        title="example"
                        width="100%"
                        height="450"
                        frameBorder="0"
                        allowFullScreen
                    />
                </div>
            </div>

            <div><Footer /> </div>
        </div>
    )
}

export default Contact
