import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import People from '@mui/icons-material/People';
import { Link } from 'react-router-dom';

const data = [
  { icon: <People />, label: 'Characters' }
];

export default function DndBeyondMenu() {
  const [open, setOpen] = React.useState(true);
  return (
    <>
        <ListItemButton
        alignItems="flex-start"
        onClick={() => setOpen(!open)}>
        <ListItemIcon>
            <People />
        </ListItemIcon>
        <ListItemText
            primary="DND Beyond"
        />
        <KeyboardArrowDown
            sx={{
            mr: -1,
            opacity: 0,
            transform: open ? 'rotate(-180deg)' : 'rotate(0)',
            transition: '0.2s',
            }}
        />
        </ListItemButton>
        {open &&
        data.map((item) => (
            <Link to='/characters'>
                <ListItemButton
                key={item.label}
                sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                >
                <ListItemIcon sx={{ color: 'inherit' }}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                />
                </ListItemButton>
            </Link>
        ))}
    </>
  );
}
