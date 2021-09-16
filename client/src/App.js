import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import ProductScreen from "./components/Layout/Products/ProductScreen/ProductScreen";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/product/:id">
                    <ProductScreen />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;