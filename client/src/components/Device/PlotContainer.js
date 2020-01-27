import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';

import {Box, Divider} from '@material-ui/core';

import SvgIcon from '@material-ui/core/SvgIcon';

import {ReactComponent as TempIcon} from '../../images/TempSVG.svg';
import {ReactComponent as HumIcon} from '../../images/CloudSVG.svg';

// Component style.
const styles = (theme) =>
  createStyles({
    root: {
      display: 'grid',
      justifyContent: 'center',
    },
    plotContainer: {
      backgroundColor: '#323039',
      width: '90vw',
      height: '35vh',
      padding: theme.spacing(1),
      marginTop: '30px',
    },
    topPlotContainer: {
      display: 'flex',
    },
    icon: {
      backgroundColor: '#222128',
      marginRight: '20px',
    },
    stateIcon: {
      marginLeft: '2px',
      marginTop: '2px',
    },
    show: {
      backgroundColor: '#474453',
      color: 'white',
      display: 'flex',
      fontSize: '12px',
      justifyContent: 'center',
      marginTop: '5px',
    },
    timeScaleTemp: {
      color: '#00EAA6',
    },
    timeScaleHum: {
      color: '#29ABE2',
    },
    temperatura: {
      color: '#00EAA6',
      fontSize: '15px',
      fontWeight: 'bold',
    },
    humedad: {
      color: '#29ABE2',
      fontSize: '15px',
      fontWeight: 'bold',
    },
    divider: {
      marginTop: '5px',
    },
  });

const options_temp = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: 'white',
          maxTicksLimit: 4,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          color: '#AAAAAA',
          borderDash: [1, 10],
        },
        ticks: {
          fontColor: '#00EAA6',
          min: 0,
          max: 40,
          maxTicksLimit: 6,
        },
      },
    ],
  },
};

const options_hum = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: 'white',
          maxTicksLimit: 4,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          color: '#AAAAAA',
          borderDash: [1, 10],
        },
        ticks: {
          fontColor: '#29ABE2',
          min: 0,
          max: 100,
          maxTicksLimit: 6,
        },
      },
    ],
  },
};

class LineChart extends Component {
  state = {
    chartData_temp: {},
    chartData_hum: {},
  };

  componentDidMount() {
    const ctx_temp = document.getElementById('temperatura').getContext('2d');
    const gradient_temp = ctx_temp.createLinearGradient(0, 0, 0, 180);
    gradient_temp.addColorStop(0, '#00EAA6');
    gradient_temp.addColorStop(1, 'rgba(16, 156, 241, 0)');
    const newData_temp = {
      labels: ['Dec 1', 'Dec 3', 'Dec 5', 'Dec 8', 'Dec 16', 'Dec 21', 'Dec 25', 'Dec 31'],
      datasets: [
        {
          data: [10, 18, 19, 30, 11, 15, 28, 26],
          borderColor: '#00EAA6',
          lineTension: 0.5,
          backgroundColor: gradient_temp,
          borderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
      ],
    };
    this.setState({chartData_temp: newData_temp});

    const ctx_hum = document.getElementById('temperatura').getContext('2d');
    const gradient_hum = ctx_hum.createLinearGradient(0, 0, 0, 200);
    gradient_hum.addColorStop(0, '#29ABE2');
    gradient_hum.addColorStop(1, 'rgba(16, 156, 241, 0)');
    const newData_hum = {
      labels: ['Dec 1', 'Dec 3', 'Dec 5', 'Dec 8', 'Dec 16', 'Dec 21', 'Dec 25', 'Dec 31'],
      datasets: [
        {
          data: [45, 50, 19, 30, 11, 15, 28, 22],
          borderColor: '#29ABE2',
          lineTension: 0.5,
          backgroundColor: gradient_hum,
          borderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
      ],
    };
    this.setState({chartData_hum: newData_hum});
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Box className={classes.plotContainer} borderRadius={12} boxShadow={3}>
          <Box className={classes.topPlotContainer}>
            <Box className={classes.icon} borderRadius={56} width="8%">
              <SvgIcon component={TempIcon} viewBox="0 0 14 33" className={classes.stateIcon} />
            </Box>
            <Box width="52%" className={classes.temperatura}>
              Temperatura ºC
            </Box>
            <Box className={classes.show} borderRadius={12} width="40%">
              Show: <div className={classes.timeScaleTemp}> Mensual</div>
            </Box>
          </Box>
          <Divider className={classes.divider} />
          <Line id="temperatura" data={this.state.chartData_temp} options={options_temp} />
        </Box>

        <Box className={classes.plotContainer} borderRadius={12}>
          <Box className={classes.topPlotContainer}>
            <Box className={classes.icon} borderRadius={56} width="8%">
              <SvgIcon component={HumIcon} viewBox="0 0 41 28" className={classes.stateIcon} />
            </Box>
            <Box width="52%" className={classes.humedad}>
              Humedad %
            </Box>
            <Box className={classes.show} borderRadius={12} width="40%">
              Show: <div className={classes.timeScaleHum}> Mensual</div>
            </Box>
          </Box>

          <Divider className={classes.divider} />

          <Line id="canvas" data={this.state.chartData_hum} options={options_hum} />
        </Box>
      </div>
    );
  }
}

export default withStyles(styles)(LineChart);
