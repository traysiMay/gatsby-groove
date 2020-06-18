import React from "react"
import wrapWithProvider from "./wrap-with-provider"
import Player from "./src/containers/player"

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      key="https://sdk.scdn.co/spotify-player.js"
      src="https://sdk.scdn.co/spotify-player.js"
      crossOrigin="anonymous"
      defer
    />,
  ])
}

export const wrapPageElement = ({ element, props }) => {
  return (
    <div>
      {element}
      <Player />
    </div>
  )
}

export const wrapRootElement = wrapWithProvider
