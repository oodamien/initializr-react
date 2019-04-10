import { Link } from "gatsby"
import React from "react"
import Logo from "./Logo"
import styled from "styled-components"

import { IconGithub, IconTwitter, IconSpring, IconCaretDown } from "../icons"

const Nav = styled.ul`
  position: absolute;
  top: 10px;
  right: 20px;
  color: #ccc;
  width: 320px;
  text-align: right;
  list-style: none;
  margin: 0;
  padding: 0;
`

const NavItem = styled.li`
  display: inline;
`

const NavLink = styled(Link)`
  margin: 0 12px;
  padding-left: 24px;
  padding-right: 4px;
  text-decoration: none;
  position: relative;
  color: #000;
  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
  }
  svg.caret {
    position: relative;
    width: 10px;
    top: 3px;
    margin-left: 10px;
  }
  :hover {
    color: #6db33f;
    svg {
      color: #6db33f;
    }
  }
`

const NavHelp = styled.a`
  margin: 0 12px;
  padding-left: 24px;
  padding-right: 4px;
  text-decoration: none;
  position: relative;
  color: #000;
  cursor: pointer;
  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
  }
  svg.caret {
    position: relative;
    width: 10px;
    top: 3px;
    margin-left: 10px;
  }
  :hover {
    color: #6db33f;
    svg {
      color: #6db33f;
    }
  }
`

const DropdownMenu = styled.div`
  z-index: 999;
  position: absolute;
  top: 34px;
  right: 0;
  background: white;
  width: 200px;
  padding: 0;
  margin: 0;
  list-style: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: left;
`
const MenuLink = styled.a`
  display: block;
  padding: 4px 12px;
  margin: 0;
  position: relative;
  color: #000;
  text-decoration: none;
  :hover {
    background: #e7f1f4;
  }
`

class QuickLinks extends React.Component {
  constructor(props) {
    super(props)

    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)

    this.state = {
      help: false,
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ help: false })
    }
  }

  render() {
    return (
      <Nav>
        <NavItem>
          <NavLink to="/">
            <IconGithub />
            Github
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/">
            <IconTwitter />
            Twitter
          </NavLink>
        </NavItem>
        <NavItem>
          <NavHelp
            onClick={() => {
              this.setState({ help: !this.state.help })
            }}
          >
            <IconSpring />
            Help
            <IconCaretDown className="caret" />
          </NavHelp>
          {this.state.help && (
            <DropdownMenu class="dropdown-menu" ref={this.setWrapperRef}>
              <li>
                <MenuLink
                  id="ql-help-projects"
                  target="_blank"
                  href="https://spring.io/projects"
                  onClick={() => {
                    this.setState({ help: false })
                  }}
                >
                  Spring Projects
                </MenuLink>
              </li>
              <li>
                <MenuLink
                  id="ql-help-guides"
                  target="_blank"
                  href="https://spring.io/guides"
                  onClick={() => {
                    this.setState({ help: false })
                  }}
                >
                  Spring Guides
                </MenuLink>
              </li>
            </DropdownMenu>
          )}
        </NavItem>
      </Nav>
    )
  }
}

export default QuickLinks
