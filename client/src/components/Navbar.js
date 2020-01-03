//@ts-nocheck
import React, {Component, Fragment} from 'react';
import ioledLogo from '../images/logo.png';
import {connect} from 'react-redux';


// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';


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
			width: '140px',
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
			color: 'white',
			'&:hover':{
				border:'3px solid white',
				boxSizing: 'border-box',
				borderRadius: 50
			}
		},		
	});

class Navbar extends Component {
	// String capitalization.
	capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}	

	// Render the navbar depending the auth state.
	authRender() {
		const {classes} = this.props;
		const {login = false} = this.props;

		switch (login) {
			case null:
				return (
					<Fragment>
						<CircularProgress className={classes.circular} />
					</Fragment>
				);
			case false:
				return (
					<Fragment>
						<Button href="/auth/google">Login with Google</Button>
					</Fragment>
				);
			default:
				return (
					<Fragment>
						imagen
						<Button href="">
							Logout
						</Button>
					</Fragment>
				);
		}
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
						
						{this.authRender()}														
						
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

const mapStateToProps = ({user}) => {
	return {user};
};

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
