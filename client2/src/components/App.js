import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

// Action Creators.
import { fetchUser } from "../actions";

//Mayerial UI cssBaseline.
import CssBaseline from "@material-ui/core/CssBaseline";

// Import Components.
import Navbar from "./Navbar";
import SignIn from "./SignIn";

const style = {
  CssBaseline: {
    backgroundColor: "#DEE1E6"
  }
};

class App extends Component {
  /* This call fetch user on component first mount.
   * It is better location than componentWillMount,
   * since the last is called multiple times.
   */
  componentDidMount() {
    this.props.fetchUser();
  }

  // Render the navbar depending the auth state.
  authRender() {
    const { user } = this.props;
    switch (user) {
      case null:
        return <SignIn />;
      case false:
        return <SignIn />;
      default:
        return <Navbar />;
    }
  }

  // Render the component.
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        {this.authRender()}
        {/* <BrowserRouter>
					<Navbar />
					<SignIn/>
				</BrowserRouter> */}
      </React.Fragment>
    );
  }
}

// Connect this component to redux and the action creators.
export default connect(null, { fetchUser })(App);
