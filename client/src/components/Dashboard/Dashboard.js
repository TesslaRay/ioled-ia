import React, {Component} from 'react';
import {connect} from 'react-redux';
// material-ui components.
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// React components.
import DeviceFrom from './addButton';
import DeviceList from './DeviceList';

// Dashboard component styles.
const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.grey['100'],
		overflow: 'hidden',
		backgroundSize: 'cover',
		backgroundPosition: '0 400px',
		paddingBottom: 200,
	},
	topBar: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: '20px',
	},
	fab: {
		color: 'white',
		backgroundColor: 'green',
	},
});

class DashBoard extends Component {
	render() {
		// Get the styles classes from props.
		const {classes} = this.props;

		return (
			<div className={classes.root}>
				<Grid item xs={12}>
					<div className={classes.topBar}>
						<div>
							<Typography variant="h6">Dashboard</Typography>
							<Typography variant="body2">Controla tus dispositivos!</Typography>
						</div>
						<div>
							<DeviceFrom />
						</div>
					</div>
				</Grid>
				<DeviceList />
			</div>
		);
	}
}

const mapStateToProps = ({devices}) => {
	return {devices};
};

export default connect(mapStateToProps)(withStyles(styles)(DashBoard));
