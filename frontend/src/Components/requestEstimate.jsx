import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
function RequestEstimate() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    date: null,
    products: {
      Amish: false,
      Bedroom: false,
      Dining: false,
      LuxuryVinyl: false,
      Grills: false,
      LivingRoom: false,
      Mattress: false,
      Rustic: false,
      BunkBeds: false,
      Appliances :false,
    },
    comment: '',
    keepMeUpdated: false,
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: date,
    }));
  };

  const handleCheckboxChange = (checkboxName) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      products: {
        ...prevFormData.products,
        [checkboxName]: !prevFormData.products[checkboxName],
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      //console.log(formData);
      const formresponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/form`, formData);
      alert(formresponse.data.data1);
      window.location.reload();
      window.scrollTo(0, 0);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <section className="w-full mx-auto">
  <form className="p-5 " onSubmit={handleSubmit}>
    <div className="p-5 rounded-md shadow-md">
    <span className="font-bold text-center flex items-center justify-center text-[17px]">Request an estimate</span> <br />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="py-2">
          <input
            type="text"
            className="hover:!ring-4 w-[100%] shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
                      rounded-[8px] outline-none  p-2 disabled:bg-gray-300 text-sm placeholder:text-sm
                      hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500"
            id="firstname"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div className="py-2">
          <input
            type="text"
            className="hover:!ring-4 w-[100%] shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
                      rounded-[8px] outline-none  p-2 disabled:bg-gray-300 text-sm placeholder:text-sm
                      hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500"
            id="lastname"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="py-2">
        <input
          type="number"
          className="hover:!ring-4 w-[100%] shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
          rounded-[8px] outline-none  p-2 disabled:bg-gray-300 text-sm placeholder:text-sm
          hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500"
          id="phoneNumber"
          placeholder="Phone"
          maxLength={10}
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          required
        />
      </div>
      <div className="py-2">
        <input
          type="text"
          className="hover:!ring-4 w-[100%] shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
          rounded-[8px] outline-none  p-2 disabled:bg-gray-300 text-sm placeholder:text-sm
          hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="py-2">
        <input
          type="text"
          className="hover:!ring-4 w-[100%] shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
          rounded-[8px] outline-none  p-2 disabled:bg-gray-300 text-sm placeholder:text-sm
          hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500"
          id="address"
          placeholder="1234 Main St"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="py-2">
          <input
            type="text"
            className="hover:!ring-4 w-[100%] shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
                      rounded-[8px] outline-none  p-2 disabled:bg-gray-300 text-sm placeholder:text-sm
                      hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500"
            id="city"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>
        <div className="py-2">
          <input
            type="text"
            className="hover:!ring-4 w-[100%] shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
                      rounded-[8px] outline-none  p-2 disabled:bg-gray-300 text-sm placeholder:text-sm
                      hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500"
            id="state"
            placeholder="State"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            required
          />
        </div>
        <div className="py-2">
          <input
            type="text"
            className="hover:!ring-4 w-[100%] shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
                      rounded-[8px] outline-none  p-2 disabled:bg-gray-300 text-sm placeholder:text-sm
                      hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500"
            id="zip"
            placeholder="Zip"
            value={formData.zip}
            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="py-2">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          placeholderText="Select a date"
          className="hover:!ring-4 w-[100%] shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
                      rounded-[8px] outline-none  p-2 disabled:bg-gray-300 text-sm placeholder:text-sm
                      hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 p-2"
          dateFormat="MM/dd/yyyy"
          isClearable
        />
      </div>
      <div className="py-2">
        <label htmlFor="checkpoints" className="block mb-2">
          What products are you interested in?
        </label>
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-2">
          {Object.keys(formData.products).map((productName) => (
            <div key={productName} className="form-check w-fit">
              <input
                className="hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border 
                rounded-[8px] outline-none   disabled:bg-gray-300 text-sm placeholder:text-sm
                hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500 "
                type="checkbox"
                id={productName}
                checked={formData.products[productName]}
                onChange={() => handleCheckboxChange(productName)}
              />
              <label className="-4 w-5 
                      rounded-[8px] outline-none  p-2 disabled:bg-gray-300 text-sm placeholder:text-sm" htmlFor={productName}>
                {productName}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="py-2">
        <input
          type="text"
          className="hover:!ring-4 w-[100%] shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white min-h-[40px] h-[40px] resize-y
                      rounded-[8px] outline-none  p-2 disabled:bg-gray-300 text-sm placeholder:text-sm
                      hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500"
          id="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          required
        />
      </div>
      <div className="py-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="keepMeUpdated"
            checked={formData.keepMeUpdated}
            onChange={() =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                keepMeUpdated: !prevFormData.keepMeUpdated,
              }))
            }
          />
          <label className="form-check-label pl-1" htmlFor="keepMeUpdated">
            Keep me up to date with exclusive offers.
          </label>
        </div>
      </div>
      <button
        type="submit"
        disabled={!(formData.phoneNumber.length === 10)}
        className="btn btn-primary w-full bg-blue-500 disabled:bg-slate-200 text-white py-2 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  </form>
</section>

    </div>
  );
}

export default RequestEstimate;
