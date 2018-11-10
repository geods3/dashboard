import React from "react";
import { Row, Col } from "react-bootstrap";

const ErrorComponent = (props) => {
  return (
    <>
      <Row style={{fontWeight: 'bold'}}>
        <Col md={12}>{props.error.message}</Col>
      </Row>
      <Row style={{marginTop:20}}>
        <Col md={12}>{props.error.stack}</Col>
      </Row>
    </>
  )
};

export default ErrorComponent;