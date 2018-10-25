import React, { Component } from "react";
import AddEditForm from './common/AddEditForm';
import moment from 'moment';
import axios from "axios";

var defaultState = {
  id: '',
  title: '',
  duration: '',
  imagePath: '',
  open: false,
  instructors: [],
  description: '',
  dates: {
    start_date: moment().format('YYYY-MM-DD'),
    end_date: moment().format('YYYY-MM-DD')
  },
  price: {
    normal: 0,
    early_bird: 0
  }

}

class AddNewCourse extends Component{

  state = defaultState

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
      <AddEditForm vars={this.state} saveForm={this.saveForm} title="Add Course"/>
    )
  }
}

export default AddNewCourse;