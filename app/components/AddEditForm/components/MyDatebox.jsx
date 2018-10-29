import React from "react";
import { FormGroup, ControlLabel } from "react-bootstrap";
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

const MyDatebox = (props) => {
    return (
        <FormGroup controlId={props.id} bsSize={props.bsSize || 'small'} >
            <ControlLabel>{props.title}</ControlLabel>
            <SingleDatePicker
                id={props.id}
                small={props.small || true}
                block={true}
                openDirection={props.openDirection || "down"}
                displayFormat={props.dateFormat || "DD/MM/YYYY"}
                hideKeyboardShortcutsPanel={true}
                date={props.value ? moment(props.value): moment()} // momentPropTypes.momentObj or null
                onDateChange={  date => props.onChange(date,props.id) } // PropTypes.func.isRequired
                focused={props.focused} // PropTypes.bool
                onFocusChange={props.onFocusChange} // PropTypes.func.isRequired
            />
        </FormGroup>
    )
}

export default MyDatebox;