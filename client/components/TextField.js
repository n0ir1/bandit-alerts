import React from "react";
import styled from "styled-components";

const Row = styled.div`
  margin: 16px 8px 8px;
  border: 0;
  display: flex;
  padding: 0;
  z-index: 0;
  position: relative;
  min-width: 0;
  flex-direction: column;
  vertical-align: top;
`;

const Label = styled.label`
  color: ${props => (props.isFocus ? "#1976d2" : "rgba(0, 0, 0, 0.54)")};
  padding: 0;
  line-height: 1;
  transform-origin: top left;
  top: 0;
  left: 0;
  position: absolute;
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  transform: ${props =>
    props.isFocus || props.text
      ? "translate(0, 1.5px) scale(0.75)"
      : `translate(0, 24px) scale(1)`};
`;

const InputWrap = styled.div`
  color: rgba(0, 0, 0, 0.87);
  position: relative;
  cursor: text;
  display: inline-flex;
  font-size: 1rem;
  line-height: 1.1875em;
  align-items: center;
  ${Label} + & {
    margin-top: 16px;
  }
  &:before {
    left: 0;
    right: 0;
    bottom: 0;
    content: "\00a0";
    position: absolute;
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    pointer-events: none;
  }
  &:hover:before {
    border-bottom: 2px solid rgba(0, 0, 0, 0.87);
  }
  &:after {
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    transform: ${props => (props.isFocus ? "scaleX(1px)" : "scaleX(0)")};
    position: absolute;
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    border-bottom: ${props =>
      props.isFocus ? "2px solid #1976d2" : "1px solid rgba(0, 0, 0, 0.54)"};
    pointer-events: none;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  margin: 0;
  padding: 6px 0 7px;
  display: block;
  min-width: 0;
  box-sizing: content-box;
  background: none;
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  border: none;
  margin: 0;
  width: 100%;
  display: block;
  padding: 6px 0 7px;
  background: none;
  box-sizing: content-box;
  resize: none;
  &:focus {
    outline: none;
  }
`;

export default class TextField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onFocus: false
    };
  }

  static defaultProps = {
    name: null,
    value: ""
  };

  onTextFieldFocus = e => {
    this.setState({ onFocus: true });
  };

  onTextFieldBlur = e => {
    this.setState({ onFocus: false });
  };

  render() {
    const { name, value } = this.props;
    return (
      <Row>
        <Label isFocus={this.state.onFocus} text={value}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Label>
        <InputWrap isFocus={this.state.onFocus}>
          {this.props.multiline ? (
            <TextArea
              type={this.props.type || "text"}
              value={value}
              onBlur={this.onTextFieldBlur}
              onFocus={this.onTextFieldFocus}
              autoFocus={this.props.autoFocus}
              autoComplete={this.props.autoComplete}
              onChange={this.props.onChange}
              name={name}
            />
          ) : (
            <Input
              type={this.props.type || "text"}
              value={value}
              onBlur={this.onTextFieldBlur}
              onFocus={this.onTextFieldFocus}
              autoFocus={this.props.autoFocus}
              autoComplete={this.props.autoComplete}
              onChange={this.props.onChange}
              name={name}
            />
          )}
        </InputWrap>
      </Row>
    );
  }
}
