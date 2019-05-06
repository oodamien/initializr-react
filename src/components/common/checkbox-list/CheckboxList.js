import PropTypes from 'prop-types'
import React from 'react'

import CompareVersion from './../../utils/version-compare'
import { IconPlus, IconTimes } from './../icons'

class CheckboxList extends React.Component {
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
              <span>{group.group}</span>
            </div>
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
                  {!select[dep.id] === true ? <IconPlus /> : <IconTimes />}
                </a>
              ))}
            </div>
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
