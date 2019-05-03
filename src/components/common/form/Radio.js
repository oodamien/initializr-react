import PropTypes from 'prop-types'
import React from 'react'

class Radio extends React.Component {
  onClick = event => {
    event.preventDefault()
    this.props.handler(this.props.value)
  }

  render() {
    return (
      <a
        href='/'
        className={`radio ${this.props.checked ? 'checked' : ''}`}
        onClick={this.onClick}
      >
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
