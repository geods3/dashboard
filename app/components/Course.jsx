import React, { Component } from "react";
import renderHTML from "react-render-html";
import { Link } from "react-router-dom";
import Header from "./common/Header";
import exists from 'node-file-exists';
import LoadingComponent  from "./common/Loader";
import { Row, Col, Image, Glyphicon, Button } from "react-bootstrap";
import NotFound from "./common/NotFound";
import _ from "lodash";
import axios from "axios";


const Info = (props) => {
 
  return (
        <>
            <Header title={props.title} info={props.id}/>
            <Row>
              <Col md={12}>
                <Image src={ (exists(props.imagePath) || _.startsWith(props.imagePath, 'http')) ? props.imagePath : '/img/noimage.png'  } className='courseImage' />
              </Col>
            </Row>
            <Row style={{marginTop: 10}}>
              <Col md={6}>
                <Row>
                  <Col md={12}>
                    <span className="courseSpan">Price: {props.price.normal} €</span>
                  </Col>
                  <Col md={12}>
                    <span className="courseSpan">Bookable: {props.open ? <Glyphicon glyph="ok" />  : ""}</span>
                  </Col>
                </Row>
              </Col>
              <Col md={6} className="text-right">
                <Row>
                  <Col md={12}>
                    <span className="courseSpan">Duration: {props.duration}</span>
                  </Col>
                  <Col md={12}>
                    <span className="courseSpan">Dates: {new Date(props.dates.start_date).toLocaleDateString("el-GR")} - { new Date(props.dates.end_date).toLocaleDateString("el-GR") }</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{marginTop: 20}}>
              <Col md={12}>
                <span style={{fontSize: 20}}>{ renderHTML(props.description)}</span>
              </Col>
            </Row>
            <Row style={{marginTop: 15}}>
              <Col md={12}>
                <Link to={`/Course/edit/${props.id}`}>
                  <Button bsStyle="primary" bsSize="large">Edit</Button>
                </Link>
                  <Button bsStyle="danger" bsSize="large" onClick={props.deleteCourse} style={{marginLeft: 5}}>Delete</Button>
              </Col>
            </Row>
        </>
  );
};

const Instructos = (props) => {
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

class Course extends Component{

    state = {
      loading: true,
      notFound: false,
      title: null
    }

    componentDidMount() {
      this.setState({loading: true, notFound: false});

      axios.get(`http://localhost:3000/courses/${this.props.match.params.id}`).then(res => {
        axios.get("http://localhost:3000/instructors/").then(res2 => {
          const instructors = _.filter(res2.data, function(o) { if (_.includes(res.data.instructors, o.id)) return o ; });
          this.setState({ loading: false, notFound: false, ...res.data, instructors });
        }).catch(error => {
          this.setState({ loading: false, notFound: true });
        });
            
      }).catch(error => {
        this.setState({ loading: false, notFound: true });
      });
    }

    deleteCourse = ()=>{ 
      axios.delete(`http://localhost:3000/courses/${this.props.match.params.id}`).then(res => {
        this.props.history.goBack()
      }).catch(error => {
        console.log('error')
      });
    }


    render() {

      if (this.state.loading) {
        return <LoadingComponent />;
      }

      if (this.state.notFound) {
        return <NotFound />;
      }
        
      return (
            <>
                <Info {...this.state} deleteCourse={this.deleteCourse} />
                <Instructos  instructors = {this.state.instructors}/>
            </>
      );
    }
}

export default Course;