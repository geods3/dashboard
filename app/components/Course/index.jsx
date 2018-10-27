import React, { Component } from "react";
import Info from "./components/Info";
import Instructors from "./components/Instructors"
import LoadingComponent  from "../common/Loader";
import NotFound from "../common/NotFound";
import _ from "lodash";
import axios from "axios";

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
                <Instructors  instructors = {this.state.instructors}/>
            </>
      );
    }
}

export default Course;