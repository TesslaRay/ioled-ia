import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
// Action Creators.
import {fetchUser} from '../actions';
// Components.
import Navbar from './Dashboard/Navbar';
import Dashboard from './Dashboard/Dashboard';

import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
	/* This call fetch user on component first mount.
	 * It is better location than componentWillMount,
	 * since the last is called multiple times.
	 */
	componentDidMount() {
		this.props.fetchUser();
	}

	// Render the component.
	render() {
		return (
			<BrowserRouter>
				<Fragment>
					<CssBaseline />
					<Navbar />
					<Route exact path="/dashboard" component={Dashboard} />
				</Fragment>
			</BrowserRouter>
		);
	}
}

// Connect this component to redux and the action creators.
export default connect(
	null,
	{fetchUser}
)(App);
