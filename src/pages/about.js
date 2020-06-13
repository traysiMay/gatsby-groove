import React from "react"
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

export const query = graphql`
  query {
    allContentfulAboutPlaceholder {
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

const AboutPage = props => {
  const {
    json,
  } = props.data.allContentfulAboutPlaceholder.edges[0].node.content
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} width="80%" />
      },
    },
  }
  return (
    <Layout pageTitle="About">
      {documentToReactComponents(json, options)}
    </Layout>
  )
}

export default AboutPage
