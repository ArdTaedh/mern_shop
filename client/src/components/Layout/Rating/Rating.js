import React from 'react';

import classes from "./Rating.module.scss";

const Rating = ({rating, reviews}) => {

    return (
        <div className={classes["card-rating"]}>
            <span>
                <i
                className={
                    rating >=1
                        ? "fa fa-star"
                        : rating >=0.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'
                }
                />
            </span>
            <span>
                <i
                className={
                    rating >=2
                        ? "fa fa-star"
                        : rating >=0.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'
                }
                />
            </span>
            <span>
                <i
                className={
                    rating >=3
                        ? "fa fa-star"
                        : rating >=0.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'
                }
            /></span>
            <span>
                <i
                className={
                    rating >=4
                        ? "fa fa-star"
                        : rating >=0.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'
                }
            /></span>
            <span>
                <i
                className={
                    rating >=5
                        ? "fa fa-star"
                        : rating >=0.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'
                }
            /></span>
            <div className={classes.reviews}>
                {reviews} відгуків
            </div>
        </div>
    );
};

export default Rating;