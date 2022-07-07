import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from './Product'
import { listProducts } from '../Actions/productAction'
import LoaderBox from "../Components/LoaderBox";
import MessageBox from "../Components/MessageBox";


function Home() {

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error , products} = productList;
  
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <div>
      {loading ? (
        <LoaderBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Row>
          { 
            products.map((product) => (
              <Col key={product._id} md={3}>
                <Product product={product} />
              </Col>
            ))
          }
        </Row>
      )}
    </div>

  )
}

export default Home