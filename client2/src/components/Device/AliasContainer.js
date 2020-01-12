import React, {Component} from 'react';

import DeviceMenu from './DeviceMenu';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';

import {Box} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

import Typography from '@material-ui/core/Typography';

// Component style.
const styles = (theme) =>
  createStyles({
    aliasContainer: {
      padding: theme.spacing(1),
      backgroundColor: '#323039',
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
  // Render the component.
  render() {
    const {classes} = this.props;

    return (
      <Box className={classes.aliasContainer} borderRadius={12} width="100%">
        <div className={classes.firstline}>
          <Box className={classes.alias} borderRadius={5} width="90%">
            <Box width="80%" className={classes.name}>
              <Typography>OFICINA IOLED</Typography>
            </Box>
            <Box width="20%">
              <DeviceMenu />
            </Box>
          </Box>

          <div className={classes.onSwitch}>
            <Switch value="checkedA" color="primary" />
          </div>
        </div>
        <Box className={classes.weekContainer} borderRadius={36} width="100%">
          <Typography>Semana - 1</Typography>
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(AliasContainer);
