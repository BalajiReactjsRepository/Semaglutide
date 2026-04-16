import React from "react";
import { ErrorFallback } from "./ErrorFallback";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, key: 0 };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState((prev) => ({
      hasError: false,
      error: null,
      key: prev.key + 1,
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback error={this.state.error} reset={this.handleReset} />
      );
    }

    return <div key={this.state.key}>{this.props.children}</div>;
  }
}

export default ErrorBoundary;
