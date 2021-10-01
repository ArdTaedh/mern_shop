import React from 'react';

import './Home.scss'
import Header from "../../components/Layout/Header/Header";
import Main from "../../components/Layout/Main/Main";
import Footer from "../../components/Layout/Footer/Footer";
import Products from "../../components/Layout/Products/Products";

const Home = () => {
    return (
        <div className='homepage'>
            <Header />
            <Main>
                <Products />
            </Main>
            <Footer />
        </div>
    );
};

export default Home;