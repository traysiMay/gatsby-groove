export default async token => {
  const data = await fetch("https://api.spotify.com/v1/me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(r => r.json())
  return data
}
