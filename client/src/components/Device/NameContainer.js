import React, {Component} from 'react';
import {connect} from 'react-redux';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';

import {Box} from '@material-ui/core';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

// Component style.
const styles = (theme) =>
  createStyles({
    nameContainer: {
      textAlign: 'center',
      marginTop: '8px',
      display: 'flex',
    },
    name: {
      backgroundColor: '#323039',
      color: 'white',
      fontSize: '12px',
      padding: '10px',
      alignItems: 'center',
      marginRight: '10px',
      marginLeft: '10px',
      display: 'flex',
    },
    state: {
      marginLeft: '30px',
    },
    arrows: {
      backgroundColor: '#323039',
    },
    arrowIcon: {
      marginTop: '5px',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

class NameContainer extends Component {
  // Render the component.
  render() {
    const {classes} = this.props;

    return (
      <Box className={classes.nameContainer} width="100%">
        <Box width="12%" className={classes.arrows} borderRadius={36}>
          <ArrowBackIosIcon color="secondary" className={classes.arrowIcon} />
        </Box>

        <Box width="70%" className={classes.name} borderRadius={52}>
          <Box width="50%">{this.props.devices[0].alias}</Box>

          <Box width="20%" className={classes.state}>
            online
          </Box>
        </Box>

        <Box width="12%" className={classes.arrows} borderRadius={36}>
          <ArrowForwardIosIcon color="secondary" className={classes.arrowIcon} />
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = ({devices}) => {
  return {devices};
};

export default connect(mapStateToProps)(withStyles(styles)(NameContainer));
