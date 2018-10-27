import React, { Component } from "react";
import Hero from "./components/Hero";
import StatItem from "./components/StatItem";
import CourseTable from "./components/CourseTable";
import LoadingComponent  from "../common/Loader";
import _ from "lodash";
import axios from "axios";

class Dashboard extends Component{

  state = {
    loading: true,
    stats: {
      instructors: 0,
      courses: 0,
      events: 0,
      students: 0
    },   
    courses: []
  }

  componentDidMount() {
    this.setState({loading: true});
    const stats = new Object();
    const courses = new Array();

    axios.get("http://localhost:3000/db").then(res => {
      _.forEach(res.data.stats, function(value, key) { stats[value.title] = value.amount; });
      _.forEach(res.data.courses, function(value, key) { courses.push(value); });
      this.setState({ loading: false, stats, courses });
    });
  }

  render() {

    if (this.state.loading) {
      return <LoadingComponent />;
    }

    const courses = this.state.courses;

    return (
      <>
          <Hero />
          <StatItem {...this.state.stats} />
          <CourseTable courses={courses} />
      </>
    );
  }
}

export default Dashboard;