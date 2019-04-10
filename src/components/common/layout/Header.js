import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import Logo from "./Logo"

const HeaderStyled = styled.header`
  width: 320px;
`

const TitleH1 = styled.h1`
  margin: 0 20px 0 24px;
  padding: 16px 0 16px;
  width: 280px;
`

const TitleLink = styled(Link)`
  display: block;
  position: relative;
  padding: 4px 0;
  padding-left: 65px;
  color: #000;
  text-decoration: none;
  font-size: 1rem;
  line-height: 1.6rem;
  font-weight: 400;
  width: 205px;
`

const Title = styled.strong`
  display: block;
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: -1px;
`

const TitleStrong = styled.span`
  font-weight: 700;
  color: #6db33f;
`

const LogoStyled = styled(Logo)`
  width: 50px;
  position: absolute;
  left: 0;
  top: 6px;
`

const Header = ({ children }) => (
  <HeaderStyled>
    <TitleH1>
      <TitleLink to="/">
        <LogoStyled />
        <Title>
          Spring <TitleStrong>Initializr</TitleStrong>
        </Title>
        Bootstrap your application
      </TitleLink>
    </TitleH1>
    {children}
  </HeaderStyled>
)

Header.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Header
