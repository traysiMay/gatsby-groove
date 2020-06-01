import React, { useState, useEffect, useRef } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import headerStyles from "./header.module.scss"

const Header = () => {
  const [display, setDisplay] = useState(false)
  const dropDown = useRef()
  const canvasRef = useRef()

  const openDropDown = () => setDisplay(true)
  const closeDropDown = () => setDisplay(false)
  useEffect(() => {
    dropDown.current.addEventListener("mouseenter", openDropDown, false)
    dropDown.current.addEventListener("mouseleave", closeDropDown, false)

    dropDown.current.addEventListener("touch", openDropDown, false)

    return () => {
      dropDown.current.removeEventListener("mouseenter", openDropDown, false)
      dropDown.current.removeEventListener("mouseleave", closeDropDown, false)
      dropDown.current.removeEventListener("touch", openDropDown, false)
    }
  }, [display])

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")
    console.log(ctx)
    const time = new Date()
    const mins = time.getMinutes()
    const hrs = time.getHours()

    const numLines = mins + hrs * 60
    const r = 200
    const step = Math.PI / (60 * 24)
    for (let i = 0; i <= numLines; i++) {
      const x = r * Math.cos(step * i)
      const y = r * Math.sin(step * i)
      ctx.beginPath()
      ctx.moveTo(200, 0)
      ctx.lineTo(x + 200, y - 20)
      ctx.stroke()
    }
  }, [])

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)
  console.log(display)
  return (
    <header className={headerStyles.header}>
      <canvas
        ref={canvasRef}
        width="400"
        height="400"
        className={headerStyles.canvas}
      />
      <Link className="link" to="/">
        <div className={headerStyles.title}>{data.site.siteMetadata.title}</div>
      </Link>
      <div
        onClick={!display ? openDropDown : () => {}}
        ref={dropDown}
        className={`${headerStyles.navList} ${
          display ? headerStyles.navListShow : headerStyles.navListHide
        }`}
      >
        {display && (
          <ul>
            <div onClick={closeDropDown} className={headerStyles.x}>
              X
            </div>
            <li>
              <Link className={headerStyles.link} to="/blog">
                blog
              </Link>
            </li>
            <li>
              <Link className={headerStyles.link} to="/blog">
                playlists
              </Link>
            </li>
            <li>
              <Link className={headerStyles.link} to="/blog">
                culture
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}

export default Header
