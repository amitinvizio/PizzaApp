import React from 'react'
import { Link } from 'react-router-dom'

const Product = (props) => {
  const { product } = props
  return (
    <>
      <Link to={`/product/${product.uniqueId}`} >
        <div className="max-w-sm rounded overflow-hidden shadow-2xl transition duration-500 ease-in-out bg-blue-600 hover:bg-yellow-500 transform hover:-translate-y-1 hover:scale-110">
          <div class="w-full">
            <img src={product.image} alt="pizza" className="object-fill h-48 w-full"></img>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold py-2">{product.name}</h2>
            <span className="bg-gray-200 py-1 rounded-full text-sm px-4">{product.size}</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold text-lg ml-2">&#x20B9; {product.price} </span>
            <button className="bg-yellow-500 py-1 mr-1 mb-2 px-4 rounded-full font-bold">Add</button>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Product
