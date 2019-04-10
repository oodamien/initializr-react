import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  padding: 4px 0 0;
`

const ExternalLink = styled.a`
  color: #097dff;
`

const Footer = ({ className }) => (
  <footer className={className}>
    <Wrapper>
      © 2013-{new Date().getFullYear()} Pivotal Software
      <br />
      start.spring.io is powered by
      <br />
      <ExternalLink href="https://github.com/spring-io/initializr/">
        Spring Initializr
      </ExternalLink>
      {` `}and{` `}
      <ExternalLink href="https://run.pivotal.io/">
        Pivotal Web Services
      </ExternalLink>
    </Wrapper>
  </footer>
)

export default styled(Footer)`
  background: #f7f7f7;
  line-height: 24px;
  padding: 0 40px 0 8px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  letter-spacing: -0.5px;
  text-align: right;
`
