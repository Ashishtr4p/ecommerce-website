import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { menu, close } from 'ionicons/icons';

const FilterComponent = ({
  uniqueBrand,
  uniqueWidth,
  formData,
  id,
  setFormData,
  handleSubmit,
  setfilterModal,
  Type,
}) => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => {
      const prevArray = prevData[name] || [];
      if (checked) {
        return {
          ...prevData,
          [name]: [...prevArray, value],
        };
      } else {
        return {
          ...prevData,
          [name]: prevArray.filter((item) => item !== value),
        };
      }
    });
  };

  const handleReset = () => {
    setFormData({
      Types: id,
      SubType: [],
      Brand: [],
      Price: { min: 0, max: 10000 },
    });
    setPriceRange({ min: 0, max: 1000 });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({
      ...prevRange,
      [name]: Number(value),
    }));
    setFormData((prevData) => ({
      ...prevData,
      Price: {
        ...prevData.Price,
        [name]: Number(value),
      },
    }));
  };

  useEffect(() => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = formData[checkbox.name]?.includes(checkbox.value) || false;
    });
  }, [formData]);

  return (
    <div className="col-span-12 md:col-span-3 lg:w-full max-md:max-w-md max-md:mx-auto inset-0 overflow-y-auto overflow-x-hidden md:overflow-y-hidden lg:h-fit w-[100vh] h-[100vh]">
      <div className="box lg:rounded-xl border border-gray-300 bg-white p-6 w-full  md:max-w-sm">
        <div className="flex justify-between">
          <h6 className="font-medium text-base leading-7 text-black mb-5 mt-[30px] md:mt-3">Filter By</h6>
          {Type != undefined && (
           <IonIcon icon={close} onClick={() => { setfilterModal(false); }} className="text-3xl text-slate-800  mt-[30px]  cursor-pointer " />
          )}
        </div>
        
        <form className="max-w-sm flex-col px-3" onSubmit={handleSubmit}>
          <div className="mb-5">
            <p className="font-medium text-sm leading-7 text-black mb-2">Category</p>
            {uniqueWidth.map((item) => (
              <div key={item.SubType} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={item.SubType}
                  name="SubType"
                  value={item.SubType}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 border-gray-300 rounded"
                />
                <label htmlFor={item.SubType} className="ml-2 text-sm font-medium text-gray-900">
                  {item.SubType}
                </label>
              </div>
            ))}
          </div>
          <div className="mb-5">
            <p className="font-medium text-sm leading-7 text-black mb-2">Manufacturers</p>
            {uniqueBrand.map((item) => (
              <div key={item.Brand} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={item.Brand}
                  name="Brand"
                  value={item.Brand}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 border-gray-300 rounded"
                />
                <label htmlFor={item.Brand} className="ml-2 text-sm font-medium text-gray-900">
                  {item.Brand}
                </label>
              </div>
            ))}
          </div>
          <div className="mb-5">
            <p className="font-medium text-sm leading-7 text-black mb-2">Price Range</p>
            <div className="flex items-center mb-2">
              <input
                type="number"
                id="minPrice"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                className="h-10 border border-gray-300 text-gray-900 text-xs font-medium rounded-md block w-1/2 py-2.5 px-4 mr-2"
                placeholder="Min Price"
              />
              <input
                type="number"
                id="maxPrice"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                className="h-10 border border-gray-300 text-gray-900 text-xs font-medium rounded-md block w-1/2 py-2.5 px-4"
                placeholder="Max Price"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="btn btn bg-slate-100 hover:bg-slate-300 text-slate-900 p-2 rounded-xl"
              onClick={handleReset}
            >
              Reset
            </button>
            <button type="submit" className="btn ml-2 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-xl">
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterComponent;
