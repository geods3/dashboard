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
    const courses = [];

    axios.get("http://localhost:3000/db").then(res => {
      _.forEach(res.data.courses, function(value, key) { courses.push(value); });
      this.setState({ loading: false, stats: res.data.stats, courses });
    });
  }

  render() {

    if (this.state.loading) {
      return <LoadingComponent />;
    }

    const {courses , stats} = this.state;
    return (
      <>
          <Hero />
          <StatItem stats={stats} />
          <CourseTable courses={courses} />
      </>
    );
  }
}

export default Dashboard;