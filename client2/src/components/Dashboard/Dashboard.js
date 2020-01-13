import React, {Component} from 'react';

// material-ui components.
import {withStyles} from '@material-ui/core/styles';

// React components.
import DeviceList from './DeviceList';
import SimpleBottomNavigation from './SimpleBottom';

// Dashboard component styles.
const styles = (theme) => ({
  root: {
    backgroundColor: '#1A191E',
    height: '90vh',
  },
});

class DashBoard extends Component {
  // devicesTest() {
  //   const {devices} = this.props;
  //   console.log(devices);
  // }

  render() {
    // Get the styles classes from props.
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <DeviceList />
        <SimpleBottomNavigation />
      </div>
    );
  }
}

// const mapStateToProps = ({devices}) => {
//   return {devices};
// };

export default withStyles(styles)(DashBoard);
