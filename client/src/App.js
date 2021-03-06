import React, {useEffect} from 'react';
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
import PaymentMethodPage from "./pages/PaymentMethodPage/PaymentMethodPage";
import PlaceOrderPage from "./pages/PlaceOrderPage/PlaceOrderPage";
import OrderPage from "./pages/OrderPage/OrderPage.js";
import OrderHistoryPage from "./pages/OrderHistoryPage/OrderHistoryPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage/ProductEditPage";
import OrderListPage from "./pages/OrderListPage/OrderListPage";
import UserListPage from "./pages/UserListPage/UserListPage";
import UserEditPage from "./pages/UserEditPage/UserEditPage";
import SellerRoute from "./components/Routes/SellerRoute";
import SellerPage from "./pages/SellerPage/SellerPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import {useDispatch} from "react-redux";
import {listProductCategories} from "./store/actions/productActions";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProductCategories())
    }, [dispatch])

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/product/:id" component={ProductPage}/>
                    <Route exact path="/cart/:id?" component={CartPage}/>
                    <Route exact path="/signin" component={SigninPage}/>
                    <Route exact path="/register" component={RegisterPage}/>
                    <Route exact path="/shipping" component={ShippingAddressPage}/>
                    <Route exact path="/payment" component={PaymentMethodPage}/>
                    <Route exact path="/placeorder" component={PlaceOrderPage}/>
                    <Route exact path="/order/:id" component={OrderPage}/>
                    <Route exact path="/orders" component={OrderHistoryPage}/>
                    <PrivateRoute exact path="/profile" component={ProfilePage}/>
                    <AdminRoute exact path="/product-list" component={ProductListPage}/>
                    <SellerRoute
                        exact
                        path="/product-list/seller"
                        component={ProductListPage}
                    />
                    <Route exact path="/product/:id/edit" component={ProductEditPage}/>
                    <AdminRoute exact path="/order-list" component={OrderListPage}/>
                    <AdminRoute exact path="/user-list" component={UserListPage}/>
                    <AdminRoute exact path="/user/:id/edit" component={UserEditPage}/>
                    <AdminRoute exact path="/order-list" component={OrderListPage}/>
                    <SellerRoute exact path="/dashboard" component={DashboardPage} />
                    <SellerRoute path="/order-list/seller" component={OrderListPage}/>
                    <Route exact path="/seller/:id" component={SellerPage}/>
                    <Route exact path="/search/name/:name?" component={SearchPage} />
                    <Route exact path="/search/category/:category" component={SearchPage} />
                    {/*<Route exact path="/search/category/:category/name/:name" component={SearchPage} />*/}
                    {/*<Route exact path="/search/category/:category/name/:name/min/:min/max/:max" component={SearchPage} />*/}
                    {/*<Route exact path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating" component={SearchPage} />*/}
                    <Route exact path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order" component={SearchPage} />
                </Switch>
            </Router>
        </>
    );
};

export default App;