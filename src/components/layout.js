import React from "react"
import { Link } from "gatsby"

import "./layout.css"
import ClientOnly from "./ClientOnly"
import Search from "./search.js"
//import Nav from "./nav"

const Layout = ({ title, children, data }) => {
  let header
  header = (
      <nav>
        <Link to={`/`}>
          {title}
        </Link>
        <> | </>
        <Link to={`/list`}>
          Index
        </Link>
        <> | </>
        <Link to={`/tags`}>
          Tags
        </Link>
        <> | </>
        <Link to={`/random`}>
          Random
        </Link>
        <> | </>
        <Link to={`/about`}>
          About
        </Link>
      </nav>
  )

  return (
    <div>
      <header>{header}</header>
      <br/>---
      <ClientOnly>
          <Search />
      </ClientOnly>
      <main>{children}</main>
      <footer>
          <small>
            © 2020, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
            , Inspired by <a href="https://johngrib.github.io/">john grib</a> and <a href="https://devroom.io">Ariejan de Vroom</a>
          </small>
      </footer>

    </div>
  )
}

export default Layout
