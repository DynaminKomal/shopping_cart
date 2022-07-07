import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../Actions/cartAction'
import { Link,  useLocation, useParams } from 'react-router-dom';
import MessageBox from "../Components/MessageBox";

function Cart(props) {
  const {history} = props
  const { id } = useParams();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }

  }, [dispatch, id, qty])

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart


  const handlerRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  }

  const checkout = () => {
    history.push("/signup?redirect=shipping");
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {
            cartItems.length === 0 ? (<MessageBox variant="danger">Your Cart is empty! &nbsp;
              <Link to='/'>Go Back</Link>
            </MessageBox>) :
              (<ListGroup variant='flush'>
                {
                  cartItems.map(item => (
                    <ListGroupItem key={item.product}>
                      <Row>
                        <Col md={2} >
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={2}>$ {item.price}</Col>
                        <Col md={2}>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                          <Button type='button' variant='light' onClick={() => handlerRemoveFromCart(item.product)}>
                            <i className="fa fa-trash text-danger" aria-hidden="true"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>)
          }
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkout}
              >
                Proceed to checkOut
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Cart