import { Link } from "gatsby"
import React from "react"
import Logo from "./Logo"

import { IconGithub, IconTwitter, IconSpring, IconCaretDown } from "../icons"

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
      <ul className="quick-links">
        <li>
          <Link to="/">
            <IconGithub />
            Github
          </Link>
        </li>
        <li>
          <Link to="/">
            <IconTwitter />
            Twitter
          </Link>
        </li>
        <li>
          <a
            className="dropdown"
            onClick={() => {
              this.setState({ help: !this.state.help })
            }}
          >
            <IconSpring />
            Help
            <IconCaretDown className="caret" />
          </a>
          {this.state.help && (
            <ul className="dropdown-menu" ref={this.setWrapperRef}>
              <li>
                <a
                  id="ql-help-projects"
                  target="_blank"
                  href="https://spring.io/projects"
                  onClick={() => {
                    this.setState({ help: false })
                  }}
                >
                  Spring Projects
                </a>
              </li>
              <li>
                <a
                  id="ql-help-guides"
                  target="_blank"
                  href="https://spring.io/guides"
                  onClick={() => {
                    this.setState({ help: false })
                  }}
                >
                  Spring Guides
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    )
  }
}

export default QuickLinks
