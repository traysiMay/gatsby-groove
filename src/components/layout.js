import React from "react"

import Header from "./header"

import layoutStyles from "./layout.module.scss"

const Layout = ({ children, pageTitle }) => {
  return (
    <div className={layoutStyles.container}>
      <Header />
      <h1 className={layoutStyles.pageTitle}>{pageTitle}</h1>
      <div className={layoutStyles.content}>{children}</div>
    </div>
  )
}

export default Layout
