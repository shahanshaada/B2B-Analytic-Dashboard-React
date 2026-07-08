import { Component } from "react";
import "./ErrorBoundary.css";


export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || "Something went wrong." };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled error caught by ErrorBoundary:", error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, message: "" });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-card">
            <h2>Something went wrong</h2>
            <p>{this.state.message}</p>
            <button type="button" onClick={this.handleReload}>
              Reload the app
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
