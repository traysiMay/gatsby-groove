export default () => {
  fetch(
    `https://api.spotify.com/v1/me/player/pause?device_id=${localStorage.getItem(
      "deviceId"
    )}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )
    .then(console.log)
    .catch(console.log)
}
