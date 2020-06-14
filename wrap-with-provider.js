import React from "react"
import { Provider } from "react-redux"

import createStore from "./src/state/createStore"

export default ({ element }) => {
  const store = createStore()
  //   store.dispatch({ type: "LOADED", loaded: true })
  return <Provider store={store}>{element}</Provider>
}
