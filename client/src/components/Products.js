import React from 'react'
import Product from './Product'
import { useState, useEffect, useContext } from 'react'
import CartContext from '../CartContext'

const Products = () => {
  const { name } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3001/product')
    .then(response => response.json())
    .then(products => {
      setProducts(products.data) 
    })
  }, [])


  return (
    <>
      <div className="container mx-auto pb-24">
        <h1 className="text-lg font-bold my-8">Products</h1>
        <div className="grid grid-cols-3 my-8 gap-20">
          {
            products.map(product => <Product key={product.uniqueId} product={product} />)
          }
        </div>
      </div>
    </>
  )
}

export default Products