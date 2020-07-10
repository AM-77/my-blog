import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <div className={`layout-container ${ (location.pathname === rootPath) ? 'home' : ''}`}>
      { 
        (location.pathname !== rootPath) && 
        <header>
          <h3 className="link" ><Link to={`/`}>{title}</Link></h3>
        </header>
      }
      <main>{children}</main>
      {/* <footer>
        © {new Date().getFullYear()}, Built with{` `}<a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer> */}
    </div>
  )
}

export default Layout
