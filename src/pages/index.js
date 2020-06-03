import React, { useState, useEffect } from "react"
import "../styles/index.scss"
import Layout from "../components/layout"
import Head from "../components/head"
import Spotify from "../icons/spotify"
import { getQueryParam } from "../library/getQueryParam"

const IndexPage = () => {
  const [user, setUser] = useState()
  useEffect(() => {
    fetch("https://groove-server.glitch.me", { mode: "no-cors" })
    if (window && window.location.href.includes("token")) {
      const token = getQueryParam("token")
      const rToken = getQueryParam("r_token")
      localStorage.setItem("token", token)
      localStorage.setItem("rToken", rToken)
      window.close()
    }
    const handlerEvent = event => {
      if (event.key !== "token") return
      fetch("https://api.spotify.com/v1/me/", {
        headers: {
          Authorization: `Bearer ${event.newValue}`,
        },
      })
        .then(r => r.json())
        .then(data => {
          setUser(data.display_name)
        })
    }

    if (window) window.addEventListener("storage", handlerEvent, false)

    return () => window.removeEventListener("storage", handlerEvent, false)
  }, [])
  return (
    <Layout>
      <Head title="Home" />
      <div className="whatever">
        {user ? `Oh Hi! ${user} :D` : "This Site is Under Construction"}
        <Spotify />
      </div>
    </Layout>
  )
}

export default IndexPage
