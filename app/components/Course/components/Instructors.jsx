import React from "react";
import { Row, Col } from "react-bootstrap";
import _ from "lodash";

const Instructors = (props) => {
  const instructors = props.instructors;

  const courseList = instructors.map(function(instructor){
    return (
      <div className="card" key={instructor.id}>
        <h3>{instructor.name.first} {instructor.name.last} <span style={{ fontSize: 16, color: "darkgray"}}>({instructor.dob})</span></h3>
        <div>Email: <a href={`mailto:${instructor.email}?Subject=Hello`} target="_blank">{instructor.email}</a> | <a href={instructor.linkedin} target="_blank">Linkedin</a></div>
        <div>{instructor.bio}</div>
      </div>
    );
  });

  return (
    <>
        <Row>
          <Col md={12}>
            <h2>Instructors</h2>
          </Col>
        </Row>
        <Row>
          <Col md={12} style={{marginBottom: 20}}>
            <div className="scrolling-wrapper">
              {courseList}                       
            </div>
          </Col>
        </Row>
    </>
  );
};

export default Instructors;