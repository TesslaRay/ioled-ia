import React, {Component} from 'react';
import {connect} from 'react-redux';
// material-ui components.
import {withStyles} from '@material-ui/core/styles';
// React components.
import DeviceList from './DeviceList';
import SimpleBottomNavigation from './SimpleBottom';

// Dashboard component styles.
const styles = (theme) => ({
  root: {
    backgroundColor: 'gray',
    height: '90vh',
  },
});

class DashBoard extends Component {
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

const mapStateToProps = ({devices}) => {
  return {devices};
};

export default connect(mapStateToProps)(withStyles(styles)(DashBoard));
