import React, {Component} from 'react';
import {connect} from 'react-redux';

// Action creators.
import {updateDeviceConfig} from '../../actions';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

// Component style.
const styles = (theme) =>
  createStyles({
    sliderContainer: {
      textAlign: 'center',
      backgroundColor: '#323039',
      padding: theme.spacing(1),
      marginTop: '30px',
    },
    rangeLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      color: 'white',
      fontSize: '12px',
    },
    progress: {
      backgroundColor: '#29ABE2',
    },
  });

const IoledSlider = withStyles({
  root: {
    color: 'linear-gradient(180deg, #29ABE2 0%, #00EAA6 100%)',
    height: 10,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

class SliderContainer extends Component {
  // Component state.
  state = {
    tempDuty: this.props.duty,
    trans: false,
  };

  // Map device state to configuration readable by the backend.
  stateToConfig = (duty, state, timerOn, timerOff, timerState, alias, deviceId) => {
    return {config: {duty, state, timerOn, timerOff, timerState, alias}, deviceId};
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
      this.setState({snackOpen: true, snackMessage: 'Dispositivo actualizado'});
    }
  };

  render() {
    const {classes} = this.props;

    const {snackOpen, snackMessage, tempDuty, trans} = this.state;

    return (
      <Box width="100%" className={classes.sliderContainer} borderRadius={12}>
        <div className={classes.rangeLabel}>
          <Typography>0%</Typography>
          <Typography>100%</Typography>
        </div>
        <div className={classes.dutyContainer}>
          <IoledSlider
            value={tempDuty}
            min={0}
            max={1}
            step={0.05}
            valueLabelDisplay="auto"
            onChange={this.sliderOnChangeHandler}
            onChangeCommitted={this.sliderOnReleaseHandler}
          />
        </div>

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

        <Fade in={trans} className={classes.progress}>
          <LinearProgress />
        </Fade>
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state.devices[ownProps.index];
};

export default connect(mapStateToProps, {updateDeviceConfig})(withStyles(styles)(SliderContainer));
