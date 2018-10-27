import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Grid } from "react-bootstrap";
import "./app.css";
import Navigation from "./components/common/Navigation";
import Dashboard from "./components/Dashboard";
import Courses from "./components/Courses";
import Course from "./components/Course";
import AddNewCourse from "./components/AddNewCourse";
import EditCourse from "./components/EditCourse";
import NotFound from "./components/common/NotFound";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <>
          <Navigation />
          <Grid className="fluid">
            <Switch>
              <Route path="/" component= {Dashboard} exact/>
              <Route path="/Courses" component= {Courses} />
              <Route path="/Course/:id" component= {Course} exact/>
              <Route path="/AddNewCourse" component= {AddNewCourse} />
              <Route path="/Course/edit/:id" component= {EditCourse} />
              <Route component= {NotFound} />
            </Switch>
          </Grid>
        </>
      </BrowserRouter>
    );
  }

}


ReactDOM.render( <App />, document.getElementById("app"));