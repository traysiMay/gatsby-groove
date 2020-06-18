export default () => {
  return fetch(
    `https://api.spotify.com/v1/me/player/pause?device_id=${localStorage.getItem(
      "deviceId"
    )}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  ).catch(error => console.log(error))
}
