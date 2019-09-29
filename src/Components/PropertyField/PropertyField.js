import React from "react";
import "./PropertyField.css";

export default function PropertyField(props) {
  return (
    <div className="PropertyField">
      <div className="Property">
        <label htmlFor={props.id}> {props.name}: </label>
      </div>

      <div className="PropertyInput">
        <input type={props.type} id={props.id} placeholder={props.placeholder} />
      </div>
    </div>
  )
}
