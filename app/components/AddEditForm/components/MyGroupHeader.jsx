import React from "react";
import { FormGroup, ControlLabel } from "react-bootstrap";

const MyGroupHeader = (props) => {
    return (
        <FormGroup>
            <ControlLabel style={{fontSize: props.fontSize || 22 ,...props.style}} >{props.title}</ControlLabel>
        </FormGroup>
    )
}

export default MyGroupHeader;