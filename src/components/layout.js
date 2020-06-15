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
  }, [])
  useEffect(() => {
    const currentToken = localStorage.getItem("token")
    const refreshToken = localStorage.getItem("r_token")
    // if (currentToken) {
    //   getUser(currentToken).then(data => setUser(data.display_name))
    // }
    if (window && window.location.href.includes("token")) {
      const token = getQueryParam("token")
      const rToken = getQueryParam("r_token")
      localStorage.setItem("token", token)
      localStorage.setItem("rToken", rToken)
      window.close()
    }
    // const handlerEvent = event => {
    //   console.log("index storage event")
    //   if (event.key !== "token") return
    //   getUser(event.newValue).then(data => setUser(data.display_name))
    // }
    // if (window) window.addEventListener("storage", handlerEvent, false)

    // return () => window.removeEventListener("storage", handlerEvent, false)
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
