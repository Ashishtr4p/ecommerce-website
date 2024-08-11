import React from 'react'

function PageNotFound() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
    <img src="https://s3.us-east-2.amazonaws.com/sc-prod-embedded.salescaptain.com/resources/2023-07-22/sales_captain_1690015901642.png" alt="Company Logo" className="h-12 w-68 absolute top-5 left-7 " />
    <h1 className="text-6xl font-extrabold">
      <span role="img" aria-label="Error Emoji" className="text-yellow-500">
        😔
      </span>
      <span className="text-4xl text-gray-300">404</span>
    </h1>
    <p className="text-2xl mt-4">
      <span className="text-gray-300">Page not found</span>
    </p>
    <p className="text-lg mt-4">
      Sorry, the page you are looking for does not exist.
    </p>
    <button
      className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400"
      onClick={() => {
        // Implement a navigation action or go back to a specific page
        window.history.back();
      }}
    >
      Go Back
    </button>
  </div>
  )
}

export default PageNotFound
