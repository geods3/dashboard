import React from "react";
import { Checkbox } from "react-bootstrap";

const MyCheckbox = (props) => <Checkbox id={props.id} checked={props.checked} onChange={props.onChange}> {props.title}</Checkbox>

export default MyCheckbox;