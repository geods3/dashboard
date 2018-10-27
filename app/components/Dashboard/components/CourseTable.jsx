import React from "react";
import { Table, Panel, Button, Glyphicon } from "react-bootstrap";
import { Link } from "react-router-dom";

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
         
    );
      
};

export default CourseTable;