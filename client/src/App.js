import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import SigninPage from "./pages/SigninPage/AuthPages/SigninPage";


const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/product/:id" component={ProductPage} />
                <Route exact path="/cart/:id?" component={CartPage} />
                <Route exact path="/signin" component={SigninPage} />
            </Switch>
        </Router>
    );
};

export default App;