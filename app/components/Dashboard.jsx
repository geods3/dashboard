import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Badge, Jumbotron, Table, ListGroup, ListGroupItem, Panel, Button, Glyphicon } from "react-bootstrap";
import LoadingComponent  from "./common/Loader";
import _ from "lodash";
import axios from "axios";

const Hero = () => {
  return (
    <Jumbotron>
      <h2>Welcome to Code.Hub Dashboard!</h2>
      <p>Manage everything and have fun!</p>
    </Jumbotron> 
  );
};

const  StatItem = (props) => {

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

const CourseTable = (props) =>{
  const courses = props.courses.slice(-5);

  const courseList = courses.map(function(course){
   
    return (
      <tr key={course.id}>
        <td className="text-center"><Glyphicon glyph="info-sign" /> </td>
        <td>{course.title}</td>
        <td>{course.open ? <Glyphicon glyph="ok" />  : ""}</td>
        <td>{course.price.normal} €</td>
        <td>{new Date(course.dates.start_date).toLocaleDateString("el-GR")} - { new Date(course.dates.end_date).toLocaleDateString("el-GR") }</td>
        <td className="text-center">
          <Link to={`/Course/${course.id}`}>
            <Button bsSize="xsmall" bsStyle="info">View details</Button>
          </Link>
        </td>
      </tr>
    );
  });
   
  return (
        <>
            <Panel bsStyle='primary'>
              <Panel.Heading className="tableHeading">Last 5 Courses</Panel.Heading>
              <Panel.Body className='zeroPadding' style={{overflowX: "auto"}}>
                <Table striped bordered condensed hover className="zeroMargin">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Ttile</th>
                      <th>Bookable</th>
                      <th>Price</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseList}
                  </tbody>
                </Table>
              </Panel.Body>
              <Panel.Footer className="tableFooter" >
                <Link to={"/courses/"}>
                  <Button className="pull-right" bsStyle="primary" style={{marginRight: 12}} >View All</Button>
                </Link>
              </Panel.Footer>
            </Panel>
        </>
  );
    

};

class Dashboard extends Component{

    state = {
      loading: true,
      stats: {
        instructors: 0,
        courses: 0,
        events: 0,
        students: 0
      },   
      courses: []
    }

    componentDidMount() {
      this.setState({loading: true});
      const stats = new Object();
      const courses = new Array();

      axios.get("http://localhost:3000/db").then(res => {
        _.forEach(res.data.stats, function(value, key) { stats[value.title] = value.amount; });
        _.forEach(res.data.courses, function(value, key) { courses.push(value); });
        this.setState({ loading: false, stats, courses });
      });
    }

    render() {

      if (this.state.loading) {
        return <LoadingComponent />;
      }

      const courses = this.state.courses;

      return (
            <>
                <Hero />
                <StatItem {...this.state.stats} />
                <CourseTable courses={courses} />
            </>
      );
    }
}

export default Dashboard;