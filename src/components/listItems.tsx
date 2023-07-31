import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LuggageIcon from '@mui/icons-material/Luggage';
import ForumIcon from '@mui/icons-material/Forum';
import WifiIcon from '@mui/icons-material/Wifi';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Party Views
    </ListSubheader>

    <Link to='/health'>
      <ListItemButton>
        <ListItemIcon>
          <HealthAndSafetyIcon />
        </ListItemIcon>
        <ListItemText primary="Health" />
      </ListItemButton>
    </Link>

    <Link to='/skills'>
      <ListItemButton>
        <ListItemIcon>
          <DensitySmallIcon />
        </ListItemIcon>
        <ListItemText primary="Skills" />
      </ListItemButton>
    </Link>
    
    <Link to='/inventory'>
      <ListItemButton>
        <ListItemIcon>
          <LuggageIcon />
        </ListItemIcon>
        <ListItemText primary="Inventory" />
      </ListItemButton>
    </Link>

    <Link to='/languages'>
      <ListItemButton>
        <ListItemIcon>
          <ForumIcon />
        </ListItemIcon>
        <ListItemText primary="Languages" />
      </ListItemButton>
    </Link>

    <Link to='/senses'>
      <ListItemButton>
        <ListItemIcon>
          <WifiIcon />
        </ListItemIcon>
        <ListItemText primary="Senses" />
      </ListItemButton>
    </Link>

    <Link to='/wealth'>
      <ListItemButton>
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Wealth" />
      </ListItemButton>
    </Link>
    
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Settings
    </ListSubheader>
    <Link to='/characters'>
      <ListItemButton>
        <ListItemIcon>
          <GroupAddIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Characters" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
