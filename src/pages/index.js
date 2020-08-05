import React, { Fragment } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import BlogItem from "../components/blogItem"

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            author {
              name
            }
            title
            slug
            publishedDate(formatString: "MMMM Do, YYYY")
            body {
              body
            }
            image {
              resize(width: 300) {
                src
              }
            }
          }
        }
      }
    }
  `)
  const posts = data.allContentfulBlogPost.edges
  return (
    <Layout pageTitle={""}>
      {posts.map(p => {
        const post = p.node
        const img = post.image.resize.src
        return (
          <Fragment key={post.slug}>
            <BlogItem post={post} img={img} />
          </Fragment>
        )
      })}
    </Layout>
  )
}

export default BlogPage
