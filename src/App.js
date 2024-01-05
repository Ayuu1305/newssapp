import React, { Component } from "react";
import Navbar from "./components/Navbar";
import New from "./components/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

class App extends Component {
  pageSize = 5;

  state={
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
      />
          <Routes>
            <Route
              exact
              path="/"
              element={<New setProgress={this.setProgress}  key="general" pageSize={this.pageSize} country="us" category="general" />}
            />
            <Route
              exact
              path="/business"
              element={<New setProgress={this.setProgress}  key="business" pageSize={this.pageSize} country="us" category="business" />}
            />
            <Route
              exact
              path="/entertainment"
              element={<New setProgress={this.setProgress}  key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />}
            />
            <Route
              exact
              path="/general"
              element={<New setProgress={this.setProgress}  key="general" pageSize={this.pageSize} country="us" category="general" />}
            />
            <Route
              exact
              path="/health"
              element={<New setProgress={this.setProgress}  key="health" pageSize={this.pageSize} country="us" category="health" />}
            />
            <Route
              exact
              path="/science"
              element={<New setProgress={this.setProgress}  key="science" pageSize={this.pageSize} country="us" category="science" />}
            />
            <Route
              exact
              path="/sports"
              element={<New setProgress={this.setProgress}  key="sports" pageSize={this.pageSize} country="us" category="sports" />}
            />
            <Route
              exact
              path="/technology"
              element={<New setProgress={this.setProgress}  key="technology" pageSize={this.pageSize} country="us" category="technology" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
