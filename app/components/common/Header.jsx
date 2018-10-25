import React from "react";
import { Row, Col } from "react-bootstrap";

const Header = (props) => {
  return (
    <Row>
      <Col md={12}>
        <h1 {...props}>{props.title}  {props.info ? <span className='courseTitleId'>({props.info})</span> : ""}</h1>
      </Col>
    </Row>
  );

};

export default Header;