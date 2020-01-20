import React, {Component} from 'react';

// React components.
import StateContainer from './StateContainer';
import AliasContainer from './AliasContainer';
import SliderContainer from './SliderContainer';
import TimerContainer from './TimerContainer';
// import NameContainer from './NameContainer';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Component style.
const styles = (theme) =>
  createStyles({
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#1A191E',
    },
    nameContainer: {
      margin: 'auto 0',
      textAlign: 'rigth',
      color: '#FFFFFF',
    },
    aliasContainer: {
      padding: theme.spacing(1),
      textAlign: 'center',
      backgroundColor: '#323039',
    },
  });

class Device extends Component {
  // Render the component.
  render() {
    return (
      <Container component="main" maxWidth="sm">
        {/* <NameContainer /> */}

        <AliasContainer index={this.props.index} />

        <StateContainer index={this.props.index} />

        <SliderContainer index={this.props.index} />

        <TimerContainer index={this.props.index} />
      </Container>
    );
  }
}

export default withStyles(styles)(Device);
