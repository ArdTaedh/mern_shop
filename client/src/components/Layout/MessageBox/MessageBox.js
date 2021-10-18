import React from 'react';
import {Alert} from "react-bootstrap";

const MessageBox = (props) => {
    return (
        <Alert variant={props.variant || 'info'} className={props.className}>
            {props.children}
        </Alert>
    );
};

export default MessageBox;