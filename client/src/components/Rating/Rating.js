import React from 'react';

import classes from "./Rating.module.scss";

const Rating = ({rating, reviews, caption, className}) => {

    return (
        <div className={className ? className : classes["card-rating"]}>
            <span>
                <i
                className={
                    rating >=1
                        ? "fa fa-star"
                        : rating >= 0.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'
                }
                />
            </span>
            <span>
                <i
                className={
                    rating >= 2
                        ? "fa fa-star"
                        : rating >= 1.5
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
                        : rating >=2.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'
                }
            />
            </span>
            <span>
                <i
                className={
                    rating >=4
                        ? "fa fa-star"
                        : rating >=3.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'
                }
            />
            </span>
            <span>
                <i
                className={
                    rating >=5
                        ? "fa fa-star"
                        : rating >=4.5
                            ? 'fa fa-star-half-o'
                            : 'fa fa-star-o'
                }
            />
            </span>
            {caption ? <p style={{ marginLeft: "0.5rem"}}>{caption}</p> : (
                <div className={classes.reviews}>
                    {reviews} відгуків
                </div> )
            }
        </div>
    );
};

export default Rating;