// import { createStore as reduxCreateStore } from "redux"

// const initialState = {
//   check_spotify: false,
//   spotify_authorized: false,
//   device_type: null,
//   player_initialized: false,
//   loaded: false,
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "LOADED":
//       return { ...state, loaded: action.loaded }
//     case "CHECK_AND_AUTH":
//       return {
//         ...state,
//         check_spotify: action.response,
//         spotify_authorized: action.response,
//       }
//     default:
//       return state
//   }
// }

// const createStore = () => reduxCreateStore(reducer, initialState)
// export default createStore
