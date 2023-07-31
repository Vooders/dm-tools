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
      // You can render any custom fallback UI
      return (
        <div>
          <p>Something went wrong 😭</p>
 
          {error.message && <span>Here's the error: {error.message}</span>}
        </div>
      );
    }
    /* 
    // @ts-ignore */
    return this.props.children;
  }
}
 
export default ErrorBoundary;
