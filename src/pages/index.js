import React, { useState, useEffect } from "react"
import "../styles/index.scss"
import Layout from "../components/layout"
import Head from "../components/head"

const IndexPage = () => {
  useEffect(() => {
    const handlerEvent = event => {
      fetch("https://api.spotify.com/v1/me/", {
        headers: {
          Authorization: `Bearer ${event.newValue}`,
        },
      })
        .then(r => r.json())
        .then(console.log)
    }
    window.addEventListener("storage", handlerEvent)
  }, [])
  if (window.location.href.includes("token")) {
    const token = window.location.href.split("?token=")[1]
    localStorage.setItem("token", token)
    window.close()
  }
  const spotAuth = () => {
    var scopes = "user-read-email user-follow-read"
    var redirect_uri = process.env.GATSBY_REDIRECT_URI
    const spotPop = window.open(
      "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=0740cd9b95fb44d4a58564b4b1e12811" +
        "&scope=" +
        encodeURIComponent(scopes) +
        "&redirect_uri=" +
        encodeURIComponent(redirect_uri),
      "login-popup",
      "width=500, height=400"
    )
  }
  console.log("wat")
  return (
    <Layout>
      <Head title="Home" />
      <div style={{ fontSize: "5rem", width: "80%", marginLeft: "5%" }}>
        Hello, I am under
        <br />
        construction :)
      </div>
      {/* <div onClick={spotAuth} style={{ color: "red" }}>
        SPOT
      </div> */}
    </Layout>
  )
}

export default IndexPage
