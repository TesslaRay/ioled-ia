import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import CameraIcon from '@material-ui/icons/Camera';
import { Box } from '@material-ui/core';
import { flexbox } from '@material-ui/system';

//icon API
import { Icon } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    position: 'botton',
    backgroundColor: '#222128;',
    color: '#FFFFFF',
    borderRadius: 24,
    margin: 3,
    alignItems: 'center',
    alignContent: 'center',

    
  },
  simpleBox:{
    height: 'fit',
    display: 'flex',
    justifyContent: 'center',
    
  },
  MuiIcon:{
    colorSecondary:'#FFFFFF',
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <Box className={classes.simpleBox}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction icon={<HomeIcon color="primary" />} />
        <BottomNavigationAction icon={<BarChartIcon color="secondary" />} />
        <BottomNavigationAction icon={<CameraIcon color="secondary" />} />
      </BottomNavigation>
    </Box>
  );
}
