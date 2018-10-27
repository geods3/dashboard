import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Grid } from "react-bootstrap";
import "../app.css";
import Navigation from "./common/Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Course from "./Course";
import AddNewCourse from "./AddNewCourse";
import EditCourse from "./EditCourse";
import NotFound from "./common/NotFound";

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
 export default App