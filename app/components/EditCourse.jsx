import React, { Component } from "react";
import AddEditForm from './AddEditForm';
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

class EditCourse extends Component{

  componentWillMount() {
    this.setState({loading: true});

    axios.get(`http://localhost:3000/courses/${this.props.match.params.id}`).then(res => {
     
      this.setState({ loading: false, ...res.data });   
    }).catch(error => {
      this.setState({ loading: false});
    });
  }

  saveForm = (values)=>{ 
    
    this.setState({loading: true});
    axios.put(`http://localhost:3000/courses/${this.props.match.params.id}`,{...values}).then(res => {
      this.setState({ loading: false});
      this.props.history.goBack()
    }).catch(error => {
      this.setState({ loading: false});
    });
  }

  render() {
  
    const info = this.props.match.params.id

    return(
      <AddEditForm vars={this.state} saveForm={this.saveForm} title="Edit Course" info={info}/>
    )
  }
}

export default EditCourse;