import React, { Component } from "react";
import Header from "../common/Header";
import LoadingComponent  from "../common/Loader";
import MyFormInput from "./components/MyFormInput";
import MyCheckbox from "./components/MyCheckbox";
import MyTextarea from "./components/MyTextarea";
import MyGroupHeader from "./components/MyGroupHeader";
import MyDatebox from "./components/MyDatebox";
import MyButton from "./components/MyButton";
import moment from 'moment';
import uniqid from 'uniqid';
import { Form, Well } from "react-bootstrap";

class AddEditForm extends Component{

    state = this.props.vars || {
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
  
    componentWillReceiveProps(nextProps){
      this.setState(nextProps.vars) 
    }
  
    componentWillMount = () => {
      if (this.state.id === '') this.setState({ id : uniqid()})
    }
  
    handleChange = (e) => { 
      this.setState({ [e.target.id] : e.target.value });
    }
  
    handleCheckChange = (e) => { 
      this.setState({ [e.target.id] : e.target.checked});
    }
  
    InstructorsChange = (e) => { 
      const newInstructors = [...this.state.instructors];
      if (!_.includes(this.state.instructors, e.target.id)) {
        newInstructors.push(e.target.id)
      } else {
        _.remove(newInstructors, function(item) {
            return item === e.target.id;
        }); 
      }
      this.setState({ 'instructors' : newInstructors});
    }
  
    dateChange = (e, from) => { 
      const newDates = Object.assign({}, this.state.dates);
      if(from === 'startDate') {  newDates.start_date = moment(e).format('YYYY-MM-DD');  } else { newDates.end_date = moment(e).format('YYYY-MM-DD'); }
      this.setState({ dates : newDates});
    }
  
    handlePriceChange = (e) => { 
      const newPrice = Object.assign({}, this.state.price);
  
      const value = e.target.value ? parseInt(e.target.value) : 0;
      if(e.target.id === 'earlybird') {  newPrice.early_bird = value;  } else { newPrice.normal = value}
      this.setState({ price : newPrice});
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      const savedata = Object.assign({}, _.omit(this.state, ['focused', 'focused2','loading']));
      this.props.saveForm(savedata);            
    }
  
    render() {
  
      if (this.state.loading) {
        return <LoadingComponent />;
      }
  
      return (
        <Well>
          <Header title={this.props.title} info={this.props.info} style={{fontSize: 25}}/>
          <Form onSubmit={this.handleSubmit}>
            <MyFormInput id="title"  title="Title" value={this.state.title} onChange={this.handleChange} />
            <MyFormInput id="duration" title="Duration" value={this.state.duration} onChange={this.handleChange} />
            <MyFormInput id="imagePath" title="Image path" value={this.state.imagePath} onChange={this.handleChange} />
            <MyCheckbox id="open" checked={this.state.open} onChange={this.handleCheckChange} title="Bookable" />
            <MyGroupHeader title="Instructors" style={{marginTop: 10}} fontSize="15" />
            <MyCheckbox id="01" checked={ _.includes(this.state.instructors, "01")}  onChange={this.InstructorsChange} title="John Tsevdos" />
            <MyCheckbox id="02" checked={ _.includes(this.state.instructors, "02")}  onChange={this.InstructorsChange} title="Yiannis Nikolakopoulos" />
            <MyTextarea id="description"  title="Description" value={this.state.description} onChange={this.handleChange} />
            <MyGroupHeader title="Dates" />
            <MyDatebox 
              id="startDate" 
              value={this.state.dates.start_date} 
              onChange={this.dateChange} 
              focused={this.state.focused} 
              onFocusChange={({ focused }) => this.setState({ focused })} 
            />
            <MyDatebox 
              id="endDate" 
              value={this.state.dates.end_date} 
              onChange={this.dateChange} 
              focused={this.state.focused2} 
              onFocusChange={({ focused: focused2 }) => this.setState({ focused2 })}
            />
            <MyGroupHeader title="Price" />
            <MyFormInput 
              type="number" 
              id="earlybird" 
              title="Early Bird" 
              value={this.state.price.early_bird} 
              onChange={this.handlePriceChange} 
              icon="euro"
            />
            <MyFormInput 
              type="number" 
              id="normal" 
              title="Normal" 
              value={this.state.price.normal} 
              onChange={this.handlePriceChange} 
              icon="euro"
            />
            <MyButton right type="submit" title="Submit" />           
          </Form>
        </Well>
      );
    }
  }

  export default AddEditForm