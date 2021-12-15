import React from 'react';
import {Spinner} from "react-bootstrap";

const Loading = (props) => {
    return (
            <Spinner animation="grow" variant="secondary" style={{ backgroundColor: '#A2AEBB'} && props.style} />
    );
};

export default Loading;