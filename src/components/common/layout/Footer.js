import React from 'react'
import { Link } from 'gatsby'

const Footer = () => (
  <footer className='footer'>
    <div className='footer-container'>
      © 2013-{new Date().getFullYear()} Pivotal Software
      <br />
      start.spring.io is powered by
      <br />
      <Link href='https://github.com/spring-io/initializr/'>
        Spring Initializr
      </Link>
      {` `}and{` `}
      <Link href='https://run.pivotal.io/'>Pivotal Web Services</Link>
    </div>
  </footer>
)

export default Footer
