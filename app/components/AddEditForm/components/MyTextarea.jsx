import React from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const MyTextarea = (props) => {
    return (
        <FormGroup controlId={props.id} bsSize={props.bsSize || 'small'}>
            <ControlLabel>{props.title}</ControlLabel>
            <FormControl 
            componentClass="textarea" 
            style={{height: props.height || 100}} 
            value={props.value} 
            onChange={props.onChange} 
            placeholder={props.placeholder || props.title}
            />
        </FormGroup>
    )
}

export default MyTextarea;