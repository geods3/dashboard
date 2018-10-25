import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./common/Header";
import LoadingComponent  from "./common/Loader";
import exists from 'node-file-exists';
import axios from "axios";
import { Row, Col, Image, Panel, Glyphicon, Button } from "react-bootstrap";


const CourseList = (props) => {

  const listprops = props.list;

  const List = listprops.map(function(list){
    return (
      <Col md={4} key={list.id}>
        <Panel bsStyle="primary" className="courseCard">
          <Panel.Heading >{list.title}</Panel.Heading>
          <Panel.Body className='courseCardBody'>
            <Image src={(exists(list.imagePath) || _.startsWith(list.imagePath, 'http')) ? list.imagePath : '/img/noimage.png' } className='courseCardImage' />
          </Panel.Body>
          <Panel.Footer className="courseCardFooter">
            <p>Price: <b>{list.price.normal} €</b> | Bookable: {list.open ? <Glyphicon glyph="ok" />  : ""}</p>
            <p>Duration: <b>{list.duration}</b></p>
            <p>Dates: <b>{new Date(list.dates.start_date).toLocaleDateString("el-GR")} - { new Date(list.dates.end_date).toLocaleDateString("el-GR") }</b></p>
            <p className="text-right"><Link to={`/course/${list.id}`}><Button bsStyle='primary' >View</Button></Link></p>
          </Panel.Footer>
        </Panel>
      </Col> 
    );
  });

  return (
        
    <Row>
      <Col md={12} style={{marginBottom: 20}}>
        <Row>
          {List} 
        </Row>
      </Col>
    </Row>
        
  );
};

class Courses extends Component{

    state = {
      loading: true,
      list: []
    }

    componentDidMount() {
      this.setState({loading: true});

      axios.get("http://localhost:3000/courses/").then(res => {
        this.setState({ loading: false, list: res.data });   
      }).catch(error => {
        this.setState({ loading: false});
      });
    }

    render() {

      if (this.state.loading) {
        return <LoadingComponent />;
      }

      return (
            <>
                <Header title="Courses" info="all"/>
                <CourseList list = {this.state.list}/>
            </>
      );
    }
}

export default Courses;