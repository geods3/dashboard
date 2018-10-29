import React from "react";
import { FormGroup, Button } from "react-bootstrap";

const MyButton = (props) => {
    return (
        <FormGroup className={props.right ? "text-right" : ''} bsSize={props.bsSize || 'small'}>
            <Button type={props.type} bsStyle={props.bsSize ||'primary' } onClick={props.onClick}>{props.title}</Button>
        </FormGroup>
    )
}

export default MyButton;