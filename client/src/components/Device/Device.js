import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
// Action creators.
import {updateDeviceConfig, getDeviceState, uploadImage, changeAlias} from '../../actions';
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
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

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
			textAlign: 'left',
		},
		idText: {
			margin: 'auto 0',
			textAlign: 'left',
			marginLeft: '10px',
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
		timer: {
			float: 'left',
			marginLeft: '40px',
		},
		upload: {
			textAlign: 'center',
			marginTop: '80px',
		},
		image: {
			width: 128,
			height: 128,
		  },
		  img: {
			margin: 'auto',
			display: 'block',
			maxWidth: '100%',
			maxHeight: '100%',
		  },
});

const iOLEDShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOLEDSlider = withStyles({
	root: {
	  	color: '#3880ff',
	  	height: 2,
	  	padding: '15px 0',
	},
	thumb: {
		height: 28,
		width: 28,
		backgroundColor: '#fff',
		boxShadow: iOLEDShadow,
		marginTop: -14,
		marginLeft: -14,
		'&:focus,&:hover,&$active': {
			boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
			'@media (hover: none)': {
				boxShadow: iOLEDShadow,
			},
		},
	},
	active: {},
	valueLabel: {
	  	left: 'calc(-50% + 11px)',
	  	top: -22,
	  	'& *': {
			background: 'transparent',
			color: '#000',
	  	},
	},
	track: {
	  	height: 2,
	},
	rail: {
	  	height: 2,
	  	opacity: 0.5,
	  	backgroundColor: '#bfbfbf',
	},
	markActive: {
	  	opacity: 1,
	  	backgroundColor: 'currentColor',
	},
  })(Slider);
  	  		
class Device extends Component {
	// Component state.
	state = {
		tempDuty: this.props.duty,
		snackOpen: false,
		snackMessage: '',	
		timerState: true,
		trans: false,
		tempOn: this.props.timerOn,
		tempOff: this.props.timerOff,
		dialogOpen: false, 
		alias: this.props.alias,
		selectedFile: null,
		imageURL: null
	};

	componentDidMount() {
		const {deviceId, index} = this.props;
		this.props.getDeviceState({deviceId}, index);
	}

	// Map device state to configuration readable by the backend.
	stateToConfig = (duty, state, timerOn, timerOff, timerState, alias, deviceId) => {
		return {config: {duty, state, timerOn, timerOff, timerState, alias}, deviceId};
	};

	/* Modify the state of the led to on of off.
	 * The switch behaviour can be changed by adding the await
	 * keyword in the request made in the action creator.
	 */
	switchOn = async event => {
		this.setState({snackOpen: false});
		const {duty,  timerOn, timerOff, timerState, deviceId, alias, index} = this.props;
		const deviceConfig = this.stateToConfig(duty, event.target.checked, timerOn, timerOff, timerState, alias, deviceId);
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
			this.setState({trans:true});
			this.setState({snackOpen: false});
			const {state, timerOn, timerOff, timerState, deviceId, alias, index} = this.props;
			const deviceConfig = this.stateToConfig(this.state.tempDuty, state, timerOn, timerOff, timerState, alias, deviceId);
			await this.props.updateDeviceConfig(deviceConfig, index);
			if (this.state.tempDuty !== this.props.duty) {
				this.setState({tempDuty: this.props.duty});
			}
			this.setState({trans:false});
			this.setState({snackOpen: true, snackMessage: 'Dispositivo actualizado'});
		}
	};

	// Modify the state of timer state to on to off.
	switchOnTimer = async event => {
		this.setState({snackOpen: false});
		this.setState({trans:true});
		const {duty, state, timerOn, timerOff, deviceId, alias, index} = this.props;
		const deviceConfig = this.stateToConfig(duty, state, timerOn, timerOff, event.target.checked, alias, deviceId);
		await this.props.updateDeviceConfig(deviceConfig, index);
		this.setState({trans:false});
		this.setState({snackOpen: true, snackMessage: 'Timer actualizado'});
	};

	timerOnChange = async event => {
		this.setState({tempOn: event.target.value});					
	};

	timerOnRelease = async event => {
		this.setState({snackOpen: false});
		this.setState({trans:true});
		const {duty, state, timerOff, timerState, deviceId, alias, index} = this.props;
		const deviceConfig = this.stateToConfig(duty, state, this.state.tempOn, timerOff, timerState, alias, deviceId);
		await this.props.updateDeviceConfig(deviceConfig, index);
		this.setState({trans:false});
		this.setState({snackOpen: true, snackMessage: 'Timer actualizado'});
	};

	timerOffChange = async event => {
		this.setState({tempOff: event.target.value});					
	};

	timerOffRelease = async event => {
		this.setState({snackOpen: false});
		this.setState({trans:true});
		const {duty, state, timerOn, timerState, deviceId, alias, index} = this.props;
		const deviceConfig = this.stateToConfig(duty, state, timerOn, this.state.tempOff, timerState, alias, deviceId);
		await this.props.updateDeviceConfig(deviceConfig, index);
		this.setState({trans:false});
		this.setState({snackOpen: true, snackMessage: 'Timer actualizado'});
	};
	
	handleClickOpen = async event => {
		this.setState({dialogOpen: true});					
	};

	handleClose = async event => {
		this.setState({dialogOpen: false});					
	};

	handleEdit = async event =>{
		const {duty, state, timerOn, timerOff, timerState, deviceId} = this.props;
		const deviceConfig = this.stateToConfig(duty, state, timerOn, timerOff, timerState, this.state.alias, deviceId);
		await this.props.changeAlias(deviceConfig);
		this.setState({dialogOpen: false});	
	};

	onInputSubmit = async event => {	
		this.setState({
			selectedFile: event.target.files[0],
			trans:true
		});
		const formData = new FormData();
		formData.append('file', event.target.files[0]);
		const publicURL = await this.props.uploadImage(formData);
		this.setState({
			imageURL: publicURL,
			trans:false
		});
	};

	// Render the component.
	render() {
		const {classes, deviceId, timerState} = this.props;
		const {snackOpen, snackMessage, tempDuty, tempOn, tempOff, trans, dialogOpen, alias} = this.state;
		const {temp = 0, hum = 0} = this.props;

		return (
			<Grid item xs={12} md={8}>
				<Fade in={trans}>		
					<LinearProgress />
				</Fade>	

				<Card className={classes.card}>
					<div className={classes.cardHeader}>
						<div className={classes.nameContainer}>

							<Button variant="text" color="primary" onClick={this.handleClickOpen}>
								{alias}
							</Button>

							<Dialog open={dialogOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
								<DialogContent>
									<DialogContentText>
										Editar el nombre del equipo.
									</DialogContentText>
									<TextField
										autoFocus
										margin="dense"
										id="name"
										label="Nombre equipo"										
										onChange={text => this.setState({alias: text.target.value})}
									/>
								</DialogContent>
								<DialogActions>
									<Button onClick={this.handleClose} color="primary">
										Cancelar
									</Button>
									<Button onClick={this.handleEdit} color="primary">
										Editar
									</Button>
								</DialogActions>
							</Dialog>
							<Typography className={classes.alias}>

							</Typography>							
							<Typography variant="caption" className={classes.idText}>
								id: {deviceId}
							</Typography>
						</div>
						<DeviceMenu deviceId={deviceId} />
					</div>

					{/* Slider */}
					<div className={classes.dutyContainer}>
						<IOLEDSlider
							value={tempDuty}
							min={0}
							max={1}
							step={0.05}
							valueLabelDisplay='on'
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

					<div className={classes.timer}> 
						<form noValidate>
							<TextField
								id="time"
								label="Encendido"
								type="time"
								value={tempOn}										
								onChange={this.timerOnChange}	
								onBlur={this.timerOnRelease}															
							/>
						</form>					
					</div>

					<div className={classes.timer}>
						<form  noValidate>
							<TextField
								id="time"
								label="Apagado"
								type="time"
								value={tempOff}
								onChange={this.timerOffChange}	
								onBlur={this.timerOffRelease}										
							/>
						</form>
					</div>
									
					<div className={classes.upload}>
						<Fragment>
							<input
								// color="primary"
								// accept="image/*"
								type="file"
								id="icon-button-file"
								name="file"
								style={{ display: 'none'}}
								onChange={this.onInputSubmit}
							/>
							<label htmlFor="icon-button-file">
								<Button
									variant="contained"
									component="span"
									className={classes.button}
									startIcon={<CloudUploadIcon />}
								>
									Upload
								</Button>
							</label>
						</Fragment>
					</div>

					<Grid item>
						<img className={classes.img} src={this.state.imageURL}/>

						{/* <img  className={classes.img} alt="complex" src={'https://storage.cloud.google.com/ioled-upload/15719650439003.jpeg'} /> */}
					</Grid>					

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
	{updateDeviceConfig, getDeviceState, changeAlias, uploadImage}
)(withStyles(styles)(Device));
