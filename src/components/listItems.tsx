import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LuggageIcon from '@mui/icons-material/Luggage';
import DndBeyondMenu from './menuItems/DndBeyondMenu';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link to='/inventory'>
    <ListItemButton>
      <ListItemIcon>
        <LuggageIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItemButton>
    </Link>
    
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Settings
    </ListSubheader>
    <DndBeyondMenu />
  </React.Fragment>
);
