import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

const SingleProduct = () => {
  const [product, setProducts] = useState({})
  const params = useParams()
  const history = useHistory()

  useEffect(() => {
    fetch(`/product/${params.uniqueId}`)
      .then(res => res.json())
      .then(product => {
        setProducts(product.data)
      })
}, [])

return (
  <>
    <div className="container mx-auto pt-12">
      <button className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4" onClick={() => { history.goBack() }}>Back</button>
      <div className="flex">
        <img src={product.image} alt="pizza" className="w-1/2" />
        <div className="ml-16">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="text-md">{product.size}</div>
          <div className="font-bold mt-2">&#x20B9; {product.price}</div>
          <button className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4">Add to Cart</button>
        </div>
      </div>
    </div>
  </>
)
}

export default SingleProduct
