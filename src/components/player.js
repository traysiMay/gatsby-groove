import React from "react"
import playerStyles from "./player.module.scss"
import Play from "../icons/play"
import Pause from "../icons/pause"
import Forward from "../icons/forward"
import Backward from "../icons/backward"
const Player = ({ currentTrack, isPlaying, next, previous, togglePlay }) => {
  return (
    <div className={playerStyles.wrapper}>
      <div className={playerStyles.songDetails}>
        {currentTrack
          ? `${currentTrack.artists.map(a => a.name).join(", ")} - ${
              currentTrack.name
            }`
          : "nopemo"}
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
