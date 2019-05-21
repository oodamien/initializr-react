import PropTypes from 'prop-types'
import React from 'react'

import CompareVersion from './../../utils/version-compare'
import DependencyGroup from './DependencyGroup'

class CheckboxList extends React.Component {
  groupByParent = list => {
    const map = []
    const getParent = (map, name) => {
      return map.find(item => item.group === name)
    }
    for (var i = 0; i < list.length; i++) {
      const dep = list[i]
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

  render() {
    const groups = this.groupByParent(this.props.list)
    const select = {}
    this.props.checked.forEach(item => {
      select[item.id] = true
    })
    return (
      <div className='groups'>
        {groups.map(group => (
          <DependencyGroup
            key={group.group}
            dependencyGroup={group}
            addDependency={this.props.add}
            removeDependency={this.props.remove}
            selectedDependencies={select}
          />
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
