import React, { useContext } from "react"
import playerStyles from "./player.module.scss"
import Play from "../icons/play"
import Pause from "../icons/pause"
import Forward from "../icons/forward"
import Backward from "../icons/backward"
import Spotify from "../icons/spotify"
const Player = ({
  currentTrack,
  device,
  isPlaying,
  next,
  noAuth,
  previous,
  togglePlay,
}) => {
  if (device) {
    return (
      <div className={playerStyles.wrapper}>
        <div>Sorry but iOS is not supported</div>
        <div style={{ width: 100, margin: "auto" }}>:(</div>
      </div>
    )
  }
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
        <div onClick={previous}>
          <Backward />
        </div>
        <div onClick={togglePlay}>{!isPlaying ? <Play /> : <Pause />}</div>
        <div onClick={next}>
          <Forward />
        </div>
      </div>
    </div>
  )
}
export default Player
