import React, { useState, useEffect, useRef } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import headerStyles from "./header.module.scss"
import TimeOfDay from "./timeofday"

const Header = () => {
  const [display, setDisplay] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState(null)
  const dropDown = useRef()
  const canvasRef = useRef()

  const openDropDown = () => setDisplay(true)
  const closeDropDown = () => setDisplay(false)

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")
    const time = new Date()
    const mins = time.getMinutes()
    const hrs = time.getHours()

    if (hrs > 5 && hrs < 15) {
      setTimeOfDay("morning")
    } else if (hrs > 15 && hrs < 20) {
      setTimeOfDay("afternoon")
    } else {
      setTimeOfDay("night")
    }

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
  return (
    <header className={headerStyles.header}>
      <TimeOfDay timeOfDay={timeOfDay} />
      <canvas
        aria-label="Sun Dial"
        ref={canvasRef}
        width="400"
        height="400"
        className={headerStyles.canvas}
      />
      <Link className="link" to="/">
        <div className={headerStyles.title}>{data.site.siteMetadata.title}</div>
      </Link>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={!display ? openDropDown : () => {}}
        onClick={!display ? openDropDown : () => {}}
        ref={dropDown}
        className={`${headerStyles.navList} ${
          display ? headerStyles.navListShow : headerStyles.navListHide
        }`}
      >
        {display && (
          <ul>
            <li>
              <Link className={headerStyles.link} to="/blog">
                Blog
              </Link>
              <div
                role="button"
                tabIndex={-1}
                onKeyDown={closeDropDown}
                onClick={closeDropDown}
                className={headerStyles.x}
              >
                X
              </div>
            </li>

            <li>
              <Link className={headerStyles.link} to="/playlists">
                Playlist
              </Link>
            </li>
            <li>
              <Link className={headerStyles.link} to="/culture">
                Culture
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}

export default Header
