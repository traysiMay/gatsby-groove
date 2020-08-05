import React, { useState, useEffect } from "react"
import "../styles/index.scss"
import Layout from "../components/layout"
import Head from "../components/head"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import getUser from "../services/get-user"

export const query = graphql`
  query {
    allContentfulHomePlaceholder {
      edges {
        node {
          content {
            json
          }
        }
      }
    }
  }
`

const IndexPage = props => {
  const [user, setUser] = useState()

  useEffect(() => {
    const currentToken = localStorage.getItem("token")
    if (currentToken) {
      getUser(currentToken).then(data => setUser(data.display_name))
    }

    const handlerEvent = event => {
      console.log("index storage event")
      if (event.key !== "token") return
      getUser(event.newValue).then(data => setUser(data.display_name))
    }
    if (window) window.addEventListener("storage", handlerEvent, false)

    return () => window.removeEventListener("storage", handlerEvent, false)
  }, [])
  const json =
    props.data.allContentfulHomePlaceholder.edges[0].node.content.json
  return (
    <Layout>
      <Head title="Home" />
      <div className="whatever">
        {user && `Oh Hi! ${user} :D`}
        {documentToReactComponents(json)}
      </div>
    </Layout>
  )
}

export default IndexPage
