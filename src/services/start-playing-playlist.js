export default (contextUri, playlistTrackUri, givenDeviceId, singleTrack) => {
  let body = {}
  if (contextUri) {
    body["context_uri"] = contextUri
  }
  if (playlistTrackUri) {
    body["offset"] = { uri: playlistTrackUri }
  }
  if (singleTrack) {
    body["uris"] = [singleTrack]
  }
  const deviceId = givenDeviceId
    ? givenDeviceId
    : localStorage.getItem("deviceId")
  return fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    }
  )
    .then(r => r.json())
    .catch(console.log)
}
