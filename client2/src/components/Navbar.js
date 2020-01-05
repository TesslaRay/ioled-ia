//@ts-nocheck
import React, {Component} from 'react';
import ioledLogo from '../images/logo.png';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Material-ui component styles.
const styles = () =>
	createStyles({
		root: {
			position: 'relative',
		},
		appbar: {
			backgroundColor: '#2C3145',
			borderRadius: '0px 0px 5px 5px',
		},
		logo: {
			width: '110px',
			margin: '-10px',
		},
		avatar: {
			margin: '0 10px',
		},
		toolbarName: {
			margin: 'auto',
			color: 'light-green',
		},
		circular: {
			color: 'green',
		},
		logout: {
			color: '#6B757E',
			fontSize: '12px',
		},
		button:{
			color: 'white'
		}
	});

class Navbar extends Component {
	// String capitalization.
	capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}	
	// Render the component.
	render() {
		const {classes, user} = this.props;
		return (
			<div className={classes.root}>
				<AppBar className={classes.appbar} position="static">
					<Toolbar>
						{/* Lado izquierdo del nabvar*/}
						<a href={user ? '/dashboard' : '/'} style={{flexGrow: 1}}>
							<img className={classes.logo} src={ioledLogo} alt="ioled" />
						</a>

						{/*Lado derecho del navBar*/}
						<a href='https://ioled-dev-248517.appspot.com/' style={{flexgrow: 1}}>
							<Button className={classes.button}>Mi iOLED</Button>
						</a>
						<a href='https://www.ioled.cl/' style={{flexgrow: 1}}>
							<Button className={classes.button}>WEB iOLED</Button>
						</a>

					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default (withStyles(styles)(Navbar));
