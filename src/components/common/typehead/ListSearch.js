import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"
import { IconPlus } from "./../icons"
import CompareVersion from "./../../utils/version-compare"

const Dependencies = styled.div``

const Icon = styled(IconPlus)`
  position: absolute;
  top: 50%;
  right: 15px;
  margin-top: -7px;
  display: none;
`

const DependencyItem = styled.div`
  display: block;
  border: 2px solid #f7f7f7;
  background: #f7f7f7;
  line-height: 24px;
  padding: 8px 40px 8px 16px;
  margin: 8px 0;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  
  ${({ selected }) =>
    selected &&
    css`
      background: #e7f1f4;
      border-color: #e7f1f4;
      ${Icon} {
        display: block;
      }
    `}
    
  ${({ invalid }) =>
    invalid &&
    css`
      background: #ffe2e2;
      border-color: #ffe2e2;
      cursor: not-allowed;
    `}
  }
`

const Title = styled.div`
  font-weight: bold;
`
const Description = styled.div`
  color: rgba(0, 0, 0, 0.6);
`
const Warning = styled.div`
  font-weight: bold;
  color: #f30808;
`

class ListSearch extends React.Component {
  constructor(props) {
    super(props)
  }

  onClick = dependency => {
    this.props.onAdded(dependency)
  }

  onMouseEnter = index => {
    this.props.onSelectedChanged(index)
  }

  onMouseLeave = index => {
    this.props.onSelectedChanged(-1)
  }

  render() {
    let dependencies = this.props.dependencies
    if (dependencies.length > 5) {
      dependencies = dependencies.slice(0, 5)
    }
    return (
      <Dependencies>
        {dependencies.map((dependency, index) => {
          const valid = dependency.versionRange
            ? CompareVersion(this.props.boot, dependency.versionRange)
            : true
          return (
            <DependencyItem
              key={`item${dependency.id}`}
              invalid={!valid}
              selected={this.props.selected === index}
              onClick={() => {
                if (valid) {
                  this.onClick(dependency)
                }
              }}
              onMouseEnter={() => {
                this.onMouseEnter(index)
              }}
              onMouseLeave={() => {
                this.onMouseLeave(index)
              }}
              key={dependency.id}
            >
              <Title key={`item${dependency.id}`}>
                {dependency.name} <span>{dependency.group}</span>
              </Title>
              <Description key={`description{dependency.id}`}>
                {dependency.description}
              </Description>
              <Icon key={`icon${dependency.id}`} />
              {!valid && (
                <Warning key={`warning${dependency.id}`}>
                  Requires Spring Boot {dependency.versionRequirement}.
                </Warning>
              )}
            </DependencyItem>
          )
        })}
      </Dependencies>
    )
  }
}

ListSearch.propTypes = {
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
  onAdded: PropTypes.func.isRequired,
  boot: PropTypes.string.isRequired,
  selected: PropTypes.number,
  onSelectedChanged: PropTypes.func.isRequired,
}

export default ListSearch
