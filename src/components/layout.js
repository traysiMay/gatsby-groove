import React, { useEffect } from "react"
import { connect } from "react-redux"
import Header from "./header"

import layoutStyles from "./layout.module.scss"
import getUser from "../services/get-user"

const Layout = ({
  check_spotify,
  children,
  device_type,
  dispatch,
  loaded,
  pageTitle,
}) => {
  useEffect(() => {
    console.log(check_spotify)
    if (localStorage && !check_spotify) {
      console.log("checking...")
      const token = localStorage.getItem("token")
      if (token) {
        getUser(token).then(data => {
          if (!data.error) {
            dispatch({ type: "CHECK_AND_AUTH", response: true })
          }
        })
      }
    }
  })
  console.log(check_spotify)
  return (
    <div className={layoutStyles.container}>
      <Header />
      <h1 className={layoutStyles.pageTitle}>{pageTitle}</h1>
      <div className={layoutStyles.content}>{children}</div>
    </div>
  )
}

const mapStateToProps = ({ check_spotify, device_type, loaded }) => ({
  check_spotify,
  device_type,
  loaded,
})

const mapDispatchToProps = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(Layout)
