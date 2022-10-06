import * as React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface TitleProps {
  children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.children}
      </Typography>
      <Divider></Divider>
    </>
  );
}
