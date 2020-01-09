import React, {Component} from 'react';
import {connect} from 'react-redux';

// Action creators.
import {updateDeviceConfig, getDeviceState, changeAlias} from '../../actions';

// React components.
import DeviceMenu from './DeviceMenu';
import StateContainer from './StateContainer';

import Swal from 'sweetalert2';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
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

// Component style.
const styles = (theme) =>
  createStyles({
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#1A191E',
    },
    nameContainer: {
      margin: 'auto 0',
      textAlign: 'left',
      color: '#FFFFFF',
    },
    idText: {
      margin: 'auto 0',
      textAlign: 'left',
      marginLeft: '10px',
    },
    card: {
      padding: theme.spacing(1),
      textAlign: 'left',
      backgroundColor: '#323039',
      height: '70vh',
    },
    dutyContainer: {
      padding: theme.spacing(2),
      textAlign: 'left',
      backgroundColor: 'black',
    },
    dutyText: {
      color: '#6c9278',
      marginBottom: '16px',
    },
    rangeLabel: {
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
    },
  });

class Device extends Component {
  // Component state.
  state = {
    tempDuty: this.props.duty,
    snackOpen: false,
    snackMessage: '',
    timerState: true,
    trans: false,
    dialogOpen: false,
    alias: this.props.alias,
  };

  componentDidMount() {
    const {deviceId, index} = this.props;
    // this.props.getDeviceState({deviceId}, index);
  }

  // Map device state to configuration readable by the backend.
  stateToConfig = (duty, state, timerOn, timerOff, timerState, alias, deviceId) => {
    return {
      config: {duty, state, timerOn, timerOff, timerState, alias},
      deviceId,
    };
  };

  /* Modify the state of the led to on of off.
   * The switch behaviour can be changed by adding the await
   * keyword in the request made in the action creator.
   */
  switchOn = async (event) => {
    this.setState({snackOpen: false});
    const {duty, timerOn, timerOff, timerState, deviceId, alias, index} = this.props;
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
      this.setState({trans: true});
      this.setState({snackOpen: false});
      const {state, timerOn, timerOff, timerState, deviceId, alias, index} = this.props;
      const deviceConfig = this.stateToConfig(
        this.state.tempDuty,
        state,
        timerOn,
        timerOff,
        timerState,
        alias,
        deviceId,
      );
      await this.props.updateDeviceConfig(deviceConfig, index);
      if (this.state.tempDuty !== this.props.duty) {
        this.setState({tempDuty: this.props.duty});
      }
      this.setState({trans: false});
      // this.setState({
      //   snackOpen: true,
      //   snackMessage: 'Dispositivo actualizado',
      // });

      Swal.fire({
        icon: 'success',
        type: 'success',
        text: 'Tu configuración ha sido cambiada',
      });
    }
  };

  // Render the component.
  render() {
    const {classes, deviceId} = this.props;

    const {snackOpen, snackMessage, tempDuty} = this.state;
    const {trans, dialogOpen, alias} = this.state;

    return (
      <Container component="main" maxWidth="xs">
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
                  <DialogContentText>Editar el nombre del equipo.</DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre equipo"
                    onChange={(text) => this.setState({alias: text.target.value})}
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

              <Typography className={classes.alias}></Typography>
            </div>
            <DeviceMenu deviceId={deviceId} />
          </div>

          {/* <StateContainer /> */}

          {/* Slider */}
          <div className={classes.dutyContainer}>
            <Slider
              value={tempDuty}
              min={0}
              max={1}
              step={0.05}
              valueLabelDisplay="auto"
              onChange={this.sliderOnChangeHandler}
              onChangeCommitted={this.sliderOnReleaseHandler} // Previous version onDragEnd
            />
            <div className={classes.rangeLabel}>
              <Typography variant="subtitle2">0%</Typography>
              <Typography variant="subtitle2">100%</Typography>
            </div>
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
        {/* </Grid> */}
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state.devices[ownProps.index];
};

export default connect(mapStateToProps, {
  updateDeviceConfig,
  // getDeviceState,
  changeAlias,
})(withStyles(styles)(Device));
