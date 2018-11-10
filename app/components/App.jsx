import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Grid } from "react-bootstrap";
import Navigation from "./common/Navigation";
import NotFound from "./common/NotFound";
import LazyRoute from "./common/LazyRoute";

const Dashboard = lazy(() => import('./Dashboard'));
const Courses = lazy(() => import('./Courses'));
const Course = lazy(() => import('./Course'));
const AddNewCourse = lazy(() => import('./AddNewCourse'));
const EditCourse = lazy(() => import(/* webpackChunkName: "EditCourse" */'./EditCourse'));


class App extends Component {

  render() {
    
    return (
      <BrowserRouter>
        <>
          <Navigation />
          <Grid className="fluid">
            <Switch>
              <LazyRoute path="/" component= {Dashboard} exact/>
              <LazyRoute path="/Courses" component= {Courses} />
              <LazyRoute path="/Course/:id" component= {Course} exact/>
              <LazyRoute path="/AddNewCourse" component= {AddNewCourse} />
              <LazyRoute path="/Course/edit/:id" component= {EditCourse} />
              <Route component= {NotFound} />
            </Switch>
          </Grid>
        </>
      </BrowserRouter>
    );
  }

}
 export default App