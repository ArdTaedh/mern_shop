import React from 'react';
import {Container} from "react-bootstrap";

import './Main.scss'

const Main = (props) => {
    return (
        <main className='main'>
            <Container>
                <div className="main-wrapper">
                    {props.children}
                </div>
            </Container>
        </main>
    );
};

export default Main;