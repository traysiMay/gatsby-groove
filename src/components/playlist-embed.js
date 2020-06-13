import React, { useEffect, useState } from "react"
import playlistEmbedStyles from "./playlist-embed.module.scss"
import getPlaylistTracks from "../services/get-playlist-tracks"
import startPlayingPlaylist from "../services/start-playing-playlist"
const PlaylistEmbed = ({ uri }) => {
  const [img, setImg] = useState("")
  const [trackList, setTracks] = useState([])

  useEffect(() => {
    getPlaylistTracks().then(data => {
      setTracks(data.tracks)
      setImg(data.imgUrl)
    })
  }, [])
  return (
    <div>
      {trackList.length > 0 && img && (
        <div className={playlistEmbedStyles.container}>
          <div onClick={() => startPlayingPlaylist(uri)}>
            <img className={playlistEmbedStyles.img} src={img}></img>
          </div>
          <div className={playlistEmbedStyles.trackList}>
            {trackList.map(track => {
              return (
                <div
                  id={track.trackUri.split(":")[2]}
                  onClick={() => startPlayingPlaylist(uri, track.trackUri)}
                  key={track.name + track.artists}
                >
                  {track.name}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
export default PlaylistEmbed
