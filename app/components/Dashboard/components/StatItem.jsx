import React from "react";
import { Row, Col, Badge, ListGroup, ListGroupItem } from "react-bootstrap";
import _ from "lodash";

const StatItem = (props) => {

  const stat = props.stats.map(function(stat){
    return (
      <Col md={3} key={stat.id}>
        <ListGroup>
          <ListGroupItem>
            <Badge>{stat.amount}</Badge>
            {stat.title.toUpperCase()}
          </ListGroupItem>
        </ListGroup>
      </Col>
    );
  });

  return <Row className="StatsRow">{stat}</Row>;
  
};

export default StatItem;