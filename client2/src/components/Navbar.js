//@ts-nocheck
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// Import images
import ioledLogo from "../images/logo.png";

// material-ui components.
import { withStyles, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

// Material-ui component styles.
const styles = () =>
  createStyles({
    root: {
      position: "relative"
    },
    appbar: {
      backgroundColor: "blue",
      borderRadius: "0px 0px 0px ppx"
    },
    logo: {
      width: "140px",
      margin: "-10px"
    },
    avatar: {
      margin: "0 10px"
    },
    toolbarName: {
      margin: "auto",
      color: "light-green"
    },
    circular: {
      color: "red"
    },
    logout: {
      color: "#6B757E",
      fontSize: "12px"
    },
    button: {
      color: "white"
    }
  });

class Navbar extends Component {
  // String capitalization.
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Render the navbar depending the auth state.
  authRender() {
    const { classes, user } = this.props;
    switch (user) {
      case null:
        return (
          <Fragment>
            <CircularProgress className={classes.circular} />
          </Fragment>
        );
      case false:
        return (
          <Fragment>
            <Button href="/auth/google">Login with Google</Button>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <Avatar
              className={classes.avatar}
              alt={user.name}
              src={user.photo}
            />
          </Fragment>
        );
    }
  }

  // Render the component.
  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar} position="static">
          <Toolbar>
            {/* Left side nabvar*/}
            <a href={user ? "/dashboard" : "/"} style={{ flexGrow: 1 }}>
              <img className={classes.logo} src={ioledLogo} alt="ioled" />
            </a>

            {/* Rigth side nabvar*/}
            {this.authRender()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
