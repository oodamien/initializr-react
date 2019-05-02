import React from "react"
import PropTypes from "prop-types"

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
      <a href="#" className={`radio ${this.props.checked ? 'checked' : ''}`} onClick={this.onClick}>
        {this.props.text}
      </a>
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
