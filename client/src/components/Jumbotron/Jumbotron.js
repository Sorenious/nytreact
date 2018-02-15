import React from "react";

const Jumbotron = ({ children }) =>
  <div style={{ height: 300, clear: 'both', backgroundColor: '#20315A', textAlign: 'center' }} className="jumbotron">
    {children}
  </div>;

export default Jumbotron;
