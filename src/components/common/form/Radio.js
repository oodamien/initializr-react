import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

const RadioStyled = styled.a.attrs({
  href: "#",
})`
  display: inline-block;
  border-bottom: 3px solid #e4e4e4;
  text-decoration: none;
  color: #888;
  line-height: 32px;
  padding: 0 16px;
  text-align: center;
  font-weight: 700;
  cursor: pointer;
  margin-right: 4px;

  ${({ checked }) =>
    checked &&
    css`
      border-bottom-color: #6db33f;
      color: #000;
    `}
`

class Radio extends React.Component {
  constructor(props) {
    super(props)
  }

  onClick = event => {
    event.preventDefault()
    this.props.handler(this.props.value)
  }

  render() {
    return (
      <RadioStyled checked={this.props.checked} onClick={this.onClick}>
        {this.props.text}
      </RadioStyled>
    )
  }
}

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
}

export default Radio
