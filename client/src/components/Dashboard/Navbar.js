//@ts-nocheck
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import ioledLogo from '../../images/ioled.png';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
			backgroundColor: '#f8f9fa',
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
	});

class Navbar extends Component {
	// String capitalization.
	capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	// Render the navbar depending the auth state.
	authContentRender() {
		const {classes, user} = this.props;
		switch (user) {
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
						<Typography className={classes.toolbarName}>Hola, {this.capitalize(user.name)}</Typography>
						<Avatar className={classes.avatar} alt={user.name} src={user.photo} />
						<Button className={classes.logout} variant="contained" href="/user/logout">
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
						<a href={user ? '/dashboard' : '/'} style={{flexGrow: 1}}>
							<img className={classes.logo} src={ioledLogo} alt="ioled" />
						</a>
						{this.authContentRender()}
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
