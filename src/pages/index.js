import React from "react"
import "../styles/index.scss"
import Layout from "../components/layout"
import Head from "../components/head"
import water from "./water.png"
const IndexPage = () => {
  return (
    <Layout>
      <Head title="Home" />
      <div>
        <img
          src={water}
          width="50%"
          style={{ margin: "3rem auto", display: "block" }}
        />
      </div>
    </Layout>
  )
}

export default IndexPage
