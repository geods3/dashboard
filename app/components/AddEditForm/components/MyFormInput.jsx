import React from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const MyFormInput = (props) => {
    return (
        <FormGroup controlId={props.id} bsSize={props.bsSize || 'small'}>
            <ControlLabel>{props.title}</ControlLabel>
            <FormControl
            type={props.type ||"text"}
            value={props.value}
            placeholder={props.placeholder || props.title}
            onChange={props.onChange}
            />
        </FormGroup>
    )
}

export default MyFormInput;