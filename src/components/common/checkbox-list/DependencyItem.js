import React from 'react'

class DependencyItem extends React.Component {
  onClick = event => {
    const target = event.target

    if (target.checked) {
      this.props.addDependency(this.props.dep)
    } else {
      this.props.removeDependency(this.props.dep)
    }
  }

  render() {
    const dep = this.props.dep
    const selectedDependencies = this.props.selectedDependencies

    return (
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
              checked: !selectedDependencies[dep.id] === true,
            },
          })
        }}
        tabIndex={!dep.valid ? -1 : ''}
        className={`${!dep.valid ? 'invalid' : ''} ${
          selectedDependencies[dep.id] === true ? 'checked' : ''
        }`}
        key={dep.id}
      >
        <input
          type='checkbox'
          value={dep.id}
          key={`ck${dep.id}`}
          checked={selectedDependencies[dep.id] === true}
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
    )
  }
}

export default DependencyItem
