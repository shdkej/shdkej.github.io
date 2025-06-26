import React from "react"
import { Link } from "gatsby"

import "./layout.css"
import ClientOnly from "./ClientOnly"
import Search from "./search"

const Layout = ({ title, children }) => {
  let header
  header = (
    <nav>
      <Link to={`/`}>{title}</Link>
      <> | </>
      <Link to={`/tags`}>INDEX</Link>
      <> | </>
      <Link to={`/about`}>ABOUT</Link>
    </nav>
  )

  return (
    <div>
      <header>{header}</header>
      <br />
      ---
      <main>{children}</main>
      <ClientOnly>
        <Search />
      </ClientOnly>
      <footer>
        <small>
          © 2020, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>, Inspired by{" "}
          <a href="https://johngrib.github.io/">john grib</a> and{" "}
          <a href="https://devroom.io">Ariejan de Vroom</a>
        </small>
      </footer>
    </div>
  )
}

export default Layout
