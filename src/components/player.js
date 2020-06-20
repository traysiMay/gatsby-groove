import React from "react"
import playerStyles from "./player.module.scss"
import Play from "../icons/play"
import Pause from "../icons/pause"
import Forward from "../icons/forward"
import Backward from "../icons/backward"
import Spotify from "../icons/spotify"
const Player = ({
  chosenSpotifyDevice,
  chooseSpotifyDevice,
  currentTrack,
  isPlaying,
  next,
  noAuth,
  previous,
  spotifyDevices,
  togglePlay,
}) => {
  // if (device) {
  //   return (
  //     <div className={playerStyles.wrapper}>
  //       <div>Sorry but iOS is not supported</div>
  //       <div style={{ width: 100, margin: "auto" }}>:(</div>
  //     </div>
  //   )
  // }
  if (noAuth) {
    return (
      <div className={playerStyles.wrapper}>
        <div>Wanna Use the Player?</div>
        <div style={{ width: 100, margin: "auto" }}>
          <Spotify stroke={"#FFFFFF"} />
        </div>
      </div>
    )
  }
  return (
    <div className={playerStyles.wrapper}>
      <div className={playerStyles.songDetails}>
        {currentTrack
          ? `${currentTrack.artists.map(a => a.name).join(", ")} - ${
              currentTrack.name
            }`
          : "Time to find a Playlist!"}
      </div>
      <div className={playerStyles.controls}>
        <div onClick={previous} onKeyDown={previous} role="button" tabIndex={0}>
          <Backward />
        </div>
        <div
          onClick={togglePlay}
          onKeyDown={togglePlay}
          role="button"
          tabIndex={-1}
        >
          {!isPlaying ? <Play /> : <Pause />}
        </div>
        <div onClick={next} onKeyDown={next} role="button" tabIndex={-2}>
          <Forward />
        </div>
      </div>
      <div className={playerStyles.deviceList}>
        {spotifyDevices.map(d => {
          return (
            <div
              key={d.id}
              style={{
                color: chosenSpotifyDevice === d.id ? "#88ff88" : "white",
              }}
              onClick={() => {
                chooseSpotifyDevice(d.id)
              }}
              onKeyDown={() => {
                chooseSpotifyDevice(d.id)
              }}
              role="button"
              tabIndex={-3}
            >
              {d.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Player
