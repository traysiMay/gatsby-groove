export default () => {
  fetch(
    `https://api.spotify.com/v1/me/player/previous?device_id=${localStorage.getItem(
      "deviceId"
    )}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )
    .then(console.log)
    .catch(console.log)
}
