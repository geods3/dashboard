import React from "react";
import renderHTML from "react-render-html";
import { Link } from "react-router-dom";
import Header from "../../common/Header";
import exists from 'node-file-exists';
import { Row, Col, Image, Glyphicon, Button } from "react-bootstrap";
import _ from "lodash";

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

export default Info;