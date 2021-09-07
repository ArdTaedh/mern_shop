import React from 'react';

import './Home.scss'
import Header from "../../components/Layout/Header/Header";
import Main from "../../components/Layout/Main/Main";
import Footer from "../../components/Layout/Footer/Footer";

const Home = () => {
    return (
        <div className='homepage'>
            <Header />
            <Main />
            <Footer />
        </div>
    );
};

export default Home;