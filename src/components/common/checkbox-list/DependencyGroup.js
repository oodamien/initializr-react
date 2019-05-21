import PropTypes from 'prop-types'
import React from 'react'

import DependencyItem from './DependencyItem'
import { IconChevronRight } from './../icons'

class DependencyGroup extends React.Component {
  constructor() {
    super()
    this.state = {
      showGroupItems: true,
    }
  }

  toggleGroupItems() {
    this.setState({
      showGroupItems: !this.state.showGroupItems,
    })
  }

  checkIfKeyWasEnterOrSpaceAndToggle = (event, groupId) => {
    event.stopPropagation()
    var keyPressed = event.key
    if (keyPressed === 'Enter' || keyPressed === ' ') {
      event.preventDefault()
      this.toggleGroupItems(groupId)
    }
  }

  render() {
    const group = this.props.dependencyGroup
    const selectedDependencies = this.props.selectedDependencies

    return (
      <div className='group'>
        <div className='group-title'>
          <span
            onClick={() => this.toggleGroupItems()}
            className={this.state.showGroupItems ? 'toggleGroupItems' : ''}
            tabIndex={0}
            onKeyDown={event =>
              this.checkIfKeyWasEnterOrSpaceAndToggle(event, group.group)
            }
          >
            <IconChevronRight />

            <span className='group-label'>{group.group}</span>
          </span>
        </div>
        {this.state.showGroupItems && (
          <div className='group-items' key={`links${group.group}`}>
            {group.children.map(dep => (
              <DependencyItem
                key={dep.id}
                dep={dep}
                selectedDependencies={selectedDependencies}
                addDependency={this.props.addDependency}
                removeDependency={this.props.removeDependency}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}

DependencyGroup.propTypes = {
  addDependency: PropTypes.func.isRequired,
  removeDependency: PropTypes.func.isRequired,
  selectedDependencies: PropTypes.object,
  group: PropTypes.shape({
    group: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        group: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        keywords: PropTypes.string,
        name: PropTypes.string.isRequired,
        valid: PropTypes.bool.isRequired,
        versionRange: PropTypes.string,
        versionRequirement: PropTypes.string,
        weight: PropTypes.number,
      })
    ),
  }),
}

export default DependencyGroup
