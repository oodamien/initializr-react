import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"
import { IconPlus } from "./../icons"
import CompareVersion from "./../../utils/version-compare"

const Groups = styled.div`
  padding: 0 0 16px 0;
  margin-top: -27px;
`

const Group = styled.div`
  line-height: 1.4rem;
  position: relative;
  border-bottom: 1px solid #eee;
  padding: 16px 0 16px 0;
`

const GroupTitle = styled.div`
  font-weight: bold;
  color: #6db33f;
  margin-top: 16px;
  position: sticky;
  width: 150px;
  top: 10px;
  float: left;
`

const GroupLinks = styled.div`
  padding-left: 160px;
`

const GroupLink = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  padding: 8px 40px 8px 35px;
  margin: 8px 0;
  border-radius: 4px;
  :hover {
    background: #f7f7f7;
  }
  span {
    color: rgba(0, 0, 0, 0.6);
  }
  
  ${({ invalid }) =>
    invalid &&
    css`
      cursor: not-allowed;
      :hover {
        background: #fff;
      }
    `}
  }
`

const GroupInput = styled.input`
  display: inline-block;
  margin-left: -22px;
  margin-right: 10px;
`

const Warning = styled.div`
  font-weight: bold;
  color: #f30808;
`

class CheckboxList extends React.Component {
  constructor(props) {
    super(props)
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

  render() {
    const grouped = this.groupByParent(this.props.list)
    const select = {}
    this.props.checked.forEach(item => {
      select[item.id] = true
    })
    return (
      <Groups>
        {grouped.map(group => (
          <Group key={group.group}>
            <GroupTitle key={`title${group.group}`}>{group.group}</GroupTitle>
            <GroupLinks key={`links${group.group}`}>
              {group.children.map(dep => (
                <GroupLink invalid={!dep.valid} key={dep.id}>
                  <GroupInput
                    value={dep.id}
                    key={`ck${dep.id}`}
                    checked={select[dep.id] === true}
                    type="checkbox"
                    disabled={!dep.valid}
                    onChange={this.onClick}
                  />
                  <strong>{dep.name}</strong>:{` `}
                  <span>{dep.description}</span>
                  {!dep.valid && (
                    <Warning key={`warning${dep.id}`}>
                      Requires Spring Boot {dep.versionRequirement}.
                    </Warning>
                  )}
                </GroupLink>
              ))}
            </GroupLinks>
          </Group>
        ))}
      </Groups>
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
