import React from "react";
import { Row, Col, Badge, ListGroup, ListGroupItem } from "react-bootstrap";

const StatItem = (props) => {

    const { instructors, courses, events, students } = props;
  
    return (
      <Row className="StatsRow">
        <Col md={3}>
          <ListGroup>
            <ListGroupItem>
              <Badge>{students}</Badge>
                          STUDENTS:
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroupItem>
              <Badge>{courses}</Badge>
                          COURSES:
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroupItem>
              <Badge>{instructors}</Badge>
                          INSTRUCTORS:
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroupItem>
              <Badge>{events}</Badge>
                          EVENTS:
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    );
      
};

export default StatItem;