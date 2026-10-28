import React from "react";

class AuditLogger extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logs: [], toast: "" };
    this.timer = null;
  }

  // Load old logs from localStorage when the logger opens
  componentDidMount() {
    const saved = localStorage.getItem("auditLogs");
    if (saved) {
      this.setState({ logs: JSON.parse(saved) });
    }
  }

  // When a new operation arrives, save it and show a message
  componentDidUpdate(prevProps) {
    if (prevProps.latestLog !== this.props.latestLog && this.props.latestLog) {
      clearTimeout(this.timer);
      const newLogs = [...this.state.logs, this.props.latestLog];
      localStorage.setItem("auditLogs", JSON.stringify(newLogs));
      this.setState({ logs: newLogs, toast: this.props.latestLog });
      this.timer = setTimeout(() => {
        this.setState({ toast: "" });
      }, 3000);
    }
  }

  // Clear the timer when the logger closes
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div className="audit">
        <h2>Audit Log</h2>
        {this.state.toast !== "" && (
          <p className="toast">{this.state.toast}</p>
        )}
        {this.state.logs.length === 0 && <p>No operations yet.</p>}
        <ul>
          {this.state.logs.map((log, index) => (
            <li key={index + "-" + log}>{log}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AuditLogger;
