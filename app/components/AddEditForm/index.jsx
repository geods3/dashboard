import React, { Component } from "react";
import Header from "../common/Header";
import LoadingComponent  from "../common/Loader";
import MyFormInput from "./components/MyFormInput";
import moment from 'moment';
import uniqid from 'uniqid';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import { Form, FormGroup, FormControl, Checkbox, InputGroup, Glyphicon, ControlLabel, Button, Well } from "react-bootstrap";

class AddEditForm extends Component{

    state = this.props.vars
  
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
            <MyFormInput id="title" placeholder="Title" title="Title" value={this.state.title} onChange={this.handleChange} />
            <MyFormInput id="duration" placeholder="Duration" title="Duration" value={this.state.duration} onChange={this.handleChange} />
            <MyFormInput id="imagePath" placeholder="Image path" bsSize="small" title="Image path" value={this.state.imagePath} onChange={this.handleChange} />

            <Checkbox id="open" checked={this.state.open} onChange={this.handleCheckChange}> Bookable</Checkbox>
            <FormGroup controlId="instructors" bsSize="small">
              <ControlLabel>Instructors</ControlLabel>
              <Checkbox id="01" checked={ _.includes(this.state.instructors, "01")} onChange={this.InstructorsChange}> John Tsevdos</Checkbox>
              <Checkbox id="02" checked={ _.includes(this.state.instructors, "02")} onChange={this.InstructorsChange}> Yiannis Nikolakopoulos</Checkbox>
            </FormGroup>
            <FormGroup controlId="description" bsSize="small">
              <ControlLabel>Description</ControlLabel>
              <FormControl componentClass="textarea" style={{height: 100}} value={this.state.description} onChange={this.handleChange} placeholder="Description" />
            </FormGroup>
            <FormGroup>
              <ControlLabel style={{fontSize: 22}}>Dates</ControlLabel>
            </FormGroup>
            <FormGroup controlId="startDate" bsSize="small" validationState={this.state.startDateValidation}>
              <ControlLabel>Start Date</ControlLabel>
              <SingleDatePicker
                  id="startDate"
                  small={true}
                  block={true}
                  openDirection="down"
                  displayFormat= "DD/MM/YYYY"
                  hideKeyboardShortcutsPanel={true}
                  date={this.state.dates.start_date ? moment(this.state.dates.start_date): moment()} // momentPropTypes.momentObj or null
                  onDateChange={  date => this.dateChange(date, 'startDate') } // PropTypes.func.isRequired
                  focused={this.state.focused} // PropTypes.bool
                  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
              />
            </FormGroup>
            <FormGroup controlId="endDate" bsSize="small">
              <ControlLabel>End Date</ControlLabel>
              <SingleDatePicker
                  id="endDate"
                  small={true}
                  block={true}
                  openDirection="down"
                  displayFormat= "DD/MM/YYYY"
                  hideKeyboardShortcutsPanel={true}
                  date={this.state.dates.end_date ? moment(this.state.dates.end_date): moment()} // momentPropTypes.momentObj or null
                  onDateChange={date => this.dateChange(date, 'endDate') } // PropTypes.func.isRequired
                  focused={this.state.focused2} // PropTypes.bool
                  onFocusChange={({ focused: focused2 }) => this.setState({ focused2 })} // PropTypes.func.isRequired
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel style={{fontSize: 22}}>Price</ControlLabel>
            </FormGroup>
            <FormGroup bsSize="small">
              <ControlLabel>Early Bird</ControlLabel>
              <InputGroup style= {{zIndex: 0}}>
                <FormControl 
                  id="earlybird"
                  type="text" 
                  placeholder="Early Bird" 
                  value={this.state.price.early_bird || 0} 
                  onChange={this.handlePriceChange} 
                  type="number" 
                />
                <InputGroup.Addon>
                  <Glyphicon glyph="euro" />
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
            <FormGroup bsSize="small">
              <ControlLabel>Normal</ControlLabel>
              <InputGroup style= {{zIndex: 0}}>
                <FormControl 
                  id="normal"
                  type="text" 
                  placeholder="Normal" 
                  value={this.state.price.normal || 0} 
                  onChange={this.handlePriceChange} 
                  type="number" 
                />
                <InputGroup.Addon>
                  <Glyphicon glyph="euro" />
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
            <FormGroup className="text-right" bsSize="small">
              <Button type="submit" bsStyle='primary' >Submit</Button>
            </FormGroup>
                      
          </Form>
        </Well>
      );
    }
  }

  export default AddEditForm