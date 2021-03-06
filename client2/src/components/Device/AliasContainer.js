import React, {Component} from 'react';
import {connect} from 'react-redux';

import DeviceMenu from './DeviceMenu';

// Action creators.
import {updateDeviceConfig} from '../../actions';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';

import {Box} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

import Typography from '@material-ui/core/Typography';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

// Component style.
const styles = (theme) =>
  createStyles({
    aliasContainer: {
      padding: theme.spacing(1),
      backgroundColor: '#323039',
      marginTop: '60px',
    },
    firstline: {
      display: 'flex',
    },
    alias: {
      color: 'white',
      fontSize: '14px',
      display: 'flex',
      backgroundColor: '#1A191E',
      justifyContent: 'center',
      alignItems: 'center',
    },
    menu: {
      marginLeft: '90px',
    },
    name: {
      textAlign: 'center',
      fontSize: '14px',
    },
    onSwitch: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '5px',
    },
    weekContainer: {
      textAlign: 'center',
      backgroundColor: '#1A191E',
      fontSize: '12px',
      color: 'white',
      marginTop: '5px',
    },
  });

class AliasContainer extends Component {
  // Component state.
  state = {
    state: this.props.state,
    snackOpen: false,
    snackMessage: '',
  };

  // Map device state to configuration readable by the backend.
  stateToConfig = (duty, state, timerOn, timerOff, timerState, alias, deviceId) => {
    return {config: {duty, state, timerOn, timerOff, timerState, alias}, deviceId};
  };

  // Modify the state of LED.
  switchOn = async (event) => {
    this.setState({snackOpen: false});
    this.setState({trans: true});
    const {duty, timerOn, timerOff, timerState, alias, deviceId, index} = this.props;
    const deviceConfig = this.stateToConfig(duty, event.target.checked, timerOn, timerOff, timerState, alias, deviceId);
    await this.props.updateDeviceConfig(deviceConfig, index);
    this.setState({trans: false});
    this.setState({snackOpen: true, snackMessage: 'Actualizado'});
  };

  // Render the component.
  render() {
    const {classes} = this.props;
    const {state} = this.props;

    const {snackOpen, snackMessage} = this.state;

    return (
      <Box className={classes.aliasContainer} borderRadius={12} width="100%">
        <div className={classes.firstline}>
          <Box className={classes.alias} borderRadius={5} width="90%">
            <Box width="80%" className={classes.name}>
              <Typography>{this.props.alias}</Typography>
            </Box>
            <Box width="20%">
              <DeviceMenu />
            </Box>
          </Box>

          <div className={classes.onSwitch}>
            <Switch checked={state} onChange={this.switchOn} value="state" color="primary" />
          </div>
        </div>
        <Box className={classes.weekContainer} borderRadius={36} width="100%">
          <Typography>Semana - 1</Typography>
        </Box>

        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          onClose={() => {
            this.setState({snackOpen: false});
          }}
          open={snackOpen}
          autoHideDuration={2000}
        >
          <SnackbarContent
            style={{
              backgroundColor: '#00EAA6',
              color: 'white',
            }}
            message={snackMessage}
          />
        </Snackbar>
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state.devices[ownProps.index];
};

export default connect(mapStateToProps, {updateDeviceConfig})(withStyles(styles)(AliasContainer));
