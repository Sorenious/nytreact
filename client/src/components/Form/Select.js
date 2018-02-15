import React from "react";

export const Select = props =>
  <div className="form-group">
  	<label>{props.label}</label>
    <select className="form-control" {...props}>
    	{props.children}
    </select>
  </div>;
