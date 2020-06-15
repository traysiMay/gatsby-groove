export default async () => {
  return fetch(`https://api.spotify.com/v1/me/player/devices`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then(r => r.json())
    .catch(console.log)
}
