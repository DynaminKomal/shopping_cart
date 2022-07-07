import React from 'react'
import { Alert } from "react-bootstrap";

function MessageBox(props) {
    const { variant, children } = props
  return (
    <Alert variant={variant}>{children}</Alert>
  )
}

export default MessageBox