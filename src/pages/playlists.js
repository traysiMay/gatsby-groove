import React, { useEffect, useState, useRef, useContext } from "react"
import pausePlaylist from "../services/pause-playlist-track"
import startPlayingPlaylist from "../services/start-playing-playlist"
import getPlaylistTracks from "../services/get-playlist-tracks"
import Layout from "../components/layout"
import playlistStyles from "../styles/playlist.module.scss"
import { myContext } from "../../wrap-with-provider"
const playlistURI = "spotify:playlist:0fp4K7jcnVoS9fLvCzBevl"

const Playlists = () => {
  const [playlistTracks, setPlaylistTracks] = useState([])

  const context = useContext(myContext)
  useEffect(() => {
    getPlaylistTracks().then(data => {
      setPlaylistTracks(data.tracks)
    })
  }, [])
  return (
    <Layout pageTitle={"Playlist"}>
      <div className={playlistStyles.container}>
        {playlistTracks.map(track => {
          return (
            <div
              onClick={() => {
                if (context && !context.chosenSpotifyDevice) {
                  console.log("HENLO")
                  context.chooseSpotifyDevice(localStorage.getItem("deviceId"))
                  context.setGroovePlayer(localStorage.getItem("deviceId"))
                }
                startPlayingPlaylist(
                  playlistURI,
                  track.trackUri,
                  context && context.chosenSpotifyDevice
                )
              }}
              key={track.name}
              id={track.trackUri.split(":")[2]}
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
