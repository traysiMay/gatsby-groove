import React, { useEffect, useState, useRef, useContext } from "react"
import pausePlaylist from "../services/pause-playlist-track"
import startPlayingPlaylist from "../services/start-playing-playlist"
import getPlaylistTracks from "../services/get-playlist-tracks"
import Layout from "../components/layout"
import playlistStyles from "../styles/playlist.module.scss"
import { myContext } from "../../wrap-with-provider"
const playlistURI = "spotify:playlist:0fp4K7jcnVoS9fLvCzBevl"

const Playlists = () => {
  const deviceId = useRef()
  const [playerPlaying, setPlayerPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState()
  const [playlistTracks, setPlaylistTracks] = useState([])

  const context = useContext(myContext)
  useEffect(() => {
    getPlaylistTracks().then(data => {
      setPlaylistTracks(data.tracks)
    })
    // if (window) {
    //   const player = new window.Spotify.Player({
    //     name: "Groove Devotion Player",
    //     getOAuthToken: cb => {
    //       cb(localStorage.getItem("token"))
    //     },
    //   })
    //   // Error handling
    //   player.addListener("initialization_error", ({ message }) => {
    //     console.error(message)
    //   })
    //   player.addListener("authentication_error", ({ message }) => {
    //     console.error(message)
    //   })
    //   player.addListener("account_error", ({ message }) => {
    //     console.error(message)
    //   })
    //   player.addListener("playback_error", ({ message }) => {
    //     console.error(message)
    //   })

    //   // Playback status updates
    //   player.addListener("player_state_changed", state => {
    //     console.log("start change")
    //     const cTrack = state.track_window.current_track
    //     setCurrentTrack(cTrack)
    //     console.log(state)
    //     setPlayerPlaying(!state.paused)
    //   })

    //   // Ready
    //   player.addListener("ready", ({ device_id }) => {
    //     console.log("Ready with Device ID", device_id)
    //     deviceId.current = device_id
    //     localStorage.setItem("deviceId", device_id)
    //   })

    //   // Not Ready
    //   player.addListener("not_ready", ({ device_id }) => {
    //     console.log("Device ID has gone offline", device_id)
    //   })

    //   // Connect to the player!
    //   player.connect()
    // }
  }, [])
  return (
    <Layout pageTitle={"Playlist"}>
      {/* <button
        className={playlistStyles.playButton}
        onClick={
          playerPlaying
            ? pausePlaylist
            : () => startPlayingPlaylist(playlistURI)
        }
      >
        {playerPlaying ? "PAUSE" : "PLAY"}
      </button> */}
      {/* {currentTrack && (
        <div ref={currentTrackRef}>
          {currentTrack.artists[0].name} - {currentTrack.name}
        </div>
      )} */}
      <div className={playlistStyles.container}>
        {playlistTracks.map(track => {
          return (
            <div
              onClick={() =>
                startPlayingPlaylist(
                  playlistURI,
                  track.trackUri,
                  context && context.chosenSpotifyDevice
                )
              }
              key={track.name}
              id={track.trackUri.split(":")[2]}
              // style={{
              //   color:
              //     currentTrack && currentTrack.name === track.name
              //       ? "#ff3c01"
              //       : "black",
              // }}
              className={`${playlistStyles.trackWrap}`}
            >
              <div>{track.artists}</div>
              <div className={playlistStyles.trackName}>{track.name}</div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Playlists
