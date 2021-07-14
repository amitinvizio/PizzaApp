import React from 'react'

const Products = () => {
  return (
    <>
      <div className="container mx-auto pb-24">
        <h1 className="text-lg font-bold my-8">Products</h1>
        <div className="grid grid-cols-5 my-8 gap-24">
          <div>
            <img src="/images/logo.jpg" alt="pizza" />
            <h2 className="">Pepproni Pizza</h2>
            <span className="">Large</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products