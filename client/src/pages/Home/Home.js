import React, {useEffect} from 'react';

import './Home.scss'
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import Products from "../../components/Products/Products";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import TopSellersListCarousel from "../../components/TopSellersList/TopSellersListCarousel";
import {topSellersList} from "../../store/actions/userActions";

const Home = () => {
    const dispatch = useDispatch()

    const sellersList = useSelector(state => state.topSellersList)
    const { loading, error, sellers } = sellersList

    useEffect(() => {
        dispatch(topSellersList())
    }, [dispatch])

    return (
        <div className='homepage'>
            <Helmet>
                <title>E-Store</title>
            </Helmet>
            <Header />
            <Main>
                <h3>Найкращі продавці</h3>
                {
                    loading
                        ? <Loading />
                        : error
                            ? <MessageBox variant="danger">{error}</MessageBox>
                            : <TopSellersListCarousel sellers={sellers} />
                }
                <Products />
            </Main>
            <Footer />
        </div>
    );
};

export default Home;