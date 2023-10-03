import React, { Component } from "react";

/** ***************** 
@Purpose : render ErrorBoundary
@Parameter : {}
@Author : shailendra
******************/
class ErrorBoundary extends Component {
  /** ***************** 
    @purpose :constructor 
    @Author : shailendra
    ******************/
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  /** ***************** 
@Purpose : user for detact error
@Parameter : {}
@Author : shailendra
******************/
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  /** ***************** 
@Purpose : render UI
@Parameter : {}
@Author : shailendra
******************/
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong</h1>;
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
