import * as JsSearch from 'js-search'
import PropTypes from 'prop-types'
import React from 'react'

import CompareVersion from './../../utils/version-compare'
import SearchResultsList from './SearchResultsList'

class Typehead extends React.Component {
  search = null

  constructor(props) {
    super(props)
    this.state = {
      search: '',
      selected: 0,
    }
    this.search = new JsSearch.Search('name')
    this.search.addIndex('name')
    this.search.addIndex('id')
    this.search.addIndex('description')
    this.search.addIndex('group')
    this.search.addDocuments(this.props.options)
  }

  onChange = event => {
    this.setState({
      search: event.target.value,
      selected: 0,
      focus: false,
    })
  }

  onKeyPress = (event, dependencies) => {
    switch (event.keyCode) {
      case 40: // Down
        event.preventDefault()
        this.setState({
          selected: Math.min(
            this.state.selected + 1,
            dependencies.length - 1,
            4
          ),
        })
        break
      case 38: // Up
        event.preventDefault()
        this.setState({ selected: Math.max(this.state.selected - 1, 0) })
        break
      case 13: // Enter
        event.preventDefault()
        if (dependencies.length > 0) {
          this.onAdded(dependencies[this.state.selected])
        } else {
          this.props.submit(event)
        }
        break
      case 27: // Escape
        event.preventDefault()
        this.setState({ search: '' })
        break
      case 39: // Right
      case 37: // Left
        break
      default:
        // Default
        this.setState({ selected: 0 })
    }
  }

  onAdded = item => {
    const valid = item.versionRange
      ? CompareVersion(this.props.boot, item.versionRange)
      : true
    if (valid) {
      this.props.add(item)
      this.setState({ search: '', selected: 0 })
      this.nameInput.focus()
    }
  }

  onFocus = () => {
    if (this.state.selected === null) {
      this.setState({
        focus: true,
        selected: 0,
      })
    } else {
      this.setState({
        focus: true,
      })
    }
  }

  onBlur = () => {
    this.setState({ selected: null, focus: false })
  }

  onSelectedChanged = index => {
    this.setState({ selected: index })
  }

  showWarningForSearchReturn = dependencies => {
    if (dependencies.length > 5) {
      return (
        <label className='searchWarning'>
          More than 5 results found. Refine your search if necessary.
        </label>
      )
    }
  }

  render() {
    let dependencies = []
    if (this.state.search) {
      dependencies = this.search
        .search(this.state.search)
        .filter(item => !this.props.exclude.find(o => o.name === item.name))
    }
    return (
      <>
        <input
          type='text'
          className='control-input'
          placeholder='Web, Security, JPA, Actuator, Devtools...'
          value={this.state.search}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          id='input-quicksearch'
          ref={input => {
            this.nameInput = input
          }}
          onKeyDown={e => {
            this.onKeyPress(e, dependencies)
          }}
        />
        <SearchResultsList
          boot={this.props.boot}
          dependencies={dependencies}
          onAdded={this.onAdded}
          selected={this.state.selected}
          onSelectedChanged={this.onSelectedChanged}
        />
        {this.showWarningForSearchReturn(dependencies)}
      </>
    )
  }
}

Typehead.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      group: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      versionRequirement: PropTypes.string,
    })
  ),
  exclude: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      group: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      versionRequirement: PropTypes.string,
    })
  ),
  add: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  boot: PropTypes.string.isRequired,
}

export default Typehead
