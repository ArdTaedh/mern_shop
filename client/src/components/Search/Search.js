import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";

import classes from './Search.module.scss'
import {AiOutlineSearch} from "react-icons/all";

const Search = (props) => {
    const [name, setName] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        props.history.push(`/search/name/${name}`)
    }

    return (
        <Form
            className={classes['search-form']}
            onSubmit={submitHandler}
        >
            <Form.Group
                className={classes['search-form__row']}
            >
                <Form.Control

                    type="text"
                    id="query"
                    onChange={(e) => setName(e.target.value)}
                />
                <Button
                    className={classes['search-btn']}
                    variant="outline-secondary"
                    type="submit"
                >
                    <AiOutlineSearch />
                </Button>
            </Form.Group>
        </Form>
    );
};

export default Search;