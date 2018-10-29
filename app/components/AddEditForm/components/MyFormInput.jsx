import React from "react";
import { FormGroup, FormControl, ControlLabel, InputGroup, Glyphicon } from "react-bootstrap";

const MyFormInput = (props) => {
    return (
        !props.icon ?
        <FormGroup controlId={props.id} bsSize={props.bsSize || 'small'}>
            <ControlLabel>{props.title}</ControlLabel>
            <FormControl
            type={props.type ||"text"}
            value={props.value}
            placeholder={props.placeholder || props.title}
            onChange={props.onChange}
            />
        </FormGroup>
        :
        <FormGroup>
            <ControlLabel>{props.title}</ControlLabel>
            <InputGroup style= {{zIndex: 0}} bsSize={props.bsSize || 'small'}>
                <FormControl 
                    id={props.id}
                    type={props.type ||"text"}
                    value={props.value || ((props.type === 'number') ? 0 : '')} 
                    placeholder={props.placeholder || props.title}   
                    onChange={props.onChange}
                />
                <InputGroup.Addon>
                    <Glyphicon  glyph={props.icon} />
                </InputGroup.Addon>
        </InputGroup>
        </FormGroup>
    )
}

export default MyFormInput;