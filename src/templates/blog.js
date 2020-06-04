import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import blogStyles from "./blog.module.scss"

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
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} />
      },
    },
  }
  return (
    <Layout>
      <div className={blogStyles.container}>
        <h1 className={blogStyles.title}>
          {props.data.contentfulBlogPost.title}
        </h1>
        <p className={blogStyles.date}>
          {props.data.contentfulBlogPost.publishedDate}
        </p>
        <p className={blogStyles.author}>
          <div>
            <img
              src={props.data.contentfulBlogPost.image.resize.src}
              alt={"eep"}
            />
            {props.data.contentfulBlogPost.author.name}{" "}
          </div>
        </p>
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
