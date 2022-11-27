import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LuggageIcon from '@mui/icons-material/Luggage';
import ForumIcon from '@mui/icons-material/Forum';
import WifiIcon from '@mui/icons-material/Wifi';
import DndBeyondMenu from './menuItems/DndBeyondMenu';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link to='/inventory'>
      <ListItemButton>
        <ListItemIcon>
          <LuggageIcon />
        </ListItemIcon>
        <ListItemText primary="Inventory" sx={{color: 'white'}} />
      </ListItemButton>
    </Link>

    <Link to='/languages'>
      <ListItemButton>
        <ListItemIcon>
          <ForumIcon />
        </ListItemIcon>
        <ListItemText primary="Languages" sx={{color: 'white'}} />
      </ListItemButton>
    </Link>

    <Link to='/senses'>
      <ListItemButton>
        <ListItemIcon>
          <WifiIcon />
        </ListItemIcon>
        <ListItemText primary="Senses" sx={{color: 'white'}} />
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
