import React from "react";

const Panel = props =>
  <div className="panel panel-primary">
	  <div className="panel-heading">
	    <h3 className="panel-title"><strong>{props.title}</strong></h3>
	  </div>
	  <div className="panel-body">
	  	{props.children}
	  </div>
  </div>;

export default Panel;
