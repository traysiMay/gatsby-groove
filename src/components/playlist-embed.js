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
          <div
            onClick={() => startPlayingPlaylist(uri)}
            onKeyDown={() => startPlayingPlaylist(uri)}
            tabIndex={0}
            role="button"
          >
            <img className={playlistEmbedStyles.img} src={img} alt="wat"></img>
          </div>
          <div className={playlistEmbedStyles.trackList}>
            {trackList.map((track, i) => {
              return (
                <div
                  className={playlistEmbedStyles.track}
                  id={track.trackUri.split(":")[2]}
                  onClick={() => startPlayingPlaylist(uri, track.trackUri)}
                  onKeyDown={() => startPlayingPlaylist(uri, track.trackUri)}
                  role="button"
                  tabIndex={(i + 1) * -1}
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
