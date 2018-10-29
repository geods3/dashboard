import React, { Component } from "react";
import AddEditForm from './AddEditForm';
import axios from "axios";

class AddNewCourse extends Component{

  saveForm = (values)=>{ 
    this.setState({loading: true});
    axios.post("http://localhost:3000/courses/",{...values}).then(res => {
      this.setState({ loading: false});
      this.props.history.push('/') 
    }).catch(error => {
      this.setState({ loading: false});
    });
  }

  render() {
    return(
      <AddEditForm saveForm={this.saveForm} title="Add Course"/>
    )
  }
}

export default AddNewCourse;