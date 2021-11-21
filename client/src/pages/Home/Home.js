import React from 'react';

import './Home.scss'
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import Products from "../../components/Products/Products";
import {Helmet} from "react-helmet";

const Home = () => {
    return (
        <div className='homepage'>
            <Helmet>
                <title>E-Store</title>
            </Helmet>
            <Header />
            <Main>
                <Products />
            </Main>
            <Footer />
        </div>
    );
};

export default Home;