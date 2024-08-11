import React, { useState, useEffect } from "react";
import Headers from './Components/Headers';
import Footer from './Components/Footer';
import 'tailwindcss/tailwind.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import 'boxicons/css/boxicons.min.css';


function Charity() {
    const baseImages = {
        'Flat Foundation': 'https://signaturefurnitureoutlet.com/Golden/img/1x/bases__flat-foundation.png',
        'Ease': 'https://signaturefurnitureoutlet.com/Golden/img/1x/bases__ease.png',
        'Tempur-Ergo': 'https://signaturefurnitureoutlet.com/Golden/img/1x/bases__tempur-ergo.png',
        'Tempur-Ergo Extend': 'https://signaturefurnitureoutlet.com/Golden/img/1x/bases__tempur-ergo-extend.png'
    };

    const baseNames = ['Flat Foundation', 'Ease', 'Tempur-Ergo', 'Tempur-Ergo Extend'];
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
                        href="/special"
                        className={`transition-all cursor-pointer border-b border-transparent hover:border-blue-700 text-sm text-secondary hover:text-blue-700 `}
                    >
                        Special
                    </a>
                    <i className="bx bx-chevron-right text-sm text-secondary px-2"></i>
                    <p
                        className={`transition-all cursor-pointer border-b border-transparent hover:border-blue-700 text-sm text-secondary hover:text-blue-700 `}
                    >
                        2020 Golden Elegant
                    </p>
                </div>

            </div>
            <div className="md:px-[10%] px-4">
                {/* Hero Section */}
                <div className=" bg-cover bg-center p-5 md:mx-[10%]" style={{ backgroundImage: `url('https://signaturefurnitureoutlet.com/Golden/img/2x/hero@2x.jpg')` }}>
                    <div className="relative z-10 py-16 flex flex-col md:items-start item-center justify-center md:border-[7px] border-yellow-500">
                        <img className=" absolute top-0 md:right-[30px] right-0 md:h-[130px] flex item-center justify-center md:w-[130px] w-[60px] " src="https://signaturefurnitureoutlet.com/Golden/img/SVG/sealy-logo--blue.svg" alt="Sealy logo" onError={(e) => { e.target.onerror = null; e.target.src = 'https://signaturefurnitureoutlet.com/Golden/img/2x/sealy-logo--blue@2x.png'; }} />
                        <div className="bg-blue-900 opacity-90 p-6 rounded-lg text-center ml-5 ">
                            <img className="mx-auto mb-4 opacity-100" src="https://signaturefurnitureoutlet.com/Golden/img/SVG/golden-elegance-logo--white.svg" alt="Golden Elegance by Sealy logo" onError={(e) => { e.target.onerror = null; e.target.src = 'https://signaturefurnitureoutlet.com/Golden/img/2x/golden-elegance-logo--white@2x.png'; }} />
                            <h4 className="text-xl opacity-100 text-white font-semibold">A Great Night’s Sleep Starts with</h4>
                            <p className="text-3xl font-semibold opacity-100 text-left text-white">quality,<br /> comfort, <br /><span className="whitespace-nowrap">&amp; support</span></p>
                            <a href="#" className=" opacity-100 mt-4 font-semibold  inline-block bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700">Shop Now</a>
                        </div>
                    </div>
                </div>
                {/* //Hero Section */}

                {/* Targeted Support */}
                <div className="py-20">
                    <img className="mx-auto mb-6" src="https://signaturefurnitureoutlet.com/Golden/img/1x/posturepedic.png" srcSet="https://signaturefurnitureoutlet.com/Golden/img/1x/posturepedic.png 1x, https://signaturefurnitureoutlet.com/Golden/img/2x/posturepedic@2x.png 2x" alt="Posturepedic Support illustration" />
                    <div className="text-center flex flex-col items-center justify-center">
                        <h2 className="text-3xl font-semibold">Targeted Support</h2>
                        <p className="text-lg text-gray-600">we've got your back (and core)</p>
                        <p className="mt-4 text-lg max-w-[350px] text-center">Half of your body weight rests in the middle of the mattress while you sleep. That’s why Sealy® mattresses reinforce the center to better support your back and core.</p>
                    </div>
                </div>
                {/* //Targeted Support */}

                {/* Crown Jewel */}
                <div className="py-20">
                    <div className="text-center mb-10">
                        <img className="mx-auto mb-4 h-[200px]" src="https://signaturefurnitureoutlet.com/Golden/img/2x/golden-elegance-logo--gold.png" alt="Golden Elegance logo" />
                        <h2 className="text-2xl font-semibold uppercase">Rest easy on 140 years of enduring quality</h2>
                    </div>

                    <div className="accordion-container mx-auto max-w-4xl">
                        {['BASIC', 'VALUE', 'PERFORMANCE', 'HYBRID'].map((series, index) => (
                            <div key={index} className="mb-6">
                                <input type="checkbox" id={`chck${index}`} className="hidden" />
                                <label htmlFor={`chck${index}`} className="block bg-gray-200 p-4 text-lg font-semibold cursor-pointer">
                                    {series}
                                </label>
                                <div className="bg-white p-6 border-t">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-xl font-semibold">{series} series</h3>
                                            <p className="text-lg text-gray-600">Description and details for {series} series.</p>
                                            <ul className="mt-4 space-y-2">
                                                <li><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Feature 1</li>
                                                <li><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Feature 2</li>
                                                <li><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Feature 3</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <img className="w-full h-auto" src={`https://signaturefurnitureoutlet.com/Golden/img/1x/golden-elegance-${series.toLowerCase()}.png`} srcSet={`https://signaturefurnitureoutlet.com/Golden/img/1x/golden-elegance-${series.toLowerCase()}.png 1x, https://signaturefurnitureoutlet.com/Golden/img/2x/golden-elegance-${series.toLowerCase()}@2x.png 2x`} alt={`${series} Series mattress`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* //Crown Jewel */}

                {/* Image */}
                {/* //Image */}
                <div className=" bg-cover bg-center p-5 md:mx-[10%]" style={{ backgroundImage: `url('https://signaturefurnitureoutlet.com/Golden/img/1x/mother-daughter-on-sealy-bed.jpg')` }}>
                    <div className="relative z-10 py-16 flex flex-col md:items-left item-center justify-center md:border-[7px] border-white ">
                        <div className=" p-6 rounded-lg text-center ml-5 py-16 md:w-[350px] ">
                            {`.`}
                        </div>
                    </div>
                </div>

                {/* Adjustable Bases */}
                <div className="py-20 bg-gray-200 px-3 mx-2 my-3">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold uppercase">give your bed a lift</h2>
                        <p className="text-lg text-gray-600">with a foundation or adjustable base</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg mb-10">Give your new mattress a lift with the right base. Add one of these options to your bed and step up to a new level of comfort.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {baseNames.map((base, index) => (
                                <div key={index} className="bg-white p-4 shadow rounded-lg text-center">
                                    <img className="mx-auto mb-4" src={baseImages[base]} alt={base} />
                                    <p className="text-lg font-semibold">{base}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center mt-10">
                        <a href="#" className="inline-block bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600">Shop Bases</a>
                    </div>
                </div>
                <div className=" bg-cover bg-center p-5 md:mx-[10%]" style={{ backgroundImage: `url('https://signaturefurnitureoutlet.com/Golden/img/2x/sealy_lifestyle@2x.jpg')` }}>
                    <div className="relative z-10 py-16 flex flex-col md:items-left item-center justify-center md:border-[7px] border-yellow-500 ">
                        <img className=" absolute top-0 md:right-[30px] right-0 md:h-[130px] flex item-center justify-center md:w-[130px] w-[60px] " src="https://signaturefurnitureoutlet.com/Golden/img/SVG/sealy-logo--blue.svg" alt="Sealy logo" onError={(e) => { e.target.onerror = null; e.target.src = 'https://signaturefurnitureoutlet.com/Golden/img/2x/sealy-logo--blue@2x.png'; }} />
                        <div className="bg-blue-900 opacity-90 p-6 rounded-lg text-center ml-5 py-16 md:w-[350px] ">
                            <h4 className="text-xl opacity-100 text-white font-semibold">Ready to lie down and test a mattress?</h4>
                            <p className="text-3xl font-semibold opacity-100 text-left text-white">Stop in today to talk to one of our sales associates.<br /></p>
                            <a href="#" className=" opacity-100 mt-4 font-semibold  inline-block bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700">Shop Now</a>
                        </div>
                    </div>
                </div>
                {/* //Last Call */}
            </div>
            <div><Footer /> </div>
        </div>
    )
}

export default Charity
