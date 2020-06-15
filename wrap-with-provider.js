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
  const [playerInited, setPlayerInited] = useState()
  return (
    <myContext.Provider
      value={{
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
