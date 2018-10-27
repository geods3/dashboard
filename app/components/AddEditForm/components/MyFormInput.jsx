import React from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const MyFormInput = (props) => {
    return (
        <FormGroup controlId={props.id} {...props}>
            <ControlLabel>{props.title}</ControlLabel>
            <FormControl
            type="text"
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            />
        </FormGroup>
    )
}

export default MyFormInput;