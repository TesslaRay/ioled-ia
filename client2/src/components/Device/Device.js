import React, {Component} from 'react';
import {connect} from 'react-redux';

// Action creators.
import {updateDeviceConfig, getDeviceState, changeAlias} from '../../actions';

// React components.
import StateContainer from './StateContainer';
import AliasContainer from './AliasContainer';
import SliderContainer from './SliderContainer';

import Swal from 'sweetalert2';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

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
      textAlign: 'rigth',
      color: '#FFFFFF',
    },
    aliasContainer: {
      padding: theme.spacing(1),
      textAlign: 'center',
      backgroundColor: '#323039',
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
        <AliasContainer />

        <StateContainer />

        <SliderContainer />
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
