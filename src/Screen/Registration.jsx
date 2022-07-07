import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import LoaderBox from "../Components/LoaderBox";
import MessageBox from "../Components/MessageBox";
import { register } from '../Actions/userAction'
import FormContainer from '../Components/FormContainer';

function Registration() {
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error } = userRegister;

    

    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch
        if (password !== confirmPassword) {
            setMessage("Password do not match");
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <>
            <FormContainer>
                <h1>Register</h1>
                {error && <MessageBox varient="danger">{error}</MessageBox>}
                {loading && <LoaderBox />}
                {message && <MessageBox variant="danger">{message}</MessageBox>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Re-enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" varient="primary">
                        SING IN
                    </Button>
                </Form>
                <Row>
                    <Col>
                        Have an account !
                        <Link to="/login">
                            Login
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    );
}

export default Registration