import React, {Component} from 'react';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

import Typography from '@material-ui/core/Typography';

import SvgIcon from '@material-ui/core/SvgIcon';

import {ReactComponent as HumIcon} from '../../images/CloudSVG.svg';
import {ReactComponent as TempIcon} from '../../images/TempSVG.svg';
import {ReactComponent as ThunderIcon} from '../../images/ThunderSVG.svg';

// Component style.
const styles = (theme) =>
  createStyles({
    stateContainer: {
      textAlign: 'center',
      backgroundColor: '#1A191E',
      marginTop: '8px',
      display: 'flex',
      // padding: theme.spacing(1),
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

const defaultProps = {
  borderColor: '#00EAA6',
};

class StateContainer extends Component {
  render() {
    const {temp = 0, hum = 0, classes} = this.props;

    return (
      <Box width="100%" className={classes.stateContainer}>
        <Box width="33%" className={classes.powerContainer} borderRadius={12} border={1} {...defaultProps}>
          <SvgIcon component={ThunderIcon} viewBox="0 0 11 23" className={classes.stateIcon} />
          <div className={classes.state}>
            <Typography className={classes.stateNumber} variant="h6">
              300
            </Typography>
            <Typography className={classes.stateUnity}> W</Typography>
          </div>
          <Typography className={classes.stateText}>Consumo</Typography>
        </Box>

        <Box width="33%" className={classes.tempContainer} borderRadius={12} border={1} {...defaultProps}>
          <SvgIcon component={TempIcon} viewBox="0 0 14 33" className={classes.stateIcon} />

          <div className={classes.state}>
            <Typography className={classes.stateNumber} fontWeight="fontWeightBold">
              21
            </Typography>
            <Typography className={classes.stateUnity}> ºC</Typography>
          </div>
          <Typography className={classes.stateText}>Temperatura</Typography>
        </Box>

        <Box width="33%" className={classes.humContainer} borderRadius={12} border={1} {...defaultProps}>
          <SvgIcon component={HumIcon} viewBox="0 0 41 28" className={classes.stateIcon} />

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
