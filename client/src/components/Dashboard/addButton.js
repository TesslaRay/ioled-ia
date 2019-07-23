import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
// Action creators.
import {registerDevice, fetchDevices} from '../../actions';
// material-ui components.
import {withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

// Component style.
const styles = {
	fab: {
		color: 'white',
		backgroundColor: 'green',
	},
};

class DeviceForm extends Component {
	state = {open: false, deviceId: ''};

	registerHandler = () => {
		this.props.registerDevice(this.state.deviceId);
		this.setState({open: false});
		//this.props.fetchDevices();
	};

	render() {
		// Component state.
		const {classes} = this.props;
		return (
			<Fragment>
				<Tooltip title="Registra un dispositivo!" placement="left-end" aria-label="Add">
					<Fab className={classes.fab} onClick={() => this.setState({open: true})}>
						<AddIcon />
					</Fab>
				</Tooltip>
				<Dialog open={this.state.open} onClose={() => this.setState({open: false})} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Registra tu dispositivo iOLED!</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							label="Nº de serie"
							type="string"
							onChange={text => this.setState({deviceId: text.target.value})}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.setState({open: false})}>Cancel</Button>
						<Button onClick={this.registerHandler}>Subscribe</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

export default connect(
	null,
	{registerDevice, fetchDevices}
)(withStyles(styles)(DeviceForm));
