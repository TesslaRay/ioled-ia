import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

//Mayerial UI cssBaseline.
import CssBaseline from '@material-ui/core/CssBaseline';

// Components.
import Navbar from './Navbar';

const style = {
	CssBaseline: {
		backgroundColor: '#DEE1E6'
	}
}

class App extends Component {
    
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

export default App;
