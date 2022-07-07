import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
function Footer() {
  return (
    <Container>
        <Row>
            <Col className='text-center' md={12}>
                <span className='text-center'>
                    Copyright
                </span>
            </Col>
        </Row>
    </Container>
  )
}

export default Footer