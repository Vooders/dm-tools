import { Typography } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react";
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service like AppSignal
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state as any;

    if (hasError) {
      const cantReadProperty = error.message && error.message.includes("Cannot read properties of undefined")
      // You can render any custom fallback UI
      return (
        <div >
          <Typography variant='h3'>Something went wrong 😭</Typography>
          {cantReadProperty &&
            <>
              <Typography variant='h6'>
                It appears that the character data is out of date.
              </Typography>
              <Typography variant='subtitle1'>
                Click the UPDATE button and restart the app
              </Typography>
            </>
          }

          {!cantReadProperty &&
            <>
              <Typography variant='h6'>
                Something's proper broke
              </Typography>
              <Typography variant='subtitle1'>
                Tell Kev or Ste and show them this
              </Typography>
              <Typography>
                {error.message}
              </Typography>
            </>
          }
        </div>
      );
    }
    /* 
    // @ts-ignore */
    return this.props.children;
  }
}

export default ErrorBoundary;
