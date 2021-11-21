import React from 'react';
import {Spinner} from "react-bootstrap";

const Loading = () => {
    return (
            <Spinner animation="grow" variant="secondary" style={{ backgroundColor: '#A2AEBB'}} />
    );
};

export default Loading;