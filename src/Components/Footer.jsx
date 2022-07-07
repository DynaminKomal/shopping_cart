import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
function Footer() {
  return (
    <Container>
        <Row>
            <Col className='text-center' md={12}>
                <span className='text-center'>
                    Copyright 2022
                </span>
            </Col>
        </Row>
    </Container>
  )
}

export default Footer