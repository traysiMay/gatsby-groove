export default async uri => {
  const data = await fetch(
    `${process.env.GATSBY_SERVER_URL}/playlist/?uri=${uri}`
  )
    .then(r => r.json())
    .then(data => {
      console.log(data)
      const imgUrl = data.imgs[0].url
      const tracks = data.tracks.items.map(item => {
        const track = item.track
        const trackName = track.name
        const artists = track.artists.map(artist => artist.name).join(", ")
        const trackUri = track.uri
        return { name: trackName, artists, trackUri }
      })
      return { tracks, imgUrl }
    })
  return data
}
