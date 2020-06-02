import React from "react"

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
