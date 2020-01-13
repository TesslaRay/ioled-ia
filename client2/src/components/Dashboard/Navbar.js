//@ts-nocheck
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ioledLogo from '../../images/logo.png';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';

// Material-ui component styles.
const styles = () =>
  createStyles({
    root: {
      position: 'relative',
    },
    appbar: {
      backgroundColor: '#323039',
    },
    logo: {
      width: '150px',
      margin: '-10px',
    },
    avatar: {
      margin: '0 10px',
    },
    circular: {
      color: '#00EAA6',
    },
  });

class Navbar extends Component {
  // Render the component.
  render() {
    const {classes, user} = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar} position="static">
          <Toolbar>
            <a href={'/'} style={{flexGrow: 1}}>
              <img className={classes.logo} src={ioledLogo} alt="ioled" />
            </a>

            <Avatar className={classes.avatar} alt={user.name} src={user.photo} />
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
