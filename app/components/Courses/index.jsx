import React, { Component } from "react";
import CourseList from "./components/CourseList";
import Header from "../common/Header";
import LoadingComponent  from "../common/Loader";
import axios from "axios";

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