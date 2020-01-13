import React, {Component, Fragment} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Action Creators.
import {fetchUser} from '../actions';

// Components.
import Navbar from './Dashboard/Navbar';
import Dashboard from './Dashboard/Dashboard';
import SignIn from './Dashboard/SignIn';

import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  /* This call fetch user on component first mount.
   * It is better location than componentWillMount,
   * since the last is called multiple times.
   */
  componentDidMount() {
    this.props.fetchUser();
  }

  // Render the navbar depending the auth state.
  authContentRender() {
    const {user} = this.props;
    switch (user) {
      case null:
        return (
          <Fragment>
            <SignIn />
          </Fragment>
        );
      case false:
        return (
          <Fragment>
            <SignIn />
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <Navbar />
            <Dashboard />
          </Fragment>
        );
    }
  }

  // Render the component.
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <CssBaseline />
          {this.authContentRender()}
        </Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {user};
};

// Connect this component to redux and the action creators.
export default connect(mapStateToProps, {fetchUser})(App);
