import PropTypes from 'prop-types'
import React from 'react'

import CompareVersion from './../../utils/version-compare'
import { IconChevronRight } from './../icons'

class CheckboxList extends React.Component {
  constructor() {
    super()
    this.state = {
      showGroupItems: {},
    }
  }

  toggleGroupItems = groupId => {
    const currentToggleStateForGroup = this.getCurrentStateForGroupId(groupId)
    const newToggleState = currentToggleStateForGroup ? false : true

    const newState = { ...this.state.showGroupItems }
    newState[groupId] = newToggleState

    this.setState({
      showGroupItems: newState,
    })
  }

  getCurrentStateForGroupId(groupId) {
    return this.state.showGroupItems[groupId]
  }

  groupByParent = arr => {
    const map = []
    const getParent = (m, name) => {
      return m.find(item => item.group === name)
    }
    for (var i = 0; i < arr.length; i++) {
      const dep = arr[i]
      let parent = getParent(map, dep.group)
      if (!parent) {
        parent = {
          group: dep.group,
          children: [],
        }
        map.push(parent)
      }
      const valid = dep.versionRange
        ? CompareVersion(this.props.boot, dep.versionRange)
        : true
      parent.children.push({ ...dep, valid: valid })
    }
    return map
  }

  onClick = event => {
    const target = event.target
    const item = this.props.list.find(item => item.id === target.value)
    if (target.checked) {
      this.props.add(item)
    } else {
      this.props.remove(item)
    }
  }

  setGroupLabel(group) {
    let numberOfSlectedItemsForGroup = 0
    this.props.checked.forEach(item => {
      if (item.group === group.group) {
        numberOfSlectedItemsForGroup++
      }
    })
    if (numberOfSlectedItemsForGroup > 0) {
      return (
        <span className='group-label'>
          {group.group} ( {numberOfSlectedItemsForGroup} selected )
        </span>
      )
    } else {
      return <span className='group-label'>{group.group}</span>
    }
  }

  renderGroupItems(group, select) {
    if (this.getCurrentStateForGroupId(group.group)) {
      return (
        <div className='group-items' key={`links${group.group}`}>
          {group.children.map(dep => (
            <a
              href='/'
              onClick={event => {
                event.preventDefault()
                if (!dep.valid) {
                  return
                }
                this.onClick({
                  target: {
                    value: dep.id,
                    checked: !select[dep.id] === true,
                  },
                })
              }}
              tabIndex={!dep.valid ? -1 : ''}
              className={`${!dep.valid ? 'invalid' : ''} ${
                select[dep.id] === true ? 'checked' : ''
              }`}
              key={dep.id}
            >
              <input
                type='checkbox'
                value={dep.id}
                key={`ck${dep.id}`}
                checked={select[dep.id] === true}
                disabled={!dep.valid}
                onChange={this.onClick}
              />
              <strong>{dep.name}</strong>
              {dep.valid && <span>{dep.description}</span>}
              {!dep.valid && (
                <div className='warning' key={`warning${dep.id}`}>
                  Requires Spring Boot {dep.versionRequirement}.
                </div>
              )}
            </a>
          ))}
        </div>
      )
    } else {
      return <div />
    }
  }

  render() {
    const grouped = this.groupByParent(this.props.list)
    const select = {}
    this.props.checked.forEach(item => {
      select[item.id] = true
    })
    return (
      <div className='groups'>
        {grouped.map(group => (
          <div className='group' key={group.group}>
            <div className='group-title' key={`title${group.group}`}>
              <span
                onClick={() => this.toggleGroupItems(group.group)}
                className={
                  this.state.showGroupItems[group.group]
                    ? 'toggleGroupItems'
                    : ''
                }
              >
                <IconChevronRight />
                {this.setGroupLabel(group)}
              </span>
            </div>
            {this.renderGroupItems(group, select)}
          </div>
        ))}
      </div>
    )
  }
}

CheckboxList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      group: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      versionRange: PropTypes.string,
      versionRequirement: PropTypes.string,
    })
  ),
  checked: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      group: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      versionRange: PropTypes.string,
      versionRequirement: PropTypes.string,
    })
  ),
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  boot: PropTypes.string.isRequired,
}

export default CheckboxList
