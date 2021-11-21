import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import SigninPage from "./pages/AuthPages/SigninPage";
import RegisterPage from "./pages/AuthPages/RegisterPage";
import ShippingAddressPage from "./pages/ShippingAddressPage/ShippingAddressPage";


const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/product/:id" component={ProductPage} />
                <Route exact path="/cart/:id?" component={CartPage} />
                <Route exact path="/signin" component={SigninPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/shipping" component={ShippingAddressPage} />
            </Switch>
        </Router>
    );
};

export default App;