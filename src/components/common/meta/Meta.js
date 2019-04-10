import React from "react"
import Helmet from "react-helmet"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import ImageMeta from "./ImageMeta"

const Meta = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            canonical
            twitter
            image
          }
        }
      }
    `
  )
  const metaData = site.siteMetadata
  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>

        <meta name="description" content={metaData.description} />
        <link rel="canonical" href={metaData.canonical} />

        <meta property="og:site_name" content={metaData.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:url" content={metaData.canonical} />

        <meta name="twitter:title" content={metaData.title} />
        <meta name="twitter:description" content={metaData.description} />
        <meta name="twitter:url" content={metaData.canonical} />
        <meta name="twitter:site" content={metaData.twitter} />
        <meta name="twitter:creator" content={metaData.twitter} />
      </Helmet>
      <ImageMeta image={metaData.image} />
    </>
  )
}

Meta.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  canonical: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.oneOf([`website`, `series`]).isRequired,
}

export default Meta
