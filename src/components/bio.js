/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 250, height: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata

  return (
    <div className="bio-container">
      <div className="header">
        <div  className="author-pic">
          <Image fixed={data.avatar.childImageSharp.fixed} alt={author.name} />
        </div>
        <div className="author-info">
          <p className="author-name">{author.name}</p>
          <p className="author-summary">{author.summary}</p>
        </div>
      </div>
      <div className="footer">
        <p>You can find me here: </p>
        <div className="links">
          <Link to="https://am-77.github.io/" title="AM-77" >website</Link>
          <Link to="https://github.com/am-77" title="AM-77" >github</Link>
          <Link to="https://twitter.com/__AM77__" title="__AM77__" >twitter</Link>
          <Link to="https://www.linkedin.com/in/mohamed-amine-griche" title="mohamed-amine-griche">linkedin</Link>
          <Link to="https://www.npmjs.com/~am-77" title="AM-77" >npm</Link>
          <Link to="https://dev.to/am77" title="AM-77" >dev.to</Link>
          <Link to="https://stackoverflow.com/users/10564525" title="AM-77">stackoverflow</Link>
          <Link to="https://codepen.io/am-77" title="AM-77" >codepen</Link>
        </div>
      </div>

    </div>
  )
}

export default Bio
