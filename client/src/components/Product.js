import React from 'react'
import { Link } from 'react-router-dom'

const Product = (props) => {
  const { product } = props
  return (
    <>
      <Link to={`/product/${product.uniqueId}`} >
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div class="w-full">
            <img src={product.image} alt="pizza" className="object-fill h-48 w-full"></img>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold py-2">{product.name}</h2>
            <span className="bg-gray-200 py-1 rounded-full text-sm px-4">{product.size}</span>
          </div>
          <div className="flex jsutify-between items-center mt-4">
            <span className="font-bold text-lg">&#x20B9; {product.price} </span>
            <button className="bg-yellow-500 py-1 px-4 rounded-full font-bold right-0.5">Add</button>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Product
