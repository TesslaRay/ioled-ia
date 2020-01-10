import React, {Component} from 'react';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

import FlashOnIcon from '@material-ui/icons/FlashOn';
import CloudIcon from '@material-ui/icons/Cloud';
import Typography from '@material-ui/core/Typography';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

// Component style.
const styles = (theme) =>
  createStyles({
    stateContainer: {
      color: 'blue',
      textAlign: 'center',
      backgroundColor: '#1A191E',
      marginTop: '8px',
      display: 'flex',
      padding: theme.spacing(1),
    },
    powerContainer: {
      backgroundColor: '#323039',
    },
    tempContainer: {
      backgroundColor: '#323039',
      marginRight: '5px',
      marginLeft: '5px',
    },
    humContainer: {
      backgroundColor: '#323039',
    },
    stateIcon: {
      marginTop: '11px',
    },
    state: {
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    stateNumber: {
      fontSize: '24px',
    },
    stateUnity: {
      fontSize: '12px',
    },
    stateText: {
      color: 'white',
      fontSize: '11px',
    },
  });

class StateContainer extends Component {
  render() {
    const {temp = 0, hum = 0, classes} = this.props;

    return (
      <Box width="100%" className={classes.stateContainer}>
        <Box width="33%" className={classes.powerContainer} borderRadius={12}>
          <div className={classes.stateIcon}>
            <FlashOnIcon color="secondary" />
          </div>
          <div className={classes.state}>
            <Typography className={classes.stateNumber} variant="h6">
              300
            </Typography>
            <Typography className={classes.stateUnity}> W</Typography>
          </div>
          <Typography className={classes.stateText}>Consumo</Typography>
        </Box>

        <Box width="33%" className={classes.tempContainer} borderRadius={12}>
          <div className={classes.stateIcon}>
            <BeachAccessIcon color="secondary" />
          </div>
          <div className={classes.state}>
            <Typography className={classes.stateNumber} fontWeight="fontWeightBold">
              21
            </Typography>
            <Typography className={classes.stateUnity}> ºC</Typography>
          </div>
          <Typography className={classes.stateText}>Temperatura</Typography>
        </Box>

        <Box width="33%" className={classes.humContainer} borderRadius={12}>
          <div className={classes.stateIcon}>
            <CloudIcon color="secondary" />
          </div>
          <div className={classes.state}>
            <Typography className={classes.stateNumber}>42</Typography>
            <Typography className={classes.stateUnity}> %</Typography>
          </div>
          <Typography className={classes.stateText}>Humedad</Typography>
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(StateContainer);
