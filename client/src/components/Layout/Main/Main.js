import React from 'react';
import {Container} from "react-bootstrap";

import './Main.scss'
import Products from "../Products/Products";

const Main = () => {
    return (
        <main className='main'>
            <Container>
                <div className="main-wrapper">
                    <Products />
                </div>
            </Container>
        </main>
    );
};

export default Main;