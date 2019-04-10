import React from "react"
import PropTypes from "prop-types"

import Header from "./Header"
import QuickLinks from "./QuickLinks"
import theme from "./../theme"

import { ThemeProvider, createGlobalStyle } from "styled-components"
import { normalize } from "polished"

const GlobalStyle = createGlobalStyle`
  ${normalize()}
  body {
    font-family: ${({ theme }) => theme.fonts.text};
    line-height: ${({ theme }) => theme.lineHeights.body}px;
    font-size: 15px;
    line-height: 32px;
    background-color: #fff;
    background-repeat: repeat-y;
    background-size: 316px 1px;
    background-image: url(data:image/gif;base64,R0lGODlheAICAIAAAH2vUPf39yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRjJERDYwM0ZBMkIxMUU4QkFDMEIyRkQzQjlGREMwMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRjJERDYwNEZBMkIxMUU4QkFDMEIyRkQzQjlGREMwMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBGMkRENjAxRkEyQjExRThCQUMwQjJGRDNCOUZEQzAyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBGMkRENjAyRkEyQjExRThCQUMwQjJGRDNCOUZEQzAyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAHgCAgAAAiaEb6HL7Q+jnLTai7PevPsPhuJIluaJpmqJIOsLx/JM1/aN5/puFwA7);
  }
`

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div>
      <GlobalStyle />
      <Header>
        <QuickLinks />
      </Header>
      <main>{children}</main>
    </div>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
