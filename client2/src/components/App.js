import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Action Creators.
import {fetchUser} from '../actions';

//Mayerial UI cssBaseline.
import CssBaseline from '@material-ui/core/CssBaseline';

// Import Components.
import Navbar from './Navbar';

const style = {
	CssBaseline: {
		backgroundColor: '#DEE1E6'
	}
}

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
			<React.Fragment>
				<CssBaseline/>
				<BrowserRouter>
					<Navbar />
				</BrowserRouter>
			</React.Fragment>
		);
	}
}

// Connect this component to redux and the action creators.
export default connect(
	null,
	{fetchUser}
)(App);
