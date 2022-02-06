import React from 'react';
import classes from './TopSellersList.module.scss'
import MessageBox from "../MessageBox/MessageBox";
import {Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";

const TopSellersListCarousel = (props) => {
    return (
        <div className={classes['sellers-list__wrapper']}>
            { props.sellers.length === 0 && <MessageBox variant="danger">Продавців не знайдено</MessageBox>  }
            <Carousel variant="dark">
                {props.sellers.map(seller => (
                    <Carousel.Item
                        key={seller._id}
                    >
                        <Link to={`/seller/${seller._id}`}>
                            {
                                seller.seller.logo
                                    ? (
                                        <div className="d-flex justify-content-center h-25">
                                            <img className={classes['seller-img']} src={seller.seller.logo} alt={seller.seller.name} />
                                        </div>
                                    )
                                    : (<img className={classes['seller-img']} src={seller.seller.logo} alt={seller.seller.name} style={{ display: "hidden" }} />)
                            }
                            <Carousel.Caption>
                                <h3>{seller.seller.name}</h3>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default TopSellersListCarousel;