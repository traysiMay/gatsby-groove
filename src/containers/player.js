import React, { useEffect, useState, useContext, useRef } from "react"
import PlayerComponent from "../components/player"
import pausePlaylistTrack from "../services/pause-playlist-track"
import resumePlaylistTrack from "../services/start-playing-playlist"
import nextPlaylistTrack from "../services/next-playlist-track"
import previousPlaylistTrack from "../services/previous-playlist-track"
import getNewToken from "../services/get-new-token"
import playerStyles from "./player.module.scss"
import getUser from "../services/get-user"
import { myContext } from "../../wrap-with-provider"
import getUserDevices from "../services/get-user-devices"
import getUserCurrentlyPlaying from "../services/get-user-currently-playing"
const Player = () => {
  const [track, setTrack] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [token, setToken] = useState(
    typeof window !== "undefined" && localStorage.getItem("token")
  )
  const [playerExists, setPlayerExists] = useState(0)
  const [isUserAuth, setIsUserAuth] = useState(false)

  // Shitty force rerender
  const [playerWhatever, setPlayerWhatever] = useState(0)

  const playerRef = useRef()

  const context = useContext(myContext)
  const togglePlay = () => {
    if (isPlaying) {
      pausePlaylistTrack().then(() => {
        setPlayerWhatever(playerWhatever + 1)
      })
    } else {
      resumePlaylistTrack().then(() => setPlayerWhatever(playerWhatever + 1))
    }
  }

  useEffect(() => {
    let interval
    // & not the web player
    if (
      context.groovePlayer !== context.chosenSpotifyDevice &&
      context.spotifyDevices &&
      context.spotifyDevices.length > 0
    ) {
      interval = setInterval(() => {
        getUserCurrentlyPlaying().then(data => {
          console.log("polling")
          const playing = data.is_playing
          setIsPlaying(playing)
          setTrack(data.item)
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [
    context && context.groovePlayer && context && context.chosenSpotifyDevice,
    playerWhatever,
  ])

  useEffect(() => {
    // handle new token events
    let player = playerRef.current
    const phandlerEvent = event => {
      console.log("player storage event", console.log(event))
      if (event.key !== "token") return
      getUser(event.newValue).then(data => {
        if (data.error) {
          console.log("invalid token")
          getNewToken()
            .then(data => {
              localStorage.setItem("token", data.token)
              var player = playerRef.current
              player.current = new window.Spotify.Player({
                name: "Groove Devotion Player",
                getOAuthToken: cb => {
                  cb(data.token)
                },
              })
              player.connect()
            })
            .catch(error => {
              setIsUserAuth(false)
            })
        } else {
          setIsUserAuth(true)
          setToken(event.newValue)
        }
      })
    }
    window.addEventListener("storage", phandlerEvent, false)

    // try to init player
    try {
      if (window !== "undefined") {
        // listener for token changes
        // player init
        player = new window.Spotify.Player({
          name: "Groove Devotion Player",
          getOAuthToken: cb => {
            cb(token)
          },
        })

        // check the user
        getUser(localStorage.getItem("token")).then(data => {
          console.log("checking user")
          if (data.error) {
            console.log("invalid token")
            setIsUserAuth(false)
          } else {
            setIsUserAuth(true)
          }
        })

        getUserDevices().then(data => {
          if (data.error) return
          context.addSpotifyDevices(data.devices)
        })

        setPlayerExists(5)

        // Error handling
        player.addListener("initialization_error", ({ message }) => {
          console.error(message)
        })
        player.addListener("authentication_error", async ({ message }) => {
          console.log("auth error")
          const refreshToken = localStorage.getItem("rToken")
          console.log(refreshToken)
          if (refreshToken) {
            const newToken = await getNewToken()
            console.log(newToken)
            localStorage.setItem("token", newToken.token)
            player = new window.Spotify.Player({
              name: "Groove Devotion Player",
              getOAuthToken: cb => {
                cb(newToken.token)
              },
            })
            player.connect()
          } else {
            console.log("this user is not remembered")
          }

          console.error(message)
        })
        player.addListener("account_error", ({ message }) => {
          console.error(message)
        })
        player.addListener("playback_error", ({ message }) => {
          console.error(message)
        })

        // Playback status updates
        player.addListener("player_state_changed", state => {
          if (!state) return
          const currentTrack = state.track_window.current_track
          const paused = state.paused
          try {
            const cPlaying = document.querySelector(".playing")
            if (cPlaying) {
              cPlaying.classList.remove("playing")
            }
            const element = document.getElementById(
              currentTrack.uri.split(":")[2]
            )
            element.classList.add("playing")
          } catch (err) {
            console.log("cant find this boy")
          }
          setTrack(currentTrack)
          setIsPlaying(!paused)
        })

        // Ready
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id)
          localStorage.setItem("deviceId", device_id)
          context && context.setGroovePlayer(device_id)
          getUserDevices().then(data => {
            context.addSpotifyDevices(data.devices)
          })
        })

        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id)
        })

        // Connect to the player!
        player.connect()
      }
    } catch (err) {
      console.log(err, " problem loading spot plaer")
      console.log("retrying " + playerExists)
      setTimeout(() => setPlayerExists(playerExists + 1), 3000)
    }
    return () => {
      window.removeEventListener("storage", phandlerEvent, false)
    }
  }, [token, playerExists])

  return (
    <div className={playerStyles.container}>
      <PlayerComponent
        chosenSpotifyDevice={context && context.chosenSpotifyDevice}
        chooseSpotifyDevice={context && context.changeSpotifyDevice}
        currentTrack={track}
        device={context && context.device}
        isPlaying={isPlaying}
        noAuth={!isUserAuth}
        next={nextPlaylistTrack}
        previous={previousPlaylistTrack}
        spotifyDevices={context && context.spotifyDevices}
        togglePlay={togglePlay}
      />
    </div>
  )
}
export default Player
