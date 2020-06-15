import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import blogStyles from "./blog.module.scss"
import PlaylistEmbed from "../components/playlist-embed"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      author {
        name
      }
      title
      publishedDate(formatString: "MMMM Do, YYYY")
      body {
        json
      }
      image {
        resize(width: 300) {
          src
        }
      }
    }
  }
`

const Blog = props => {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} />
      },
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        const uri = node.data.target.fields.uri["en-US"]
        console.log(uri)
        return <PlaylistEmbed uri={uri} />
      },
    },
  }
  return (
    <Layout>
      <div className={blogStyles.container}>
        <h1 className={blogStyles.title}>
          {props.data.contentfulBlogPost.title}
        </h1>
        {/* <div className={blogStyles.date}>
          {props.data.contentfulBlogPost.publishedDate}
        </div> */}
        <p className={blogStyles.author}>
          {props.data.contentfulBlogPost.author.name}
        </p>
        {/* <div>
          <img
            src={props.data.contentfulBlogPost.image.resize.src}
            alt={"eep"}
          />
        </div> */}
        <div className={blogStyles.content}>
          {documentToReactComponents(
            props.data.contentfulBlogPost.body.json,
            options
          )}
        </div>
      </div>
    </Layout>
  )
}
export default Blog
