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
  const [groovePlayer, setGroovePlayer] = useState("")

  const changeSpotifyDevice = deviceId => {
    chooseSpotifyDevice(deviceId)
    localStorage.setItem("deviceId", deviceId)
  }

  const addSpotifyDevices = devices => {
    for (let i = 0; i < devices.length; i++) {
      if (devices[i].is_active) {
        changeSpotifyDevice(devices[i].id)
      }
    }
    setSpotifyDevices([...devices])
  }

  return (
    <myContext.Provider
      value={{
        addSpotifyDevices,
        changeSpotifyDevice,
        chosenSpotifyDevice,
        chooseSpotifyDevice,
        spotifyDevices,
        checkSpotify,
        checkAuthorized,
        device,
        groovePlayer,
        playerInited,
        setCheckSpotify,
        setCheckAuthorized,
        setGroovePlayer,
      }}
    >
      {props.children}
    </myContext.Provider>
  )
}

export default ({ element }) => <Provider>{element}</Provider>
