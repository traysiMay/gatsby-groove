import React, { useState, useEffect, useRef } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import headerStyles from "./header.module.scss"

const Header = () => {
  const [display, setDisplay] = useState(false)
  const dropDown = useRef()

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
      <Link className="link" to="/">
        <div className={headerStyles.title}>{data.site.siteMetadata.title}</div>
      </Link>
      <div
        onClick={!display && openDropDown}
        ref={dropDown}
        className={`${headerStyles.navList} ${
          display ? headerStyles.navListShow : headerStyles.navListHide
        }`}
      >
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
      </div>
    </header>
  )
}

export default Header
