import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import Rating from './Rating';
import { listProductDetails } from '../Actions/productAction'
import LoaderBox from "../Components/LoaderBox";
import MessageBox from "../Components/MessageBox";

function ProductDetails() {

    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
   
    const { id } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    const handleAddToCart = ()=>{
        if(userInfo){
            navigate(`/cart/${id}?qty=${qty}`, qty);
        }else{
            navigate("/login");
        }
    }

    return (
        <div>
            {loading ? (
                <LoaderBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <Container>
                    <Link to="/" className="btn btn-light">
                        <i className="fas fa-arrow-left    "></i>
                        &nbsp; GO BACK
                    </Link>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h3>{product.name}</h3>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} Reviews`}
                                    />
                                </ListGroupItem>
                                <ListGroupItem>Price : ${product.price}</ListGroupItem>
                                <ListGroupItem>{product.description}</ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status :</Col>
                                    <Col>
                                        {product.countInStock > 0 ? "In Stock " : "out of stock"}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            {product.countInStock > 0 && (
                                <ListGroupItem>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control 
                                                as="select"
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}
                                            >
                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )}
                            <ListGroupItem>
                                <Button
                                    className="btn-block"
                                    type="button" style={{ width: "17vw" }}
                                    onClick={handleAddToCart} qty={qty}
                                >
                                    Add to cart
                                </Button>
                            </ListGroupItem>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    )
}

export default ProductDetails