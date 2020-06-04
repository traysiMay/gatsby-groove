import React, { useState, useEffect } from "react"
import "../styles/index.scss"
import Layout from "../components/layout"
import Head from "../components/head"
import Spotify from "../icons/spotify"
import { getQueryParam } from "../library/getQueryParam"
import Img from "gatsby-image"

export const query = graphql`
  query {
    allContentfulFeaturedContent {
      edges {
        node {
          name
          live
          timeOfDay
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`

const IndexPage = props => {
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
  console.log(props.data.allContentfulFeaturedContent.edges[0].node.image)
  const src = props.data.allContentfulFeaturedContent.edges[0].node.image.fluid
  console.log(src)
  return (
    <Layout>
      <Head title="Home" />
      <div className="whatever">
        {/* <Img fluid={src} /> */}
        {user ? `Oh Hi! ${user} :D` : "This Site is Under Construction"}
        <Spotify />
      </div>
    </Layout>
  )
}

export default IndexPage
