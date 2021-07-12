import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const logoStyle = {
  height: 100,
}

const Navigation = () => {
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-5">
        <Router>
          <Link to="/">
            <img style={logoStyle} src="/images/logo.jpg" alt="logo" />
          </Link>
          <ul className="flex items-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li><Link to="/">Products</Link></li>
            <li>
              <Link to="/cart">
                <div>
                  <span>10</span>
                  <img style={logoStyle} src="/images/logo2.jpg" alt="cart" />
                </div>
              </Link>
            </li>
          </ul>
          <Switch>
            <Route>
            </Route>
            <Route>
            </Route>
            <Route>
            </Route>
          </Switch>
        </Router>
      </nav>
    </>
  )
}

export default Navigation
