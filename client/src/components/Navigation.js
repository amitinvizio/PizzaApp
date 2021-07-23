import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from '../pages/Home'
import ProductsPage from '../pages/ProductsPage'
import Cart from '../pages/Cart'
import SingleProduct from '../pages/SingleProduct'
import CartContext from '../CartContext'

const logoStyle = {
  height: 80,
}

const cartStyle = {
  background: '#F59E0D',
  display: 'flex',
  padding: '6px 12px',
  borderRadius: '50px'
}

const Navigation = () => {
  return (
    <>
      <Router>
        <CartContext.Provider value={{ name: 'Amit Gupta' }}>
          <nav className="container mx-auto flex items-center justify-between py-5">
            <Link to="/">
              <img style={logoStyle} src="/images/logo.jpg" alt="logo" />
            </Link>
            <ul className="flex items-center">
              <li className="ml-6">
                <Link to="/">Home</Link>
              </li>
              <li className="ml-6"><Link to="/products">Products</Link></li>
              <li className="ml-6">
                <Link to="/cart">
                  <div style={cartStyle}>
                    <span className="ml-2">10</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/" component={Home} exact>
            </Route>
            <Route path="/products" component={ProductsPage}>
            </Route>
            <Route path="/product/:uniqueId" exact component={SingleProduct}></Route>
            <Route path="/cart" component={Cart}>
            </Route>
          </Switch>
        </CartContext.Provider>
      </Router>
    </>
  )
}

export default Navigation
