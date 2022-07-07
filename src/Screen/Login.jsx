import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import LoaderBox from "../Components/LoaderBox";
import MessageBox from "../Components/MessageBox";
import { login } from '../Actions/userAction'
import FormContainer from '../Components/FormContainer';


function Login() {
    const navigate = useNavigate()

    let [inputs, setInputs] = useState({
        email: "", password: ""
    })

    const handleInputs = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(inputs.email, inputs.password));
    };

    return (
        <>
            <FormContainer>
                <h1>SIGN IN</h1>
                {error && <MessageBox varient="danger">{error}</MessageBox>}
                {loading && <LoaderBox />}
                {/* {Loader} */}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={inputs.email}
                            onChange={handleInputs}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={inputs.password}
                            onChange={handleInputs}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" varient="primary">
                        SING IN
                    </Button>
                </Form>
                <Row>
                    <Col>
                        New Customer ?
                        <Link to="/register">
                            Register
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default Login