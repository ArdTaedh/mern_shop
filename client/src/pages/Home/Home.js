import React from 'react';

import './Home.scss'
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";

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