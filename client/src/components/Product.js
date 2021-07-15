import React from 'react'

const Product = () => {
  return (
    <>
      <div>
        <img src="/images/logo.jpg" alt="pizza" />
        <div className="text-center">
          <h2 className="text-lg font-bold py-2">Pepproni Pizza</h2>
          <span className="bg-gray-200 py-1 rounded-full text-sm px-4">Large</span>
        </div>
        <div className="flex jsutify-between items-center mt-4">
          <span class="font-bold text-lg">&#x20B9; 800</span>
          <button className="bg-yellow-500 py-1 px-4 rounded-full font-bold">Add</button>
        </div>
      </div>
    </>
  )
}

export default Product
