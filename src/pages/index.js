import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="AM77 blog" />
      <div className="home-container">
        <Bio />
        <div className="all-posts">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <article className="post-card" key={node.fields.slug}>
                <header>
                  <h3 className="post-title link"><Link to={node.fields.slug}>{title}</Link></h3>
                  <p className="post-date">{node.frontmatter.date}</p>
                </header>
                <section>
                  <p dangerouslySetInnerHTML={{ __html: node.frontmatter.description || node.excerpt }} />
                </section>
              </article>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
