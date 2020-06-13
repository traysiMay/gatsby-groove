import React from "react"
import Player from "./src/containers/player"

export const wrapPageElement = ({ element, props }) => {
  return (
    <div>
      {element}
      <Player />
    </div>
  )
}
