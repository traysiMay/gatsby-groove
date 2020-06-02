import React, { useEffect, useState, useRef } from "react"
import Layout from "../components/layout"
import playlistStyles from "../styles/playlist.module.scss"
const playlistURI = "spotify:playlist:0fp4K7jcnVoS9fLvCzBevl"

const Playlists = () => {
  const currentTrackRef = useRef()
  const deviceId = useRef()
  const [playerPlaying, setPlayerPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState()
  const [playlistTracks, setPlaylistTracks] = useState([])

  const startPlayingList = () => {
    fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId.current}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: currentTrack ? `` : `{"context_uri":"${playlistURI}"}`,
      }
    )
      .then(console.log)
      .catch(console.log)
  }

  const pause = () => {
    fetch(
      `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId.current}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then(console.log)
      .catch(console.log)
  }
  useEffect(() => {
    if (window) {
      const getPlayListTracks = async () => {
        const res = await fetch(
          `https://api.spotify.com/v1/playlists/${
            playlistURI.split(":")[2]
          }/tracks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ).then(r => r.json())
        const tracklist = res.items.map(i => i.track)
        setPlaylistTracks(tracklist)
      }
      getPlayListTracks()
      const player = new window.Spotify.Player({
        name: "Groove Devotion Player",
        getOAuthToken: cb => {
          cb(localStorage.getItem("token"))
        },
      })
      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message)
      })
      player.addListener("authentication_error", ({ message }) => {
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
        const cTrack = state.track_window.current_track
        setCurrentTrack(cTrack)
        console.log(state)
        setPlayerPlaying(!state.paused)
      })

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id)
        deviceId.current = device_id
        // fetch(
        //   `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
        //   {
        //     method: "PUT",
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        //     body: `{"context_uri":"${playlistURI}"}`,
        //   }
        // )
        //   .then(console.log)
        //   .catch(console.log)
      })

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id)
      })

      // Connect to the player!
      player.connect()
    }
  }, [])
  return (
    <Layout pageTitle={"Playlists"}>
      <button
        className={playlistStyles.playButton}
        onClick={playerPlaying ? pause : startPlayingList}
      >
        {playerPlaying ? "PAUSE" : "PLAY"}
      </button>
      {/* {currentTrack && (
        <div ref={currentTrackRef}>
          {currentTrack.artists[0].name} - {currentTrack.name}
        </div>
      )} */}
      <div className={playlistStyles.container}>
        {playlistTracks.map(track => {
          return (
            <div
              style={{
                color:
                  currentTrack && currentTrack.name === track.name
                    ? "#ff3c01"
                    : "black",
              }}
              className={playlistStyles.trackWrap}
            >
              <div>{track.artists[0].name}</div>
              <div className={playlistStyles.trackName}>{track.name}</div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Playlists
