import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import MenuBar from "./menuBar"
import Image from "./image"
import styled from "@emotion/styled"
import "./layout.css"

const ExternalLink = styled.a`
  padding: 2px 5px 2px 5px;
  background-color: #ece6ff;
  border-radius: 2px;
  text-decoration: none;
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      Type: allAirtable(
        filter: { data: { Created_time: { eq: null } } }
        sort: { order: ASC, fields: data___Name }
      ) {
        edges {
          node {
            data {
              IconName
              Name
              Icon {
                localFiles {
                  publicURL
                  childImageSharp {
                    fluid(grayscale: true) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  console.log(data.Type.edges)

  return (
    <>
      <MenuBar
        siteTitle={data.site.siteMetadata.title}
        typeOfCompanies={data.Type.edges}
      />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer style={{ textAlign: `center`, marginTop: `80px` }}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">
            <Image />
          </a>
          , by{" "}
          <ExternalLink href="https://www.tiagofsanchez.com/">
            Tiago
          </ExternalLink>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
