import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { IconTimes } from "./../icons"
import CompareVersion from "./../../utils/version-compare"

const Dependencies = styled.div``

const Icon = styled(IconTimes)`
  position: absolute;
  top: 50%;
  right: 15px;
  margin-top: -7px;
  display: none;
`

const DependencyItem = styled.div`
  position: relative;
  border: 2px solid #f7f7f7;
  background: #ffffff;
  line-height: 24px;
  padding: 8px 40px 8px 16px;
  margin: 8px 0;
  border-radius: 4px;
  cursor: pointer;
  &:hover ${Icon} {
    display: block;
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

class List extends React.Component {
  constructor(props) {
    super(props)
  }

  onClick = dependency => {
    this.props.remove(dependency)
  }

  render() {
    let dependencies = this.props.list
    return (
      <Dependencies>
        {dependencies.map(dependency => {
          const compatibility = dependency.versionRange
            ? CompareVersion(this.props.boot, dependency.versionRange)
            : true
          return (
            <DependencyItem
              onClick={() => {
                this.onClick(dependency)
              }}
              key={dependency.id}
            >
              <Title>
                {dependency.name} <span>{dependency.group}</span>
              </Title>
              <Description>{dependency.description}</Description>
              <Icon />
              {!compatibility && (
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

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      group: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  remove: PropTypes.func.isRequired,
  boot: PropTypes.string.isRequired,
}

export default List
