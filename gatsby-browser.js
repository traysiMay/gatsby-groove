import React from "react"
import wrapWithProvider from "./wrap-with-provider"
import Player from "./src/containers/player"

export const wrapPageElement = ({ element, props }) => {
  return (
    <div>
      {element}
      <Player />
    </div>
  )
}

export const wrapRootElement = wrapWithProvider
