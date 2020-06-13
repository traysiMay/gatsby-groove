export default (contextUri, trackUri) => {
  let body = {}
  if (contextUri) {
    body["context_uri"] = contextUri
  }
  if (trackUri) {
    body["offset"] = { uri: trackUri }
  }
  console.log(body)
  fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${localStorage.getItem(
      "deviceId"
    )}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    }
  )
    .then(console.log)
    .catch(console.log)
}
