import React, { useEffect, useState } from "react"
import PlayerComponent from "../components/player"
import pausePlaylistTrack from "../services/pause-playlist-track"
import resumePlaylistTrack from "../services/start-playing-playlist"
import nextPlaylistTrack from "../services/next-playlist-track"
import previousPlaylistTrack from "../services/previous-playlist-track"
import playerStyles from "./player.module.scss"
const Player = () => {
  const [track, setTrack] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [token, setToken] = useState(
    typeof window !== "undefined" && localStorage.getItem("token")
  )

  const togglePlay = () => {
    if (isPlaying) {
      pausePlaylistTrack()
    } else {
      resumePlaylistTrack()
    }
  }

  useEffect(() => {
    const handlerEvent = event => {
      console.log("new Token ", event.newValue)
      if (event.key !== "token") return
      setToken(event.newValue)
    }
    if (window !== "undefined") {
      window.addEventListener("storage", handlerEvent, false)

      let player = new window.Spotify.Player({
        name: "Groove Devotion Player",
        getOAuthToken: cb => {
          cb(token)
        },
      })
      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message)
      })
      player.addListener("authentication_error", async ({ message }) => {
        const newToken = await fetch(
          `${
            process.env.GATSBY_SERVER_URL
          }/new-token?refreshToken=${localStorage.getItem("rToken")}`
        ).then(r => r.json())
        localStorage.setItem("token", newToken.token)
        player = new window.Spotify.Player({
          name: "Groove Devotion Player",
          getOAuthToken: cb => {
            cb(token)
          },
        })
        player.connect()
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
        console.log("state change")
        console.log(state)
        console.log(state.track_window)
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
      })

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id)
      })

      // Connect to the player!
      player.connect()
    }

    return () => window.removeEventListener("storage", handlerEvent, false)
  }, [token])

  return (
    <div className={playerStyles.container}>
      <PlayerComponent
        currentTrack={track}
        isPlaying={isPlaying}
        next={nextPlaylistTrack}
        previous={previousPlaylistTrack}
        togglePlay={togglePlay}
      />
    </div>
  )
}
export default Player
