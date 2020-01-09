import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import CameraIcon from '@material-ui/icons/Camera';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#222128;',
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction icon={<HomeIcon color="secondary" />} />
      <BottomNavigationAction icon={<BarChartIcon color="Primary" />} />
      <BottomNavigationAction icon={<CameraIcon color="secondary" />} />
    </BottomNavigation>
  );
}
