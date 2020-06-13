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

export const wrapPageElement = ({ element, props }) => {
  console.log("hi")
  return (
    <div>
      <div>fROGCOCK</div>
      {element}
    </div>
  )
}
