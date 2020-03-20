import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import urljoin from "url-join"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, slug, title, image }) {
  const { site, logo } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            twitter
          }
        }
        logo: file(relativePath: { eq: "logo-icon.png" }) {
          childImageSharp {
            fixed(width: 90) {
              src
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const url = slug
    ? urljoin(site.siteMetadata.siteUrl, slug)
    : site.siteMetadata.siteUrl
  const twitter = site.siteMetadata.twitter


  let favicon = null
  if (image === undefined) {
    favicon = urljoin(site.siteMetadata.siteUrl, logo.childImageSharp.fixed.src)
  } else {
    favicon = urljoin(site.siteMetadata.siteUrl, image)
  }


  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={metaDescription} />
      {favicon && <meta name="image" content={favicon} />}

      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      {favicon && <meta property="og:image" content={favicon} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {favicon && <meta name="twitter:image" content={favicon} />}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default SEO
