import React, { useState, useEffect } from "react"
import "../styles/index.scss"
import Layout from "../components/layout"
import Head from "../components/head"
import Spotify from "../icons/spotify"

const IndexPage = () => {
  const [user, setUser] = useState()
  useEffect(() => {
    if (window && window.location.href.includes("token")) {
      const token = window.location.href.split("?token=")[1]
      localStorage.setItem("token", token)
      window.close()
    }
    const handlerEvent = event => {
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

    if (window) window.addEventListener("storage", handlerEvent)
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
