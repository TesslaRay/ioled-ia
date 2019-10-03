import React, {Component} from 'react';
import {connect} from 'react-redux';
// Action creators.
import {updateDeviceConfig, getDeviceState} from '../../actions';
// React components.
import DeviceMenu from './DeviceMenu';
// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

// Component style.
const styles = theme =>
	createStyles({
		cardHeader: {
			display: 'flex',
			justifyContent: 'space-between',
		},
		nameContainer: {
			margin: 'auto 0',
		},
		idText: {
			margin: 'auto 0',
		},
		card: {
			padding: theme.spacing(3),
			textAlign: 'left',
			color: theme.palette.text.secondary,
		},
		dutyContainer: {
			padding: theme.spacing(2),
			textAlign: 'left',
		},
		dutyText: {
			color: '#6c9278',
			marginBottom: '16px',
		},
		rangeLabel: {
			display: 'flex',
			justifyContent: 'space-between',
			paddingTop: theme.spacing(2),
		},
		switchContainer: {
			padding: theme.spacing(2),
			display: 'flex',
			justifyContent: 'space-between',
		},
		switchText: {
			color: '#6c9278',
			margin: 'auto 0',
		},
		switchStyle: {
			alignSelf: 'flex-end',
			color: 'green',
		},
		humContainer: {
			padding: theme.spacing(2),
			display: 'flex',
		},
		tempContainer: {
			padding: theme.spacing(2),
			display: 'flex',
		},
		button: {
			textAlign: 'center',
		},
	});

class Device extends Component {
	// Component state.
	state = {
		tempDuty: this.props.duty,
		snackOpen: false,
		snackMessage: '',	
		timerState: true,
			
	};

	componentDidMount() {
		const {deviceId, index} = this.props;
		this.props.getDeviceState({deviceId}, index);
	}

	// Map device state to configuration readable by the backend.
	stateToConfig = (duty, state, timerOn, timerOff, timerState, deviceId) => {
		return {config: {duty, state, timerOn, timerOff, timerState}, deviceId};
	};

	/* Modify the state of the led to on of off.
	 * The switch behaviour can be changed by adding the await
	 * keyword in the request made in the action creator.
	 */
	switchOn = async event => {
		this.setState({snackOpen: false});
		const {duty,  timerOn, timerOff, timerState, deviceId, index} = this.props;
		const deviceConfig = this.stateToConfig(duty, event.target.checked, timerOn, timerOff, timerState, deviceId);
		await this.props.updateDeviceConfig(deviceConfig, index);
		this.setState({snackOpen: true, snackMessage: 'Dispositivo actualizado'});
	};

	/* Change the intensity of the led.
	 * Triggers on release inside the slider element and clicking the slider.
	 */
	sliderOnChangeHandler = (event, value) => {
		if (event.type === 'click') {
			this.setState({tempDuty: parseFloat(value.toFixed(2))}, this.sliderOnReleaseHandler);
		}
		this.setState({tempDuty: parseFloat(value.toFixed(2))});
	};

	sliderOnReleaseHandler = async () => {
		if (this.state.tempDuty !== this.props.duty) {
			this.setState({snackOpen: false});
			const {state, timerOn, timerOff, timerState, deviceId, index} = this.props;
			const deviceConfig = this.stateToConfig(this.state.tempDuty, state, timerOn, timerOff, timerState, deviceId);
			await this.props.updateDeviceConfig(deviceConfig, index);
			if (this.state.tempDuty !== this.props.duty) {
				this.setState({tempDuty: this.props.duty});
			}
			this.setState({snackOpen: true, snackMessage: 'Dispositivo actualizado'});
		}
	};

	// Modify the state of timer state to on to off.
	switchOnTimer = async event => {
		this.setState({snackOpen: false});
		const {duty, state, timerOn, timerOff, deviceId, index} = this.props;
		const deviceConfig = this.stateToConfig(duty, state, timerOn, timerOff, event.target.checked, deviceId);
		await this.props.updateDeviceConfig(deviceConfig, index);
		this.setState({snackOpen: true, snackMessage: 'Timer actualizado'});
	};

	// Render the component.
	render() {
		const {classes, state, deviceId, timerState, alias} = this.props;
		const {snackOpen, snackMessage, tempDuty} = this.state;
		const {temp = 0, hum = 0} = this.props;

		return (
			<Grid item xs={12} md={6}>
				<Card className={classes.card}>
					<div className={classes.cardHeader}>
						<div className={classes.nameContainer}>
							<Typography variant="subtitle2" align="left">
								{alias}
							</Typography>
							<Typography variant="caption" className={classes.idText}>
								id: {deviceId}
							</Typography>
						</div>
						<DeviceMenu deviceId={deviceId} />
					</div>

					{/* Slider */}
					<div className={classes.dutyContainer}>
						<Typography className={classes.dutyText} variant="subtitle1" gutterBottom>
							Intensidad: {(tempDuty * 100).toFixed()}%
						</Typography>
						<Slider
							value={tempDuty}
							min={0}
							max={1}
							step={0.05}
							onChange={this.sliderOnChangeHandler}
							onChangeCommitted={this.sliderOnReleaseHandler}		// Previous version onDragEnd
						/>
						<div className={classes.rangeLabel}>
							<Typography variant="subtitle2">0%</Typography>
							<Typography variant="subtitle2">100%</Typography>
						</div>
					</div>					

					<div className={classes.humContainer}>
						<Typography className={classes.switchText} variant="subtitle1" gutterBottom>
							Humedad: {hum.toFixed(2)} %
						</Typography>
					</div>

					<div className={classes.tempContainer}>
						<Typography className={classes.switchText} variant="subtitle1" gutterBottom>
							Temperatura: {temp.toFixed(2)} ºC
						</Typography>
					</div>

					{/*	switch button TIMER*/}
					<div className={classes.switchContainer}>
						<Typography className={classes.switchText} variant="subtitle1" gutterBottom>
							{timerState ? 'Timer encendido' : 'Timer apagado'}
						</Typography>
						<Switch
							checked={timerState}
							onChange={this.switchOnTimer}
							value="timerState"
							className={classes.switchStyle}
							classes={{switchBase: classes.colorSwitchBase}}
						/>
					</div>

					{/* Timer slider */}
					<div className={classes.dutyContainer}>
						<Typography id="range-slider" gutterBottom>
							Timer range
						</Typography>
						<Slider				
							valueLabelDisplay="auto"
							min={0}
							max={24}
						/>
						</div>

					{/* Button upload image */}
					<div className={classes.button}> 
						<Button variant="contained" color="default" >
							Upload
							<CloudUploadIcon />
						</Button>
					</div>
					
				</Card>

				<Snackbar
					anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
					message={snackMessage}
					onClose={() => {
						this.setState({snackOpen: false});
					}}
					open={snackOpen}
				/>
			</Grid>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return state.devices[ownProps.index];
};

export default connect(
	mapStateToProps,
	{updateDeviceConfig, getDeviceState}
)(withStyles(styles)(Device));
