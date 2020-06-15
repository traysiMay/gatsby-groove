// import React from "react"
// import { Provider } from "react-redux"

// import createStore from "./src/state/createStore"

// export default ({ element }) => {
//   const store = createStore()
//   //   store.dispatch({ type: "LOADED", loaded: true })
//   return <Provider store={store}>{element}</Provider>
// }
import React, { useState } from "react"

export const myContext = React.createContext()
const iOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

const Provider = props => {
  const [checkSpotify, setCheckSpotify] = useState()
  const [checkAuthorized, setCheckAuthorized] = useState()
  const [device, setDevice] = useState(iOS())
  const [spotifyDevices, setSpotifyDevices] = useState([])
  const [chosenSpotifyDevice, chooseSpotifyDevice] = useState("")
  const [playerInited, setPlayerInited] = useState()

  const addSpotifyDevice = devices => {
    const currentDeviceIds = spotifyDevices.map(d => d.id)
    const newDevices = devices.filter(d => !currentDeviceIds.includes(d.id))
    setSpotifyDevices([...spotifyDevices, ...newDevices])
  }

  return (
    <myContext.Provider
      value={{
        addSpotifyDevice,
        chooseSpotifyDevice,
        chosenSpotifyDevice,
        spotifyDevices,
        checkSpotify,
        checkAuthorized,
        device,
        playerInited,
        setCheckSpotify,
        setCheckAuthorized,
      }}
    >
      {props.children}
    </myContext.Provider>
  )
}

export default ({ element }) => <Provider>{element}</Provider>
