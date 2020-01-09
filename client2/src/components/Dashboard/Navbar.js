//@ts-nocheck
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import ioledLogo from '../../images/logo.png';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

// Material-ui component styles.
const styles = () =>
  createStyles({
    root: {
      position: 'relative',
    },
    appbar: {
      backgroundColor: '#808080	',
    },
    logo: {
      width: '150px',
      margin: '-10px',
    },
    avatar: {
      margin: '0 10px',
    },
    circular: {
      color: 'green',
    },
  });

class Navbar extends Component {
  // String capitalization.
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  // Render the navbar depending the auth state.
  authContentRender() {
    const {classes, user} = this.props;
    switch (user) {
      case null:
        return (
          <Fragment>
            <CircularProgress className={classes.circular} />
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <Avatar className={classes.avatar} alt={user.name} src={user.photo} />
          </Fragment>
        );
    }
  }

  // Render the component.
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar} position="static">
          <Toolbar>
            <a href={'/'} style={{flexGrow: 1}}>
              <img className={classes.logo} src={ioledLogo} alt="ioled" />
            </a>

            {this.authContentRender()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {user};
};

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
