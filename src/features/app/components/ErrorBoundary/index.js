import React, { Component } from 'react';
import Page500 from '../../pages/Exception/500/';
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }
  render() {
    if (this.state.hasError)
      return (
        <div>
          <Page500 />
        </div>
      );
    return <div>{this.props.children}</div>;
  }
}

export default ErrorBoundary;
