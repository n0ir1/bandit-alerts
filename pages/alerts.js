import React from "react";
import io from "socket.io-client";

export default class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: {}
    };
  }
  componentDidMount() {
    this.socket = io();
    this.socket.on("message", data => {
      this.setState({
        messages: data
      });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    const { messages } = this.state;
    return <div>{messages.text}</div>;
  }
}
