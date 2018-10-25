import React, { Component } from "react";
import { Image } from "react-bootstrap";

const LoadingComponent = () => {
  return (
    <div style={{textAlign:"center"}}>
            Loading...<Image src="/img/loader.gif" style={{height: "20px", marginLeft: "5px"}} rounded />
    </div>
  );
};


export default LoadingComponent;