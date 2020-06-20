import React, { useEffect, useContext } from "react"
import Header from "./header"

import layoutStyles from "./layout.module.scss"
import getUser from "../services/get-user"
import { myContext } from "../../wrap-with-provider"
import { getQueryParam } from "../library/getQueryParam"

const Layout = ({ children, pageTitle }) => {
  const context = useContext(myContext)
  useEffect(() => {
    if (!context) return
    const { checkSpotify, setCheckSpotify, setCheckAuthorized } = context
    if (checkSpotify) return
    getUser(localStorage.getItem("token")).then(data => {
      if (!data.error) {
        setCheckSpotify(true)
        if (data.display_name) {
          setCheckAuthorized(true)
        }
      }
    })
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (window && window.location.href.includes("token")) {
      const token = getQueryParam("token")
      const rToken = getQueryParam("r_token")
      localStorage.setItem("token", token)
      localStorage.setItem("rToken", rToken)
      window.close()
    }
  }, [])
  return (
    <div className={layoutStyles.container}>
      <Header />
      <h1 className={layoutStyles.pageTitle}>{pageTitle}</h1>
      <div className={layoutStyles.content}>{children}</div>
    </div>
  )
}

export default Layout
