export default (contextUri, trackUri, givenDeviceId) => {
  let body = {}
  if (contextUri) {
    body["context_uri"] = contextUri
  }
  if (trackUri) {
    body["offset"] = { uri: trackUri }
  }
  const deviceId = givenDeviceId
    ? givenDeviceId
    : localStorage.getItem("deviceId")

  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  })
    .then(console.log)
    .catch(console.log)
}
