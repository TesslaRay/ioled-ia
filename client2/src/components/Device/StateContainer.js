import React, {Component} from 'react';
import {connect} from 'react-redux';

// Action creators.
import {getDeviceState} from '../../actions';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Component style.
const styles = (theme) =>
  createStyles({
    energyText: {
      color: 'blue',
      textAlign: 'center',
    },
    humContainer: {
      padding: theme.spacing(2),
      display: 'flex',
    },
    tempContainer: {
      padding: theme.spacing(2),
      display: 'flex',
    },
  });

class Statecontainer extends Component {
  // componentDidMount() {
  //   const {deviceId, index} = this.props;
  //   this.props.getDeviceState({deviceId}, index);
  // }

  render() {
    const {temp = 0, hum = 0, classes} = this.props;

    return (
      <div>
        <Typography className={classes.switchText} variant="subtitle1" gutterBottom>
          {hum.toFixed(2)} %
        </Typography>
      </div>
    );

    // return (
    //   <div>
    //     <Typography className={classes.energyText} variant="h6" gutterBottom>
    //       {tempDuty * 300} W
    //     </Typography>
    //   </div>

    //   <div className={classes.humContainer}>
    //     <Typography className={classes.switchText} variant="subtitle1" gutterBottom>
    //       {hum.toFixed(2)} %
    //     </Typography>
    //   </div>

    //   <div className={classes.tempContainer}>
    //     <Typography className={classes.switchText} variant="subtitle1" gutterBottom>
    //       {temp.toFixed(2)} ºC
    //     </Typography>
    //   </div>
    // );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   return state.devices[ownProps.index];
// };

// export default connect(mapStateToProps, {
//   getDeviceState,
// })(withStyles(styles)(Statecontainer));
