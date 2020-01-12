import React, {Component} from 'react';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

// Component style.
const styles = (theme) =>
  createStyles({
    sliderContainer: {
      textAlign: 'center',
      backgroundColor: '#323039',
      padding: theme.spacing(1),
      marginTop: '10px',
    },
    rangeLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      color: 'white',
      fontSize: '12px',
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
  render() {
    const {temp = 0, hum = 0, classes} = this.props;

    return (
      <Box width="100%" className={classes.sliderContainer} borderRadius={12}>
        <div className={classes.rangeLabel}>
          <Typography>0%</Typography>
          <Typography>100%</Typography>
        </div>
        <div className={classes.dutyContainer}>
          <IoledSlider min={0} max={1} step={0.05} />
        </div>
      </Box>
    );
  }
}

export default withStyles(styles)(SliderContainer);
