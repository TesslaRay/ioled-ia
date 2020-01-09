import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import CameraIcon from '@material-ui/icons/Camera';

const useStyles = makeStyles({
  root: {
    position: 'bottom',
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
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Gráficos" icon={<BarChartIcon />} />
      <BottomNavigationAction label="I.A" icon={<CameraIcon />} />
    </BottomNavigation>
  );
}
